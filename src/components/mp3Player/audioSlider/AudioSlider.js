import React, {useState} from 'react';
import './AudioSlider.css'

function AudioSlider(){
    const [currentAudioTime, setCurrentAudioTime] = useState(0);
    const [durationAudio, setDurationAudio] = useState(0);
    const [progressTime, setProgressTime] = useState(0);


    return(
        <div>
            <div className="progressbar-container">
                <div className="progress-duration-meter">
                    <div className="current-time">{currentAudioTime}</div>
                    <div className="duration">{durationAudio}</div>
                </div>
                <div className="progress-div">
                    <div className="progress" style={{width:`${progressTime}%`}} />
                </div>
            </div>

        </div>
    )
}


export default AudioSlider
