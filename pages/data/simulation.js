import React, {useState, useEffect, Suspense} from "react";
import Unity, { UnityContext, SendMessage } from "react-unity-webgl";
import { firebase } from '../../src/initFirebase'
import axios from 'axios';
import { CounterContext } from '../index'

const db = firebase.database();

import {createMuiTheme, makeStyles, Typography} from "@material-ui/core";
let theme = createMuiTheme();
theme.spacing(2);

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
}));

function Simulation() {
    const classes = useStyles(theme);
    const { counter, updateCounter } = React.useContext(CounterContext);
    const { dataUnity, setDataUnity} = React.useState();
    const { unityContext, setUnityContext } = React.useState();

    useEffect(async () => {
        console.log(counter);
        const ref = db.ref();
        await ref.child("simulations").get().then((snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                Object.keys(data).map((k,r) => {
                    if(r == counter) {
                        console.log(JSON.stringify(data[k]) + " " + r);
                        console.log(data[k].loader);

                        const thisContext = new UnityContext({
                            loaderUrl: data[k].loader,
                            dataUrl: data[k].dataUrl,
                            frameworkUrl: data[k].framework,
                            codeUrl: data[k].codeUrl,
                        });
                        console.log('contextObject' + JSON.stringify(thisContext));
                        setUnityContext(() => thisContext)
                    }
                })
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    }, [counter]);
    return (
        <div>
            <div style={{position: "absolute"}}>
                <Suspense fallback={<p>Model loading...</p>}>
                    <Unity unityContext={unityContext} style={{
                        height: "75%",
                        width: 800,
                        border: "2px solid black",
                        background: "grey",}}/>
                </Suspense>
            </div>

        </div>
    )
}

export default Simulation;
