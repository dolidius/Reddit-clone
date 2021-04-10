import React from 'react'

const Spinner = ({centered}) => {
    if(centered){
        return(
            <div className="spinner__container">
                <div className="spinner" />
            </div>
        )
    }else{
        return <div className="spinner" />
    }
}

export default Spinner;