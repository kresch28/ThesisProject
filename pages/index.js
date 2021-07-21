import React, {useState, useEffect, useRef, lazy, Suspense } from "react";
import Unity, { UnityContext, SendMessage } from "react-unity-webgl";
import axios from 'axios'


/*const unityContext1 = new UnityContext({
        loaderUrl: './build/AnimationTest1.loader.js',
        dataUrl: './build/AnimationTest1.data',
        frameworkUrl: './build/AnimationTest1.framework.js',
        codeUrl: './build/AnimationTest1.wasm',
    });
function GetUnityContext() {
    return (
        <Unity unityContext={unityContext1} style={{
            height: "75%",
            width: 800,
            background: "white",}}/>
    )
}
const unityContext2 = new UnityContext({
        loaderUrl: './build/AnimationTest2.loader.js',
        dataUrl: './build/AnimationTest2.data',
        frameworkUrl: './build/AnimationTest2.framework.js',
        codeUrl: './build/AnimationTest2.wasm',
    });
function GetUnityContext1() {
    return (
        <Unity unityContext={unityContext2} style={{
            height: "75%",
            width: 800,
            border: "2px solid black",
            background: "grey",}}/>
    )
}
const unityContext3 = new UnityContext({
        loaderUrl: './build/AnimationTest3.loader.js',
        dataUrl: './build/AnimationTest3.data',
        frameworkUrl: './build/AnimationTest3.framework.js',
        codeUrl: './build/AnimationTest3.wasm',
    });
function GetUnityContext2() {
    return (
        <Unity unityContext={unityContext3} style={{
            height: "75%",
            width: 800,
            border: "2px solid black",
            background: "grey",}}/>
    )
}
const unityContext4 = new UnityContext(
    {loaderUrl: './build/AnimationTest4.loader.js',
        dataUrl: './build/AnimationTest4.data',
        frameworkUrl: './build/AnimationTest4.framework.js',
        codeUrl: './build/AnimationTest4.wasm',
    });
function GetUnityContext3() {
    return (
        <Unity unityContext={unityContext4} style={{
            height: "75%",
            width: 800,
            border: "2px solid black",
            background: "grey",}}/>
    )
}
const unityContext5 = new UnityContext({
        loaderUrl: './build/AnimationTest5.loader.js',
        dataUrl: './build/AnimationTest5.data',
        frameworkUrl: './build/AnimationTest5.framework.js',
        codeUrl: './build/AnimationTest5.wasm',
    });
function GetUnityContext4() {
    return (
        <Unity unityContext={unityContext5} style={{
            height: "75%",
            width: 800,
            border: "2px solid black",
            background: "grey",}}/>
    )
}
const unityContext6 = new UnityContext({
    loaderUrl: './build/AnimationTest6.loader.js',
    dataUrl: './build/AnimationTest6.data',
    frameworkUrl: './build/AnimationTest6.framework.js',
    codeUrl: './build/AnimationTest6.wasm',
});
function GetUnityContext5() {
    return (
        <Unity unityContext={unityContext6} style={{
            height: "75%",
            width: 800,
            border: "2px solid black",
            background: "grey",}}/>
    )
}

const unityContextController = new UnityContext({
    loaderUrl: './build/AnimationControl.loader.js',
    dataUrl: './build/AnimationControl.data',
    frameworkUrl: './build/AnimationControl.framework.js',
    codeUrl: './build/AnimationControl.wasm',
});*/



import { firebase } from '../src/initFirebase'
import Lesson  from "./lessons/lessonComponent";
import Task from "./tasks/imageTask";
//import Simulation from "./data/unity";


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
const storage = firebase.storage();

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



