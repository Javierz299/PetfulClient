import React from 'react';
import { Link } from 'react-router-dom';

const landing = () => {
    return (
        <section>
            <h3>A Petful animal shelter for cats and dogs</h3>
            <p>
                Click below to find the newest addition to your family today!
            </p>
            <Link to='/adopt'><button >Start adopting!</button></Link>

        </section>
    )
}

export default landing;