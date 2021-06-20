import Link from 'next/link'
import Container from '@material-ui/core/Container';
import React from "react";

import firebase from "firebase";
import 'firebase/auth';
import 'firebase/database';

import Button from '@material-ui/core/Button';

const config = {
    apiKey: "AIzaSyAo0G2bLK7VP77P6ojpfP1q-Fwj9QXcRXA",
    authDomain: "thesisproject-2021.firebaseapp.com",
    databaseURL: "https://thesisproject-2021-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "thesisproject-2021",
    storageBucket: "thesisproject-2021.appspot.com",
    messagingSenderId: "873907592244",
    appId: "1:873907592244:web:5ead2acdcf467c766abe61"
};

function initFirebase() {
    if(!firebase.apps.length) {
        firebase.initializeApp(config);
    }
}
initFirebase();

const db = firebase.database();

export default function Tasks() {

    const [task, setTask] = React.useState("Task");
    const [taskTitle, setTaskTitle] = React.useState("TaskTitle");
    const [lesson, setLesson] = React.useState("Lesson 1");

    const [action, setAction] = React.useState("Task");
    const [actionTitle, setActionTitle] = React.useState("TaskTitle");
    const [link, setLink] = React.useState("Link");
    const [answer, setAnswer] = React.useState(true);
    const id = '-MXkkPPl0o5BzinAcbrN';
    /*const [result, setResult] = React.useState(null);
    React.useEffect(() => {
        const ref = db.ref(`results`);
        ref.on("value", (snapshot) => {
            setResult(snapshot.val());
        });
        return () => ref.off();
    })*/

    const lessonInfos = [
        {
            label: 'Lesson 1',
        },
        {
            label: 'Lesson 2',
        },
        {
            label: 'Lesson 3',
        },
        {
            label: 'Lesson 4',
        },
        {
            label: 'Lesson 5',
        },
    ];

    const handleChange = (event) => {
        console.log('value', event.target.value)
        setLesson(event.target.value);
    }

    const onChangeValue = (event) => {
        setAnswer(event.target.value);
    }
    return (
        <>

            <Container maxWidth="lg">
                <form onSubmit={(e) => {
                    e.preventDefault();
                    const tasksRef = db.ref(`tasks`);
                    const newTaskRef = tasksRef.push();
                    newTaskRef.set({
                        task : taskTitle,
                        taskDescription : task,
                        lesson: lesson,
                    });
                    console.log(lesson);
                }}>
                    <label>Lesson:
                        <select name={lesson} size="1" onChange={handleChange}>
                            {lessonInfos.map((l,k) => <option key={k} value={l.label}>{l.label}</option>) }
                        </select>
                    </label>
                    {/*<input name={'lesson'} value={lesson} onChange={(e) => setLesson(e.target.value)}/>*/}
                    <input name={'title'} value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)}/>
                    <textarea cols="50" rows="8" name={'task'} value={task} onChange={(e) => setTask(e.target.value)}/>
                    <p>Current Task: {JSON.stringify(task)}</p>
                    <Button color="primary" type={"submit"}>Create Task</Button>
                </form>
            </Container>

            <Container maxWidth="lg">
                <form onSubmit={(e) => {
                    e.preventDefault();
                    const tasksRef = db.ref(`images`);
                    const newTaskRef = tasksRef.push();
                    newTaskRef.set({
                        lesson: lesson,
                        action : actionTitle,
                        description : action,
                        link: link,
                        answer: answer,
                    });
                }}>
                    <label>Lesson:
                        <select name={lesson} size="1" onChange={handleChange}>
                            {lessonInfos.map((l,k) => <option key={k} value={l.label}>{l.label}</option>) }
                        </select>
                    </label>
                    {/*<input name={'lesson'} value={lesson} onChange={(e) => setLesson(e.target.value)}/>*/}
                    <input name={'title'} value={actionTitle} onChange={(e) => setActionTitle(e.target.value)}/>
                    <textarea cols="50" rows="8" name={'action'} value={action} onChange={(e) => setAction(e.target.value)}/>
                    <div onChange={onChangeValue}>
                        <input type="radio" value="true" name="answer" /> true
                        <input type="radio" value="false" name="answer" /> false
                    </div>
                    <input name={'link'} value={link} onChange={(e) => setLink(e.target.value)}/>
                    <p>Current Task: {JSON.stringify(task)}</p>
                    <Button color="primary" type={"submit"}>Create Task</Button>
                </form>
            </Container>
            <h2>
                <Link href="/">
                    <a>Back to home</a>
                </Link>
            </h2>
        </>
    )
}
