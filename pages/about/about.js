import Link from 'next/link'
import Container from '@material-ui/core/Container';
import React from "react";

export default function About() {
    return (
        <>

                <Container maxWidth="lg">
                    <h1>About this project</h1>
                    <p>This course is an introduction into the field of interactive prototyping with electronics. No prior experience in electronics are necessary since the lessons will teach you how to work with an Arduino Microcontroller. First the Arduino board itself will be introduced and the basics of how to set up and configure a microcontroller will be shown. Based on these techniques small examples of simple circuits will be explained. The goal of the course is to combine the skills of working with an Arduino with knowledge from a variety of backgrounds in order to realise prototyping projects with ease in the future.</p>
                    <h2>
                        <Link href="/">
                            <a>Back to home</a>
                        </Link>
                    </h2>
                </Container>

    </>
    )
}
