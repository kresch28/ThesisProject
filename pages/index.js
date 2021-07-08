import React, {useState, useEffect} from "react";
import Unity, { UnityContext, SendMessage } from "react-unity-webgl";


const unityContext = new UnityContext({
    loaderUrl: './build/AnimationTest1.loader.js',
    dataUrl: './build/AnimationTest1.data',
    frameworkUrl: './build/AnimationTest1.framework.js',
    codeUrl: './build/AnimationTest1.wasm',
});

const unityContext2 = new UnityContext({
    loaderUrl: './build/AnimationTest2.loader.js',
    dataUrl: './build/AnimationTest2.data',
    frameworkUrl: './build/AnimationTest2.framework.js',
    codeUrl: './build/AnimationTest2.wasm',
});

const unityContextController = new UnityContext({
    loaderUrl: './build/AnimationControl.loader.js',
    dataUrl: './build/AnimationControl.data',
    frameworkUrl: './build/AnimationControl.framework.js',
    codeUrl: './build/AnimationControl.wasm',
});


import { firebase } from '../src/initFirebase'
import Lesson  from "./lessons/lessonComponent";
import Task from "./tasks/imageTask";



import Head from 'next/head'
import Link from '@material-ui/core/Link'
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import { createMuiTheme } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Paper from '@material-ui/core/Paper';

import MobileStepper from '@material-ui/core/MobileStepper';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

import Slide from '@material-ui/core/Slide';

let theme = createMuiTheme();
theme.spacing(2);

const db = firebase.database();

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    textCenter: {
        alignItems: props => props.alignItems,
    },
    container: {
        display: 'flex',
    },
    paper: {
        margin: theme.spacing(1),
    },
    svg: {
        width: 100,
        height: 100,
    },
    polygon: {
        fill: theme.palette.common.white,
        stroke: theme.palette.divider,
        strokeWidth: 1,
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
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
    img: {
        height: 255,
        maxWidth: 400,
        overflow: 'hidden',
        display: 'block',
        width: '100%',
    },
    props: {
        color: 'black',
        alignItems: 'center'
    },
    accordion: {
        backgroundColor: '#BAE6FF',
    }
}));



