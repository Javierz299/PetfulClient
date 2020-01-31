import React from 'react';
import { Link } from 'react-router-dom';

const landing = () => {
    return (
        <section>
            <h3>Welcome to Petful Adoption services!</h3>
            <p>
            See which pets are next in line to be adopted 
            </p>
            <Link to='/adopt'><button >Start adopting!</button></Link>
            
        </section>
    )
}

export default landing;