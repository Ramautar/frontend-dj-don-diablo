import React from 'react';
import './MP3Info.css';

function MP3Info(){
    return(
        <div className='mp3-info-container'>
            <h3 className='mp3-info-title'>MP3 File info</h3>
            <p>File name:<span></span></p>
            <p>File size:<span></span></p>
            <p>Duration:<span></span></p>
            <p className='comment'>Comment:</p>
        </div>
    )
}

export default MP3Info;
