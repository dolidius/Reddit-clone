import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Pages extends Component {

    createPages = amount => {

        let pages = [];

        for(let i = 1; i <= amount; i++){
            pages.push(<Link key={i} className="page" to={`${this.props.link}/page/${i}`}>{i}</Link>);
        }

        return pages;
    }

    render() {
        if(this.props.amount <= 1){
            return null;
        }
        return (
            <div className="pages">
                {this.createPages(this.props.amount)}
            </div>
        )
    }
}

export default Pages;