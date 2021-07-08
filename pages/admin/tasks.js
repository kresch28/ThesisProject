import Link from 'next/link'
import Container from '@material-ui/core/Container';
import React, {useEffect} from "react";

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

    const [timeout, setTimeout] = React.useState(0);
    const [task, setTask] = React.useState("Task");
    const [taskTitle, setTaskTitle] = React.useState("TaskTitle");
    const [lesson, setLesson] = React.useState("Lesson 1");

    const [action, setAction] = React.useState("Task");
    const [actionTitle, setActionTitle] = React.useState("TaskTitle");
    const [link, setLink] = React.useState("Link");
    const [answer, setAnswer] = React.useState({});
    const [rightAnswer, setRightAnswer] = React.useState('');
    const [type, setType] = React.useState('single');
    const [amount, setAmount] = React.useState([])
    const id = '-MXkkPPl0o5BzinAcbrN';


    const setMultipleChoice = (e) => {
        console.log(e);
        let numbers = [];
        for (var i=0; i < e; i++) {
            numbers.push({'field' : i+1});
        }
        setAmount(numbers);
        console.log(amount);
        return amount;
    }
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
    const onChangeValue = (e) => {
        setAnswer({...answer, [e.target.name]: e.target.value });
    }

    /*useEffect(() => {
        const timeoutId = setTimeout(() => console.log(`I can see you're not typing. I can use "${answer}" now!`), 1000);
        return () => clearTimeout(timeoutId);
    }, [answer]);*/


    return (
        <>

            <Container maxWidth="lg">
                <h3>Add a new task: </h3>
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

                <h3>Add new question: </h3>
                {type != 'single' ?
                <form onSubmit={(e) => {
                    e.preventDefault();
                    const questionsRef = db.ref(`images`);
                    const newQuestionRef = questionsRef.push();
                    if(answer['1'] && answer['2'] && answer['3'] && answer['4']) {
                        newQuestionRef.set({
                            lesson: lesson,
                            action : actionTitle,
                            description : action,
                            link: link,
                            answer: rightAnswer,
                            option1: answer['1'],
                            option2 : answer['2'],
                            option3: answer['3'],
                            option4: answer['4'],
                            type: type

                        });
                    }
                    else if(answer['1'] && answer['2'] && answer['3']) {
                        newQuestionRef.set({
                            lesson: lesson,
                            action : actionTitle,
                            description : action,
                            link: link,
                            answer: rightAnswer,
                            option1: answer['1'],
                            option2: answer['2'],
                            option3: answer['3'],
                            type: type

                        });
                    }
                    else if(answer['1'] && answer['2']) {
                        newQuestionRef.set({
                            lesson: lesson,
                            action : actionTitle,
                            description : action,
                            link: link,
                            answer: rightAnswer,
                            option1: answer['1'],
                            option2: answer['2'],
                            type: type

                        });
                    }
                    else {
                        newQuestionRef.set({
                            lesson: lesson,
                            action : actionTitle,
                            description : action,
                            link: link,
                            answer: rightAnswer,
                            option1: answer['1'],
                            type: type

                        });
                    }
                }}>
                    <div>
                        <label>Type: </label>
                        <select onChange={(e) => setType(e.target.value)}>
                            <option value={'single'}>Single</option>
                            <option value={'multiple'}>Multiple</option>
                        </select>
                    </div><br/>
                    <div>
                        <label>Lesson: </label>
                        <select name={lesson} size="1" onChange={handleChange}>
                            {lessonInfos.map((l,k) => <option key={k} value={l.label}>{l.label}</option>) }
                        </select>
                    </div><br/>
                    {/*<input name={'lesson'} value={lesson} onChange={(e) => setLesson(e.target.value)}/>*/}
                    <div>
                        <label>Title: </label>
                        <input name={'title'} value={actionTitle} onChange={(e) => setActionTitle(e.target.value)}/>
                    </div><br/>
                    <div>
                        <label>Question: </label>
                        <textarea cols="50" rows="8" name={'action'} value={action} onChange={(e) => setAction(e.target.value)}/>
                    </div><br/>
                    <div>
                        <div>
                            <input name={'1'} value={answer['one']} onChange={onChangeValue}/>
                            <input name={'2'} value={answer['two']} onChange={onChangeValue}/>
                            <input name={'3'} value={answer['three']} onChange={onChangeValue}/>
                            <input name={'4'} value={answer['four']} onChange={onChangeValue}/>
                        </div>
                        <input name={'answer'} value={rightAnswer} onChange={(e) => setRightAnswer(e.target.value)}></input>
                    </div><br/>
                    <div>
                        <label>Image Link: </label>
                        <input name={'link'} value={link} onChange={(e) => setLink(e.target.value)}/>
                    </div><br/>
                    <div>
                        <p>Current Task: {JSON.stringify(task)}</p>
                    </div><br/>
                    <Button color="primary" type={"submit"}>Create Task</Button>
                </form>
                        :
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
                        <div>
                            <label>Type: </label>
                            <select onChange={(e) => setType(e.target.value)}>
                                <option value={'single'}>Single</option>
                                <option value={'multiple'}>Multiple</option>
                            </select>
                        </div><br/>
                        <div>
                            <label>Lesson: </label>
                            <select name={lesson} size="1" onChange={handleChange}>
                                {lessonInfos.map((l,k) => <option key={k} value={l.label}>{l.label}</option>) }
                            </select>

                        </div><br/>
                    {/*<input name={'lesson'} value={lesson} onChange={(e) => setLesson(e.target.value)}/>*/}
                    <div>
                        <label>Title: </label>
                        <input name={'title'} value={actionTitle} onChange={(e) => setActionTitle(e.target.value)}/>
                    </div><br/>
                        <div>
                            <label>Question: </label>
                            <textarea cols="50" rows="8" name={'action'} value={action} onChange={(e) => setAction(e.target.value)}/>
                        </div><br/>
                        <label>Anwser: </label>
                        <div onChange={onChangeValue}>
                            <input type="radio" value="true" name="answer" /> true
                            <input type="radio" value="false" name="answer" /> false
                        </div><br/>
                        <div>
                            <label>Image Link: </label>
                            <input name={'link'} value={link} onChange={(e) => setLink(e.target.value)}/>
                        </div><br/>
                        <div>
                            <p>Current Task: {JSON.stringify(task)}</p>
                        </div><br/>
                    <Button color="primary" type={"submit"}>Create Question</Button>
                    </form>
                    }
            </Container>
            <h2>
                <Link href="/">
                    <a>Back to home</a>
                </Link>
            </h2>
        </>
    )
}
