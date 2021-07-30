import React, {useState, useEffect, useRef, lazy, Suspense } from "react";
import Unity, { UnityContext, SendMessage } from "react-unity-webgl";
import axios from 'axios'


const pinContext = new UnityContext({
        loaderUrl: './build/PinAnimation.loader.js',
        dataUrl: './build/PinAnimation.data',
        frameworkUrl: './build/PinAnimation.framework.js',
        codeUrl: './build/PinAnimation.wasm',
    });
function GetPinAnimation() {
    return (
        <Unity unityContext={pinContext} style={{
            height: "75%",
            width: 800,
            background: "white",}}/>
    )
}
const usbContex = new UnityContext({
        loaderUrl: './build/USBAnimation.loader.js',
        dataUrl: './build/USBAnimation.data',
        frameworkUrl: './build/USBAnimation.framework.js',
        codeUrl: './build/USBAnimation.wasm',
    });
function GetUSBAnimation() {
    return (
        <Unity unityContext={usbContex} style={{
            height: "75%",
            width: 800,
            border: "2px solid black",
            background: "grey",}}/>
    )
}
const powerContext = new UnityContext({
        loaderUrl: './build/PowerLed.loader.js',
        dataUrl: './build/PowerLed.data',
        frameworkUrl: './build/PowerLed.framework.js',
        codeUrl: './build/PowerLed.wasm',
    });
function GetPowerLedAnimation() {
    return (
        <Unity unityContext={powerContext} style={{
            height: "75%",
            width: 800,
            border: "2px solid black",
            background: "grey",}}/>
    )
}
const osciliatorContext = new UnityContext(
    {loaderUrl: './build/OsciliatorAnimation.loader.js',
        dataUrl: './build/OsciliatorAnimation.data',
        frameworkUrl: './build/OsciliatorAnimation.framework.js',
        codeUrl: './build/OsciliatorAnimation.wasm',
    });
function GetOsciliatorAnimation() {
    return (
        <Unity unityContext={osciliatorContext} style={{
            height: "75%",
            width: 800,
            border: "2px solid black",
            background: "grey",}}/>
    )
}
const primairyICContext = new UnityContext({
        loaderUrl: './build/Neuer Ordner.loader.js',
        dataUrl: './build/IC.data',
        frameworkUrl: './build/IC.framework.js',
        codeUrl: './build/IC.wasm',
    });
function GetPrimaryICContext() {
    return (
        <Unity unityContext={primairyICContext} style={{
            height: "75%",
            width: 800,
            border: "2px solid black",
            background: "grey",
        }}/>
    )
}
const resetButtonContext = new UnityContext({
    loaderUrl: './build/ResetButton.loader.js',
    dataUrl: './build/ResetButton.data',
    frameworkUrl: './build/ResetButton.framework.js',
    codeUrl: './build/ResetButton.wasm',
});
function GetResetButtonContext() {
    return (
        <Unity unityContext={resetButtonContext} style={{
            height: "75%",
            width: 800,
            border: "2px solid black",
            background: "grey",
        }}/>
    )
}

const breadBoardContext = new UnityContext({
    loaderUrl: './build/BreadboardAnimation.loader.js',
    dataUrl: './build/BreadboardAnimation.data',
    frameworkUrl: './build/BreadboardAnimation.framework.js',
    codeUrl: './build/BreadboardAnimation.wasm',
});
function GetBreadBoardContext() {
    return (
        <Unity unityContext={breadBoardContext} style={{
            height: "75%",
            width: 800,
            border: "2px solid black",
            background: "grey",
        }}/>
    )
}

import { firebase } from '../src/initFirebase'
import Lesson  from "./lessons/lessonComponent";
import Task from "./tasks/imageTask";


import { Typography } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { createMuiTheme } from '@material-ui/core/styles';

import Head from 'next/head'
import Link from '@material-ui/core/Link'
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
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
const storage = firebase.storage();

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
        color: 'black',
        alignItems: 'center'

    }
}));

export const CounterContext = React.createContext({val: 0, updateCounter: () => {}, });


