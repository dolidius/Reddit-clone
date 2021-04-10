import React from 'react';
import { Link } from 'react-router-dom';

const SubredditDetails = ({
    name,
    description,

}) => {
    return (
        <div className="subreddit__details">
            <h3 className="subreddit__details-title">
                Community details
            </h3>
            
            <h2 className="subreddit__name">
                <Link to={`/r/${name}`}> r/{name} </Link>
            </h2>
            
            <p className="subreddit__details-desc">
               {description}
            </p>
                                    
            <div className="subreddit__details-anchor">
                <Link className="button button--sm button--blue" to={`/r/${name}/addpost`}>
                    Add new post
                </Link>
            </div>

        </div>
    )
}

export default SubredditDetails;