export default function Home(context) {

    // Pass the props as the first argument of useStyles()
    const classes = useStyles(theme);
    const [checked, setChecked] = React.useState(false);
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    let AuthButton;
    if (open) {
        AuthButton = <Button variant="contained" onClick={handleDrawerClose}>Default</Button>;
    } else {
        AuthButton = <Button variant="contained" onClick={handleDrawerOpen}>Default</Button>
        ;
    }

    const [selectedIndex, setSelectedIndex] = React.useState(1);

    function handleListItemClick(event, index) {
        setSelectedIndex(index);
    }

    const handleChange = () => {
        setChecked((prev) => !prev);
    };

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

    const [activeStep, setActiveStep] = React.useState(0);
    const maxSteps = tutorialSteps.length;

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }

    const handleDirectLink = (id) => {
        setActiveStep((prevActiveStep) => id);
    };

    const [allDone, setAllDone] = React.useState(false);
    const sendDataToParent = (check) => { //
        console.log(check);
        if(check == true) {
            handleDrawerOpen(true);
        }
    };

    const unityAnimations = [
        unityContext, unityContext2
    ];
    const [unityPlayer, setUnityPlayer] = React.useState(0);
    const sendUnityToParent = (check) => { //
        console.log(check)
        console.log(unityAnimations[check-1])
        setUnityPlayer(check);
    };
    const sendDataToUnity1 = () => {
        console.log('here');
        console.log(unityContextController);
        unityContextController.send('Arduino_uno','ctrl', '1')
    }
    const sendDataToUnity2 = () => {
        console.log('here');
        console.log(unityContextController);
        unityContextController.send('Arduino_uno','ctrl', '2')
    }

    const data = db.ref().child("tasks").get().then((snapshot) => {
        if (snapshot.exists()) {
            console.log(snapshot.val())
        }
        else {
        console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });

    console.log(data);

    //const unityInstance = UnityLoader.instatiate('unityContainer', "./build/AnimationControl.loader.js", {onProgress: UnityProgress});
    /*const turnOn = () => {
        SendMessage('Arduino_uno', 'ctrl("1")');
    };
    const turnOff = () => {
        SendMessage('Arduino_uno', 'ctrl("2")');

    LOOK HERE https://www.npmjs.com/package/react-unity-webgl/v/6.3.1#calling-unity-scripts-functions-from-javascript-in-react
    }*/

  return (
      <div>
          <Box className={classes.props} border={5} borderColor="orange" m={3} p={2}>
        <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
        </Head>

        <main>
            <Container maxWidth="sm">
                <h1 align="center">
                Read{' '}
                <Link href="/posts/first-post" color="inherit">
                    this page!
                </Link>
                </h1>
          </Container>

                <Grid container spacing={3}>
                    <Grid item xs={6} style={{display: "flex", height: 600}}>
                        {/*<p align="center">Simulation</p>*/}
                        <Unity unityContext={unityContextController} style={{
                            height: "75%",
                            width: 800,
                            border: "2px solid black",
                            background: "grey",
                        }}/>
                        <Button variant="outlined"  onClick={sendDataToUnity1}>
                            Show
                        </Button>
                        <Button variant="outlined"  onClick={sendDataToUnity2}>
                            Hide
                        </Button>
                        <p>{Object.keys(unityAnimations).map( (k,r) => {
                            if(unityPlayer-1 == r) {
                                <Unity unityContext={unityAnimations[r]} style={{
                                    height: "75%",
                                    width: 800,
                                    border: "2px solid black",
                                    background: "grey",
                                }}/>                            }
                        })}</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p align="center">Task Management</p>
                        <Accordion >
                            <AccordionSummary className={classes.accordion} expandIcon={<ExpandMoreIcon />} aria-controls="panel2a-content" id="panel2a-header">
                                <Typography>About this course</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography> This course is an introduction into the field of interactive prototyping with electronics. No prior experience in electronics are necessary since the lessons will teach you how to work with an Arduino Microcontroller. First the Arduino board itself will be introduced and the basics of how to set up and configure a microcontroller will be shown. Based on these techniques small examples of simple circuits will be explained. The goal of the course is to combine the skills of working with an Arduino with knowledge from a variety of backgrounds in order to realise prototyping projects with ease in the future.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion >
                            <AccordionSummary className={classes.accordion} expandIcon={<ExpandMoreIcon />} aria-controls="panel2a-content" id="panel2a-header">
                                <Typography>Lessons</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>This course is structured as follows: First we will concentrate on naming the individual <Link href="#" onClick={() => handleDirectLink(0)} color="primary">Arduino Components</Link> and
                                    explaining their functionality. With these set of components we will show how quick and easy it is to compose a <Link href="#" onClick={() => handleDirectLink(1)} color="primary">Basic Circuit</Link>.
                                    For advanced circuits we will also show you some <Link href="#"  onClick={() => handleDirectLink(2)} color="primary">Additional Comonents</Link> that can be added to a circuit.
                                    Lastly we will introduce into the basics of <Link href="#" onClick={() => handleDirectLink(3)} color="primary">Circuit Schematics</Link> and show you the basics on how to code with the <Link href="#" onClick={() => handleDirectLink(4)} color="primary">Arduino Software</Link>.
                                    That will allow you to read instructions for different circuits and program and control your Arduino.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                        <Box>
                            <p></p>
                        </Box>

                        < Lesson activeStep={activeStep} sendDataToParent={sendDataToParent} sendUnityToParent={sendUnityToParent}/>

                        <MobileStepper
                            steps={maxSteps}
                            position="static"
                            variant="text"
                            activeStep={activeStep}
                            nextButton={
                                <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
                                    Next
                                    {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                                </Button>
                            }
                            backButton={
                                <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                                    {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                                    Back
                                </Button>
                            }
                        />
                        <p></p>
                        <p align="center">

                            {open ? (<Button onClick={handleDrawerClose}>Close</Button>) :
                                (<Button onClick={handleDrawerOpen}>Open Tasks</Button> ) }
                        </p>
                        <Slide direction="right" in={open} mountOnEnter unmountOnExit>
                            <div>
                                <Paper square elevation={0}>
                                    <Typography align="center">Tasks</Typography>
                                </Paper>

                                <Task activeStep={activeStep}/>
                                {/*<Accordion>
                                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2a-content" id="panel2a-header">
                                        <Typography>Task 2</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>*/}
                            </div>
                        </Slide>
                    </Grid>
                </Grid>
                {/*<Grid container spacing={3}>
                    <Grid item xs={6}>
                        <div className={classes.container}>
                            <Fade in={checked}>
                                <Paper elevation={4} className={classes.paper}>
                                    <svg className={classes.svg}>
                                        <polygon points="0,100 50,00, 100,100" className={classes.polygon} />
                                    </svg>
                                </Paper>
                            </Fade>
                        </div>
                    </Grid>
                    <Grid item xs={6} style={{ width: 200, whiteSpace: 'nowrap'}}>
                        <p align="center">Document Management</p>
                        <Box component="div" my={2} overflow="auto" bgcolor="background.paper" display="flex"
                             flexWrap="nowrap">
                            <Box component="div" my={2} m={4}>
                                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                                        Word of the Day
                                    </Typography>
                                    <Typography variant="h5" component="h2">
                                        <FormControlLabel
                                            control={<Switch checked={checked} onChange={handleChange} />}
                                            label="Show"
                                        />
                                    </Typography>
                                    <Typography className={classes.pos} color="textSecondary">
                                        adjective
                                    </Typography>
                                    <Typography variant="body2" component="p">
                                        well meaning and kindly.
                                        <br />
                                        {'"a benevolent smile"'}
                                    </Typography>
                            </Box>
                            <Box component="div" my={2} m={4}>
                                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                                        Word of the Day
                                    </Typography>
                                    <Typography variant="h5" component="h2">
                                        <FormControlLabel
                                            control={<Switch checked={checked} onChange={handleChange} />}
                                            label="Show"
                                        />
                                    </Typography>
                                    <Typography className={classes.pos} color="textSecondary">
                                        adjective
                                    </Typography>
                                    <Typography variant="body2" component="p">
                                        well meaning and kindly.
                                        <br />
                                        {'"a benevolent smile"'}
                                    </Typography>
                            </Box>
                            <Box component="div" my={2} m={4}>
                                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                                        Word of the Day
                                    </Typography>
                                    <Typography variant="h5" component="h2">
                                        <FormControlLabel
                                            control={<Switch checked={checked} onChange={handleChange} />}
                                            label="Show"
                                        />
                                    </Typography>
                                    <Typography className={classes.pos} color="textSecondary">
                                        adjective
                                    </Typography>
                                    <Typography variant="body2" component="p">
                                        well meaning and kindly.
                                        <br />
                                        {'"a benevolent smile"'}
                                    </Typography>
                            </Box>
                            <Box component="div" my={2} m={4}>
                                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                                        Word of the Day
                                    </Typography>
                                    <Typography variant="h5" component="h2">
                                        <FormControlLabel
                                            control={<Switch checked={checked} onChange={handleChange} />}
                                            label="Show"
                                        />
                                    </Typography>
                                    <Typography className={classes.pos} color="textSecondary">
                                        adjective
                                    </Typography>
                                    <Typography variant="body2" component="p">
                                        well meaning and kindly.
                                        <br />
                                        {'"a benevolent smile"'}
                                    </Typography>
                            </Box>
                            <Box component="div" my={2} m={4}>
                                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                                        Word of the Day
                                    </Typography>
                                    <Typography variant="h5" component="h2">
                                        <FormControlLabel
                                            control={<Switch checked={checked} onChange={handleChange} />}
                                            label="Show"
                                        />
                                    </Typography>
                                    <Typography className={classes.pos} color="textSecondary">
                                        adjective
                                    </Typography>
                                    <Typography variant="body2" component="p">
                                        well meaning and kindly.
                                        <br />
                                        {'"a benevolent smile"'}
                                    </Typography>
                            </Box>
                            Overflow Auto.
                            Overflow Auto.
                            Overflow Auto.
                            Overflow Auto.

                        </Box>

                    </Grid>
                </Grid>*/}
    </main>

      <footer>
    <Container maxWidth="sm">
        <h1 className="title" align="center">
            <Link href="/about/about">
                About
            </Link>
         </h1>
        <h1 className="title" align="center">
        <Link href="/admin/tasks">
            Tasks
        </Link>
    </h1>
        </Container>
      </footer>
          </Box>



      </div>

  )
}

export async function getServerSideProps(context) {
    const url = db.ref('results');
    const res = await fetch(url);
    const data = await JSON.stringify(res);

    if (!data) {
        return {
            notFound: true,
        }
    }

    return {
        props: {data}, // will be passed to the page component as props
    }
}