export default function Home(context) {

    // Pass the props as the first argument of useStyles()
    const classes = useStyles(theme);

    //const [checked, setChecked] = React.useState(false);
    //const handleChange = () => {
    //         setChecked((prev) => !prev);
    //     };

    //Tasks Animation
    const [open, setOpen] = React.useState(false);
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
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
        handleDrawerClose()
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }

    const handleDirectLink = (id) => {
        setActiveStep((prevActiveStep) => id);
    };

    const [allDone, setAllDone] = React.useState(false);
    const [reset, setReset] = React.useState(false);
    const myRef = useRef();

    //after all steps of the lessons are finished the questions open
    const sendDataToParent = (check) => { //
        console.log(check)
        if(check == true) {
            handleDrawerOpen(true);
        }
    };
    //after the whole lesson is finished
    const sendStatusToParent = (check) => {
        if(check == true) {
            setAllDone(true);
            setReset(true);
            setCounter(0);
        }
    }

    //which animation to the according lesson should be displayed
    const [unityPlayer, setUnityPlayer] = React.useState(0);
    const sendUnityToParent = (r) => { //
        console.log('Number of Simulation ' + r)
        setUnityPlayer(r)
    };

    //Communication with Unity
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

    const updateCounter = () => {
        setCounter(counter + 1);
        console.log(counter);
    }
    const [counter, setCounter] = React.useState(0);

    const [simulationMedia, setSimulationMedia] = React.useState({});
    const [isLoaded, setIsLoaded] = useState(false);



    const [contextUnity, setContextUnity] = React.useState();

  /*
  const [unityAnimations, setUnityAnimations] = React.useState({});
    const [unityVar, setUnityVar] = React.useState();
  const getUnityContext = () => {
        console.log(context);
        const contextR = new UnityContext(
            {
                loaderUrl: context.loader,
                dataUrl: context.dataUrl,
                frameworkUrl: context.framework,
                codeUrl: context.codeUrl,
            }
        )
        return (
            <Unity unityContext={contextR} style={{
                height: "75%",
                width: 800,
                background: "white",}}/>
        )
    }

    const [loaderUrl, setLoaderUrl] = React.useState('');
    const [dataUrl, setDataUrl] = React.useState('');
    const [frameworkUrl, setFrameworkUrl] = React.useState('');
    const [codeUrl, setCodeUrl] = React.useState('');

    const returnUnityContext =()=> {
        return contextUnity;
    } */

    useEffect(async () => {
        if(allDone == true) {

        }
        const ref = db.ref();
        await ref.child("media").get().then((snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                //console.log(data);
                setSimulationMedia(data);
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });

        await ref.child("simulations").get().then((snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                Object.keys(data).map((k,r) => {
                  if(r == counter) {
                const thisContext = new UnityContext({
                            loaderUrl: data[k].loader,
                            dataUrl: data[k].dataUrl,
                            frameworkUrl: data[k].framework,
                            codeUrl: data[k].codeUrl,
                        });
                        setContextUnity(thisContext);

                  }
                })

            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    }, [counter]);


    //const unityInstance = UnityLoader.instatiate('unityContainer', "./build/AnimationControl.loader.js", {onProgress: UnityProgress});
    /*const turnOn = () => {
        SendMessage('Arduino_uno', 'ctrl("1")');
    };
    const turnOff = () => {
        SendMessage('Arduino_uno', 'ctrl("2")');

    LOOK HERE https://www.npmjs.com/package/react-unity-webgl/v/6.3.1#calling-unity-scripts-functions-from-javascript-in-react
    }*/

    const [start, setStart] = React.useState(false);
    const startLesson = () => {
        setStart(true);
        updateCounter();
    };



    return (
      <div>
          <CounterContext.Provider value={{counter, updateCounter}}>
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
                        <div>
                            {Object.keys(simulationMedia).map( (key,r) => {
                                if(JSON.stringify(tutorialSteps[activeStep].label).substring(1,JSON.stringify(tutorialSteps[activeStep].label).length-1) == JSON.stringify(simulationMedia[key].lesson).substring(1, JSON.stringify(simulationMedia[key].lesson).length - 1)) {

                                    return (<div key={r}>
                                        <img style={{width: '100%'}} src={JSON.stringify(simulationMedia[key].link).substring(1, JSON.stringify(simulationMedia[key].link).length - 1)}/>
                                    </div> )
                                }
                                else {
                                    if(start) {
                                        if(activeStep == 0) {
                                            return (
                                                <div>
                                                    {unityPlayer == 0 ?
                                                        <p style={{margin: "40px"}}>Read the introduction of the lesson
                                                            and work your way trough the steps of the lesson by checking
                                                            them of</p> :
                                                        <p></p>}
                                                    {unityPlayer == 1 ?
                                                        <div style={{position: 'absolute'}}>
                                                            <Suspense fallback={<p>Model loading...</p>}>
                                                                <GetPinAnimation/>
                                                            </Suspense>
                                                        </div> :
                                                        <p></p>}
                                                    {unityPlayer == 2 ?
                                                        <div style={{position: 'absolute'}}>
                                                            <Suspense fallback={<p>Model loading...</p>}>
                                                                <GetUSBAnimation/>
                                                            </Suspense>
                                                        </div> :
                                                        <p></p>}
                                                    {unityPlayer == 3 ?
                                                        <div style={{position: 'absolute'}}>
                                                            <Suspense fallback={<p>Model loading...</p>}>
                                                                <GetPowerLedAnimation/>
                                                            </Suspense>
                                                        </div> :
                                                        <p></p>}
                                                    {unityPlayer == 4 ?
                                                        <div style={{position: 'absolute'}}>
                                                                <Suspense fallback={<p>Model loading...</p>}>
                                                                <GetPrimaryICContext/>
                                                            </Suspense>
                                                        </div> :
                                                        <p></p>}
                                                    {unityPlayer == 5 ?
                                                        <div style={{position: 'absolute'}}>
                                                            <Suspense fallback={<p>Model loading...</p>}>
                                                                <GetOsciliatorAnimation/>
                                                            </Suspense>
                                                        </div> :
                                                        <p></p>}
                                                    {unityPlayer == 6 ?
                                                        <div style={{position: 'absolute'}}>
                                                            <Suspense fallback={<p>Model loading...</p>}>
                                                                <GetResetButtonContext/>
                                                            </Suspense>
                                                        </div> :
                                                        <p></p>}
                                                </div>
                                            )
                                        }
                                        if(activeStep == 1) {
                                            return (
                                                <div>
                                                    {unityPlayer == 8 ?
                                                        <div style={{position: 'absolute'}}>
                                                            <Suspense fallback={<p>Model loading...</p>}>
                                                                <GetBreadBoardContext/>
                                                            </Suspense>
                                                        </div> :
                                                        <p></p>}
                                                </div>
                                            )

                                        }
                                    }
                                }

                                }
                            )}
                        </div>


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
                                    explaining their functionality. With these set of components we will show how quick and easy it is to compose a <Link href="#" onClick={() => handleDirectLink(2)} color="primary">Basic Circuit</Link>.
                                    For advanced circuits we will also show you some <Link href="#"  onClick={() => handleDirectLink(3)} color="primary">Additional Components</Link> that can be added to a circuit.
                                    Lastly we will introduce into the basics of <Link href="#" onClick={() => handleDirectLink(1)} color="primary">Circuit Schematics</Link> and show you the basics on how to code with the <Link href="#" onClick={() => handleDirectLink(4)} color="primary">Arduino Software</Link>.
                                    That will allow you to read instructions for different circuits and program and control your Arduino.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                        <p></p>
                        <Box>
                            <Button variant="outlined" color="primary" onClick={startLesson} >
                                Start Lesson
                            </Button>
                        </Box>
                        <p></p>
                        < Lesson activeStep={activeStep} sendDataToParent={sendDataToParent} sendUnityToParent={sendUnityToParent} reset={reset}/>

                        <MobileStepper
                            steps={maxSteps}
                            position="static"
                            variant="text"
                            activeStep={activeStep}
                            nextButton={
                                <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1 || allDone !== true}>
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

                        <Slide direction="right" in={open} mountOnEnter unmountOnExit>
                            <div>
                                <Paper square elevation={0}>
                                    <h2 align="center">Questions</h2>
                                </Paper>

                                <Task activeStep={activeStep} sendStatusToParent={sendStatusToParent} reset={reset}/>

                            </div>
                        </Slide>
                    </Grid>
                </Grid>
            </main>

            <footer>
                <Container maxWidth="sm">
                    <p ref={myRef}></p>
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
          </CounterContext.Provider>
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
