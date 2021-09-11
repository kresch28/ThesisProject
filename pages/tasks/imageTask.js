import React, {useState, useEffect} from "react";
import { firebase } from '../../src/initFirebase'
import axios from 'axios';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

const db = firebase.database();

import { Typography} from "@material-ui/core";
import { makeStyles, createMuiTheme } from '@material-ui/core/styles';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

import Box from '@material-ui/core/Box';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';

import InfoIcon from '@material-ui/icons/Info';
import KeyboardArrowLeft from "../index";

let theme = createMuiTheme();
theme.spacing(2);

const useStyles = makeStyles((theme) => ({
    props: {
},
    wrong:{
        border: '4px solid',
        borderColor: 'red'
    },
    right: {
        border: '4px',
        borderColor: 'green'
    }
}));

function SimpleDialog(props) {
    const { onClose, selectedValue, open, value } = props;

    const handleClose = () => {
        onClose(selectedValue);
    };

    const handleListItemClick = (value) => {
        onClose(value);
    };

    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
            <div style={{textAlign: 'center', margin: '10px'}}>
                <InfoIcon/>
                <p style={{margin:'15px'}}>{value}</p>
            </div>
        </Dialog>
    );
}

function Task(props) {

    const classes = useStyles();
    //Tasks: TODO
    const [tasks, setTasks] = useState("");
    //Images: TODO
    const [image, setImage] = useState("");
    const [imageUrl, setImageUrl] = useState([]);

    //Lessons and number of tasks
    const tutorialSteps = [
        {
            label: 'Lesson 1',
            tasks: 7,
            questions: 3,
        },
        {
            label: 'Lesson 2',
            tasks: 4,
            questions: 1,
        },
        {
            label: 'Lesson 3',
            tasks: 6
        },
        {
            label: 'Lesson 4',
            tasks: 3
        }
    ];

    //status if question is open/available
    const [open, setOpen] = React.useState(false);
    //hint if available in DB
    const [hint, setHint] = React.useState(0);
    //TODO
    const [hintInactive, setHintInactive] = React.useState('primary');

    //Allowed clicks on hint
    const handleClickOpen = () => {
        setHint((prevHint) => prevHint +1)
        if(hint < 3) {
            setOpen(true);
        }
        else {
            setHintInactive((hintInactive) => 'secondary')
        }
    };

    //close Question
    const handleClose = () => {
        setOpen(false);
    };

    //Value that has been choosen as possible answer
    const [value, setValue] = React.useState('');
    //TODO
    const [error, setError] = React.useState(false);
    //counter increases when going to next question
    const [counter, setCounter] = React.useState(0);
    /*//Which lesson is active
    const [page, setPage] = React.useState(0);
    //TODO
    const [img, setImg] = React.useState('');*/

    //Helper Text if answer was correct
    const [helperText, setHelperText] = React.useState('');
    //Actual answer from DB
    const [answer, setAnswer] = React.useState('');
    //Highlight question after answer validation
    const [highlightColor, setHighlightColor] = React.useState(0);
    //marks if question has been done/clicked
    const [clicked, setClicked] = React.useState(false);
    //How many answers have been answered - statistics or checking if next lesson should be available
    const [answered, setAnswered] = React.useState(0);
    const [answeredInfo, setAnsweredInfo] = React.useState('');

    //register Answer Event and set the value
    //first check if radio button or inner text is value
    const handleChange = (event) => {
        if(event.target.value) {
            setValue(event.target.value);
        }
        else {
            const it = event.target.innerHTML;
            setValue(it.substring(1,it.length-1));
        }

    };

    const nextLesson = () => {
        props.sendDoneToParent(true);
    }

    //Validation Process
    //right answer if answer of DB element with the current counter is the same
    //  increse counter -
    const handleSubmit = (event) => {
        props.handleQuestions
        event.preventDefault();
        if (value == answer[counter].toString()) {
                setHelperText('Answer is right');
                setCounter((prevCounter) => prevCounter + 1);
                setAnswered((prevNum) => prevNum + 1);
                setClicked(true)
                setHighlightColor(true);

                if(counter == tutorialSteps[props.activeStep].questions-1) {
                    console.log('next lesson')
                    props.sendStatusToParent(true);
                    setAnsweredInfo('You have answered all of the questions of this lesson. Press Next to go to the next lesson')
                }
            }
            else {

            console.log(counter);
            console.log(answer)
            console.log(answer[counter])
                setHelperText('Answer is wrong');
                setClicked(true)
                setHighlightColor(false);
            }
    };

    const resetHelperText = () => {
        setHelperText(" ");
    }

    //Leave out question and go to next question
    const nextQuestion = () => {
        setCounter((prevCounter) => prevCounter + 1);
        setClicked(true)
    }

    const [didMount, setDidMount] = useState(false);

    //get elements from DB - get entries from images (questions) - tasks: all entries - image: keys from entries - items: array of answers
    useEffect(async () => {
        if(props.reset == true) {
            setCounter(0);
            setAnswered(0);
        }
        const ref = db.ref();
        await ref.child("images").get().then((snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val()
                setTasks(data);
                setImage(Object.keys(data))
                const items = []
                const options = []
                Object.keys(data).map((k,v) => {
                    items.push(data[Object.keys(data)[v]].answer)
                })
                setAnswer((prevVal) => items);
            }
        }).catch((error) => {
            console.error(error);
        });
        setDidMount(true);
        return () => setDidMount(false);
    }, []);

    if(!didMount) {
        return null;
    }
    return (
        <div>
            {Object.keys(tasks).map((k,r) => {
                if(JSON.stringify(tutorialSteps[props.activeStep].label).substring(1,JSON.stringify(tutorialSteps[props.activeStep].label).length-1) == JSON.stringify(tasks[image[r]].lesson).substring(1, JSON.stringify(tasks[image[r]].lesson).length - 1)) {
                    return <Accordion key={r} onClick={resetHelperText}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon/>} aria-controls="additional-actions1-content"
                                          id="additional-actions1-header">
                            <Typography>{JSON.stringify(tasks[image[r]].action).substring(1, JSON.stringify(tasks[image[r]].action).length - 1)}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box>
                                <Box>
                                    {JSON.stringify(tasks[image[r]].link).substring(1, JSON.stringify(tasks[image[r]].link).length - 1) == 'Link' ?
                                        <p></p> :
                                        <img
                                            style={{width: '100%'}}
                                            src={JSON.stringify(tasks[image[r]].link).substring(1, JSON.stringify(tasks[image[r]].link).length - 1)}/>}

                                    <p>{JSON.stringify(tasks[image[r]].description).substring(1, JSON.stringify(tasks[image[r]].description).length - 1)}</p>
                                    {JSON.stringify(tasks[image[r]].hint) != undefined ?
                                        <div>
                                            <Button variant="outlined" color={hintInactive} onClick={handleClickOpen}>
                                                <InfoIcon/>
                                            </Button>
                                            < SimpleDialog open={open} onClose={handleClose}
                                                           value={JSON.stringify(tasks[image[r]].hint).substring(1, JSON.stringify(tasks[image[r]].hint).length - 1)}/>

                                        </div>
                                        :
                                        <p></p>
                                    }
                                </Box>
                                <Box>
                                    {tasks[image[r]].type == "single" ?
                                        <form onSubmit={handleSubmit}>
                                            <FormControl component="fieldset" error={error}>
                                                <RadioGroup aria-label="quiz" name="quiz" value={value}
                                                            onChange={handleChange}>
                                                    <FormControlLabel value="true" control={<Radio color="primary"/>}
                                                                      label="True"/>
                                                    <FormControlLabel value="false" control={<Radio color="primary"/>}
                                                                      label="False"/>
                                                </RadioGroup>
                                                <Button type="submit" variant="outlined" color="primary">
                                                    Check Answer
                                                </Button>
                                                <p style={{colour: "green"}}>{helperText}</p>
                                                <br/>
                                            </FormControl>
                                        </form> :
                                        <form onSubmit={handleSubmit}>
                                            <FormControl component="fieldset" error={error}>
                                                <div style={{}}>
                                                    <Button value={tasks[image[r]].option1} onClick={handleChange}
                                                            variant="contained" style={{
                                                        flex: 1,
                                                        margin: 10
                                                    }}>{JSON.stringify(tasks[image[r]].option1)}</Button>
                                                    {tasks[image[r]].option2 ?
                                                        <Button value={JSON.stringify(tasks[image[r]].option2)}
                                                                onClick={handleChange} variant="contained"
                                                                style={{margin: 10}}>{JSON.stringify(tasks[image[r]].option2)}</Button> :
                                                        <p></p>}
                                                    {tasks[image[r]].option3 ?
                                                        <Button value={JSON.stringify(tasks[image[r]].option3)}
                                                                onClick={handleChange} variant="contained"
                                                                style={{margin: 10}}>{JSON.stringify(tasks[image[r]].option3)}</Button> :
                                                        <p></p>}
                                                    {tasks[image[r]].option4 ?
                                                        <Button value={JSON.stringify(tasks[image[r]].option4)}
                                                                onClick={handleChange} variant="contained"
                                                                style={{margin: 10}}>{JSON.stringify(tasks[image[r]].option4)}</Button> :
                                                        <p></p>}
                                                </div>
                                                <Button type="submit" variant="outlined" color="primary">
                                                    Check Answer
                                                </Button>
                                                <p style={{colour: "green"}}>{helperText}</p>
                                                <br/>
                                                {/*<Button variant="outlined" color="default" onClick={nextQuestion}>
                                                    Next Question
                                                </Button>*/}
                                            </FormControl>
                                        </form>}


                                </Box>
                            </Box>
                        </AccordionDetails>
                    </Accordion>

                }
                else {
                    <p>Next Lesson</p>
                }


                })
            }
            {answeredInfo}
            <br/>
            {answeredInfo == 'You have answered all of the questions of this lesson. Press Next to go to the next lesson' ? <Button onClick={nextLesson}>Next<KeyboardArrowRight /></Button> : ' '}
            </div>

        )
    }

 export default Task;
