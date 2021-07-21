import React from "react";

import Unity, { UnityContext, SendMessage } from "react-unity-webgl";


const unityAnimations = [
    {
        loaderUrl: './build/AnimationTest1.loader.js',
        dataUrl: './build/AnimationTest1.data',
        frameworkUrl: './build/AnimationTest1.framework.js',
        codeUrl: './build/AnimationTest1.wasm',
    },{
        loaderUrl: './build/AnimationTest2.loader.js',
        dataUrl: './build/AnimationTest2.data',
        frameworkUrl: './build/AnimationTest2.framework.js',
        codeUrl: './build/AnimationTest2.wasm',
    },{
        loaderUrl: './build/AnimationTest3.loader.js',
        dataUrl: './build/AnimationTest3.data',
        frameworkUrl: './build/AnimationTest3.framework.js',
        codeUrl: './build/AnimationTest3.wasm',
    },{
        loaderUrl: './build/AnimationTest4.loader.js',
        dataUrl: './build/AnimationTest4.data',
        frameworkUrl: './build/AnimationTest4.framework.js',
        codeUrl: './build/AnimationTest4.wasm',
    },{
        loaderUrl: './build/AnimationTest5.loader.js',
        dataUrl: './build/AnimationTest5.data',
        frameworkUrl: './build/AnimationTest5.framework.js',
        codeUrl: './build/AnimationTest5.wasm',
    },{
        loaderUrl: './build/AnimationTest6.loader.js',
        dataUrl: './build/AnimationTest6.data',
        frameworkUrl: './build/AnimationTest6.framework.js',
        codeUrl: './build/AnimationTest6.wasm',
    }];

const unityContext1 = new UnityContext({
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
const unityContext3 = new UnityContext({
    loaderUrl: './build/AnimationTest3.loader.js',
    dataUrl: './build/AnimationTest3.data',
    frameworkUrl: './build/AnimationTest3.framework.js',
    codeUrl: './build/AnimationTest3.wasm',
});
const unityContext4 = new UnityContext(
    {loaderUrl: './build/AnimationTest4.loader.js',
        dataUrl: './build/AnimationTest4.data',
        frameworkUrl: './build/AnimationTest4.framework.js',
        codeUrl: './build/AnimationTest4.wasm',
    });
const unityContext5 = new UnityContext({
    loaderUrl: './build/AnimationTest5.loader.js',
    dataUrl: './build/AnimationTest5.data',
    frameworkUrl: './build/AnimationTest5.framework.js',
    codeUrl: './build/AnimationTest5.wasm',
});
const unityContext6 = new UnityContext({
    loaderUrl: './build/AnimationTest6.loader.js',
    dataUrl: './build/AnimationTest6.data',
    frameworkUrl: './build/AnimationTest6.framework.js',
    codeUrl: './build/AnimationTest6.wasm',
});

const unityContextController = new UnityContext({
    loaderUrl: './build/AnimationControl.loader.js',
    dataUrl: './build/AnimationControl.data',
    frameworkUrl: './build/AnimationControl.framework.js',
    codeUrl: './build/AnimationControl.wasm',
});

export default function Simulation() {
    return (
        <div>
        {Object.keys(unityAnimations).map( (k,r) =>
                <div style={{position: 'absolute'}}>
                    <Unity unityContext={JSON.stringify(unityAnimations[0])} style={{
                        height: "75%",
                        width: 800,
                        border: "2px solid black",
                        background: "grey",
                    }}/>
                </div>

            )}
        </div>
    )
}
