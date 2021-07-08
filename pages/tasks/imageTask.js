import React, {useState, useEffect} from "react";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import { firebase } from '../../src/initFirebase'

import axios from 'axios';

const db = firebase.database();

import { Typography} from "@material-ui/core";
import { makeStyles, createMuiTheme } from '@material-ui/core/styles';

import Box from '@material-ui/core/Box';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

import InfoIcon from '@material-ui/icons/Info';

let theme = createMuiTheme();
theme.spacing(2);

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    props: {
    backgroundColor: 'orange',
},
    wrong: {
        backgroundColor: 'red'
    },
    right: {
        backgroundColor: 'green'
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
    const [tasks, setTasks] = useState("");
    const [image, setImage] = useState("");
    const [imageUrl, setImageUrl] = useState([]);

    const tutorialSteps = [
        {
            label: 'Lesson 1',
            tasks: 7
        },
        {
            label: 'Lesson 2',
            tasks: 6
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

    const [open, setOpen] = React.useState(false);
    const [hint, setHint] = React.useState(0);
    const [hintInactive, setHintInactive] = React.useState('primary');

    const handleClickOpen = () => {
        setHint((prevHint) => prevHint +1)
        if(hint < 3) {
            setOpen(true);
        }
        else {
            setHintInactive((hintInactive) => 'secondary')
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [value, setValue] = React.useState('');
    const [error, setError] = React.useState(false);
    const [counter, setCounter] = React.useState(0);
    const [img, setImg] = React.useState('');

    const [helperText, setHelperText] = React.useState('');
    const [answer, setAnswer] = React.useState('');
    const [highlightColor, setHighlightColor] = React.useState(0);
    const [clicked, setClicked] = React.useState(false)

    const handleChange = (event) => {
        if(event.target.value) {
            setValue(event.target.value);
        }
        else {
            const it = event.target.innerHTML;
            setValue(it.substring(1,it.length-1));
        }

    };

    const handleSubmit = (event) => {
        setHelperText('')
        event.preventDefault();
        console.log(typeof (value));
        console.log(typeof (answer[counter]));
        console.log(answer[counter].toString())
        if (value == answer[counter].toString()) {
                setCounter((prevCounter) => prevCounter + 1);
                setHelperText('Answer is right');
                setClicked(true)
                setHighlightColor(true);
            }
            else {
                setHelperText('Answer is wrong');
                setClicked(true)
                setHighlightColor(false);
            }

            /*} else if (value === 'worst') {
                setHelperText('Sorry, wrong answer!');
                setError(true);
            } else {
                setHelperText('Please select an option.');
                setError(true);
            }*/
    };

    const [didMount, setDidMount] = useState(false);

    useEffect(async () => {
        const ref = db.ref();
        console.log('data');
        await ref.child("images").get().then((snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val()
                setTasks(data);
                setImage(Object.keys(data))
                const items = []
                const options = []
                Object.keys(data).map((k,v) => {
                    /*if(data[Object.keys(data)[v]].answer == undefined) {
                        console.log('in');
                        console.log(data[Object.keys(data)[v]])
                        if(data[Object.keys(data)[v]].option1 && data[Object.keys(data)[v]].option2 && data[Object.keys(data)[v]].option3 && data[Object.keys(data)[v]].option4) {
                            options.push({
                                'option1' : data[Object.keys(data)[v]].option1
                            },
                                {
                                    'option2' : data[Object.keys(data)[v]].option2
                                },
                                {
                                    'option3' : data[Object.keys(data)[v]].option3
                                },
                                {
                                    'option4' : data[Object.keys(data)[v]].option4
                                })
                        }
                        else if(data[Object.keys(data)[v]].option1 && data[Object.keys(data)[v]].option2 && data[Object.keys(data)[v]].option3) {
                            options.push({
                                    'option1' : data[Object.keys(data)[v]].option1
                                },
                                {
                                    'option2' : data[Object.keys(data)[v]].option2
                                },
                                {
                                    'option3' : data[Object.keys(data)[v]].option3
                                })
                        }
                        else if(data[Object.keys(data)[v]].option1 && data[Object.keys(data)[v]].option2) {
                            options.push({
                                    'option1' : data[Object.keys(data)[v]].option1
                                },
                                {
                                    'option2' : data[Object.keys(data)[v]].option2
                                })                        }
                        else {
                            options.push({
                                    'option1' : data[Object.keys(data)[v]].option1
                                })
                        }
                        items.push(options);
                    }
                    else {*/
                    console.log(data[Object.keys(data)[v]])
                        items.push(data[Object.keys(data)[v]].answer)
                    //}
                })
                setAnswer((prevVal) => items);
                console.log(items)
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
                    if(counter == r) {
                        return <Accordion key={r}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon/>} aria-controls="additional-actions1-content"
                                              id="additional-actions1-header">
                                <Typography>{JSON.stringify(tasks[image[r]].action).substring(1, JSON.stringify(tasks[image[r]].action).length - 1)}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Box>
                                    <Box>
                                        <img
                                            style={{width: '100%'}}
                                            src={JSON.stringify(tasks[image[r]].link).substring(1, JSON.stringify(tasks[image[r]].link).length - 1)}/>
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
                                                    <FormHelperText>{helperText}</FormHelperText>
                                                    <Button type="submit" variant="outlined" color="primary">
                                                        Check Answer
                                                    </Button>
                                                </FormControl>
                                            </form> :
                                            <form onSubmit={handleSubmit}>
                                                <FormControl component="fieldset" error={error}>
                                                    <div style={{}}>
                                                        <Button value={tasks[image[r]].option1} onClick={handleChange} variant="contained" style={{ flex: 1, margin: 10}}>{JSON.stringify(tasks[image[r]].option1)}</Button>
                                                        <Button value={JSON.stringify(tasks[image[r]].option2)} onClick={handleChange} variant="contained" style={{margin: 10}}>{JSON.stringify(tasks[image[r]].option2)}</Button>
                                                        <Button value={JSON.stringify(tasks[image[r]].option3)} onClick={handleChange} variant="contained" style={{margin: 10}}>{JSON.stringify(tasks[image[r]].option3)}</Button>
                                                        {/*<Button>{JSON.stringify(tasks[image[r]].option1)}</Button>*/}
                                                    </div>
                                                    <FormHelperText>{helperText}</FormHelperText>
                                                    <Button type="submit" variant="outlined" color="primary">
                                                        Check Answer
                                                    </Button>
                                                </FormControl>
                                            </form>}


                                    </Box>
                                </Box>
                            </AccordionDetails>
                        </Accordion>
                    }
                    else {
                        return <Accordion key={r} disabled={true}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon/>} aria-controls="additional-actions1-content"
                                              id="additional-actions1-header">
                                <Typography>{JSON.stringify(tasks[image[r]].action).substring(1, JSON.stringify(tasks[image[r]].action).length - 1)}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Box>
                                    <Box>
                                        <img
                                            style={{width: '100%'}}
                                            src={JSON.stringify(tasks[image[r]].link).substring(1, JSON.stringify(tasks[image[r]].link).length - 1)}/>
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
                                                    <FormHelperText>{helperText}</FormHelperText>
                                                    <Button type="submit" variant="outlined" color="primary">
                                                        Check Answer
                                                    </Button>
                                                </FormControl>
                                            </form> :
                                            <form onSubmit={handleSubmit}>
                                                <FormControl component="fieldset" error={error}>
                                                    <div style={{}}>
                                                        <Button value={tasks[image[r]].option1} onClick={handleChange} variant="contained" style={{ flex: 1, margin: 10}}>{JSON.stringify(tasks[image[r]].option1)}</Button>
                                                        <Button value={JSON.stringify(tasks[image[r]].option2)} onClick={handleChange} variant="contained" style={{margin: 10}}>{JSON.stringify(tasks[image[r]].option2)}</Button>
                                                        <Button value={JSON.stringify(tasks[image[r]].option3)} onClick={handleChange} variant="contained" style={{margin: 10}}>{JSON.stringify(tasks[image[r]].option3)}</Button>
                                                        {/*<Button>{JSON.stringify(tasks[image[r]].option1)}</Button>*/}
                                                    </div>
                                                    <FormHelperText>{helperText}</FormHelperText>
                                                    <Button type="submit" variant="outlined" color="primary">
                                                        Check Answer
                                                    </Button>
                                                </FormControl>
                                            </form>}


                                    </Box>
                                </Box>
                            </AccordionDetails>
                        </Accordion>
                    }
                }

                })
            }
            </div>

        )
    }

 export default Task;
