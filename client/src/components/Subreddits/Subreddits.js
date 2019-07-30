// import React, { Component } from 'react';
import React from 'react';
import "./Subreddits.css"


function Subreddits(props) {
    return (
        <div className="col-md-4">
                <button type="button" className="btn btn-danger" onClick={props.changeSubreddit}>{props.name}</button>
        </div>
    )
}

export default Subreddits;