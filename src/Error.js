import React from 'react';
import {Link} from "react-router-dom";

const Error = () => {
    return (
        <section>
            <div className="wrapper">
                <h1>oops! there's no such page</h1>
                <Link to="/" className="btn">
                    back home
                </Link>
            </div>
        </section>
    );
};

export default Error;