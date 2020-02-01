import React from 'react';
import { Link } from 'react-router-dom';
import dogcat from './assets/pawprint.jpg';

const landing = () => {
    return (
        <section>
            <h2> @@ @@ @@ </h2>
            <h3>A Petful animal shelter for cats and dogs!</h3>
            <p>
                Click below to join the queue and find the newest addition to your family today!
            </p>
            <div id='buttonContainer'>
                <Link
                    id='startButton'
                    to='/adopt'>Start adopting!</Link>
            </div>
        </section>
    )
}

export default landing;