import React, {useState, useEffect} from "react";
import { firebase } from '../../src/initFirebase'
import axios from 'axios';

const db = firebase.database();

import {makeStyles, Typography} from "@material-ui/core";

import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box';
import { createMuiTheme } from '@material-ui/core/styles';

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';


let theme = createMuiTheme();
theme.spacing(2);

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        paddingLeft: theme.spacing(4),
        backgroundColor: theme.palette.background.default,
    },
    props: {
        backgroundColor: '#C1C1C1',
    }
}));

function Lesson(props) {

    const classes = useStyles(theme);

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
    const maxSteps = tutorialSteps.length;

    const [didMount, setDidMount] = useState(false);

    const [allDone, setAllDone] = React.useState(1);

    const handleProgress = () => {
        if(allDone == tutorialSteps[props.activeStep].tasks) {
            props.sendDataToParent(true);
            console.log('done');
        }
        console.log(tutorialSteps[props.activeStep].tasks);
        console.log(allDone);
        setAllDone((prevProgress) => prevProgress +1)
        console.log(props.allDone);
    }

    const [tasks, setTasks] = React.useState({})
    const [taskDescription, setTaskDescription] = React.useState({})
    useEffect(async () => {
        const ref = db.ref();
        await ref.child("tasks").get().then((snapshot) => {
            if (snapshot.exists()) {
                setTaskDescription(snapshot.val());
                const data = snapshot.val();
                setTasks(Object.keys(data));

            } else {
                console.log("No data available");
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
       <Box>
       <Paper square elevation={0}>
       </Paper>
           {Object.keys(taskDescription).map( (k,r) => {
               if(JSON.stringify(tutorialSteps[props.activeStep].label).substring(1,JSON.stringify(tutorialSteps[props.activeStep].label).length-1) == JSON.stringify(taskDescription[tasks[r]]['lesson']).substring(1, JSON.stringify(taskDescription[tasks[r]]['lesson']).length - 1)) {
                   console.log('yes')
               return <Accordion key={r}>
                   <AccordionSummary className={classes.props} expandIcon={<ExpandMoreIcon/>}
                                     aria-controls="panel2a-content" id="panel2a-header">
                       <FormControlLabel
                           aria-label="Acknowledge"
                           onClick={handleProgress}
                           control={<Checkbox />}/>
                       <Typography>{JSON.stringify(taskDescription[tasks[r]]['task']).substring(1, JSON.stringify(taskDescription[tasks[r]]['task']).length - 1)}</Typography>
                   </AccordionSummary>
                   <AccordionDetails>
                       <Typography>{JSON.stringify(taskDescription[tasks[r]]['taskDescription']).substring(1, JSON.stringify(taskDescription[tasks[r]]['taskDescription']).length - 1)}</Typography>
                   </AccordionDetails>
               </Accordion>
               }
               }
           )}
       </Box>
   )


}
export { Lesson };