export const CounterContext = React.createContext({val: 0, updateCounter: () => {}, });


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

    const sendDataToParent = (check) => { //
        console.log(check)
        if(check == true) {
            handleDrawerOpen(true);
            /*const timer = setTimeout(() => {
                console.log(myRef.current);
                myRef.current.scrollIntoView({ behavior: 'smooth' })
            }, 500);
            return timer;*/
        }
    };
    const sendStatusToParent = (check) => {
        if(check == true) {
            setAllDone(true);
            setReset(true);
            setCounter(0);
        }
    }

    /*const unityAnimations = [
        unityContext, unityContext2, unityContext3, unityContext4, unityContext5
    ];*/
    const [unityPlayer, setUnityPlayer] = React.useState(0);
    const sendUnityToParent = (r) => { //
        console.log('Number of Simulation ' + r)
        setUnityPlayer(r)
        /*console.log(unityAnimations[check-1])
        setUnityPlayer(check);*/
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
            //console.log(snapshot.val())
        }
        else {
        console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });

    const [unityOutput, setUnityOutput] = React.useState();

    const updateCounter = () => {
        setCounter(counter + 1)
        console.log(counter);
    }
    const [counter, setCounter] = React.useState(0);

    /*const nextSimulation = () => {
        setCounter((prevCounter) => prevCounter +1 )
    }*/
    const [simulationMedia, setSimulationMedia] = React.useState({});
    const [isLoaded, setIsLoaded] = useState(false);


    const [unityAnimations, setUnityAnimations] = React.useState({});
    const [unityVar, setUnityVar] = React.useState();
    const [contextUnity, setContextUnity] = React.useState();

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
                    if(unityPlayer == r) {
                        console.log(JSON.stringify(data[k]) + " " + r);
                        console.log(data[k].loader);
                        setUnityAnimations({context : data[k]})

                        const thisContext = new UnityContext({
                            loaderUrl: data[k].loader,
                            dataUrl: data[k].dataUrl,
                            frameworkUrl: data[k].framework,
                            codeUrl: data[k].codeUrl,
                        });
                        console.log(thisContext);
                        setContextUnity(thisContext)
                    }
                })
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    }, []);


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
                                        return (
                                            <div>{/*
                                                { unityPlayer == 0 ?
                                                    <p style={{margin: "40px"}}>Read the introduction of the lesson and work your way trough the steps of the lesson by checking them of</p> :
                                                    <p></p>}
                                                { unityPlayer == 1 ?
                                                    <div style={{visibility: isLoaded ? "visible" : "hidden", position: 'absolute'}}>
                                                        <Suspense fallback={<p>Model loading...</p>}>
                                                            <GetUnityContext />
                                                        </Suspense>
                                                    </div> :
                                                <p></p>}
                                                { unityPlayer == 2 ?
                                                    <div style={{position: 'absolute'}}>
                                                        <Suspense fallback={<p>Model loading...</p>}>
                                                            <GetUnityContext1 />
                                                        </Suspense>
                                                    </div> :
                                                    <p></p>}
                                                { unityPlayer == 3 ?
                                                    <div style={{position: 'absolute'}}>
                                                        <Suspense fallback={<p>Model loading...</p>}>
                                                            <GetUnityContext2 />
                                                        </Suspense>
                                                    </div> :
                                                    <p></p>}
                                                { unityPlayer == 4 ?
                                                    <div style={{position: 'absolute'}}>
                                                        <Suspense fallback={<p>Model loading...</p>}>
                                                            <GetUnityContext3 />
                                                        </Suspense>
                                                    </div> :
                                                    <p></p>}
                                                { unityPlayer == 5 ?
                                                    <div style={{position: 'absolute'}}>
                                                        <Suspense fallback={<p>Model loading...</p>}>
                                                            <GetUnityContext5 />
                                                        </Suspense>
                                                    </div> :
                                                    <p></p>}
                                                { unityPlayer == 6 ?
                                                    <div style={{position: 'absolute'}}>
                                                        <Suspense fallback={<p>Model loading...</p>}>
                                                            <GetUnityContext4 />
                                                        </Suspense>
                                                    </div> :
                                                    <p></p>}*/}
                                                    <div style={{position: "absolute"}}>
                                                        <Suspense fallback={<p>Model loading...</p>}>
                                                            <Unity unityContext={contextUnity} style={{
                                                                height: "75%",
                                                                width: 800,
                                                                border: "2px solid black",
                                                                background: "grey",}}/>
                                                        </Suspense>
                                                    </div>
                                                {/*<div style={{position: 'absolute'}}>
                                                    <Suspense fallback={<p>Model loading...</p>}>
                                                        <GetUnityContext4 />
                                                    </Suspense>
                                                </div>
                                                <div style={{position: 'absolute'}}>
                                                    <Suspense fallback={<p>Model loading...</p>}>
                                                        <GetUnityContext3 />
                                                    </Suspense>
                                                </div>
                                                <div style={{position: 'absolute'}}>
                                                    <Suspense fallback={<p>Model loading...</p>}>
                                                        <GetUnityContext2 />
                                                    </Suspense>
                                                </div>
                                                <div style={{position: 'absolute'}}>
                                                    <Suspense fallback={<p>Model loading...</p>}>
                                                        <GetUnityContext1 />
                                                    </Suspense>
                                                </div>
                                                <div style={{position: 'absolute'}}>
                                                    <Suspense fallback={<p>Model loading...</p>}>
                                                        <GetUnityContext />
                                                    </Suspense>
                                                </div>*/}
                                            </div>
                                        )
                                    }
                                }

                                }
                            )}
                        </div>

                        {/*<Button variant="outlined"  onClick={sendDataToUnity1}>
                            Show
                        </Button>
                        <Button variant="outlined"  onClick={sendDataToUnity2}>
                            Hide
                        </Button>*/}
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
                        {/*<p align="center">

                            {open ? (<Button onClick={handleDrawerClose}>Close</Button>) :
                                (<Button onClick={handleDrawerOpen}>Open Tasks</Button> ) }
                        </p>*/}
                        <Slide direction="right" in={open} mountOnEnter unmountOnExit>
                            <div>
                                <Paper square elevation={0}>
                                    <h2 align="center">Questions</h2>
                                </Paper>

                                <Task activeStep={activeStep} sendStatusToParent={sendStatusToParent} reset={reset}/>
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
