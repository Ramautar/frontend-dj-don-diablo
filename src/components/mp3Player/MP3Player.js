import React, { useState, useRef, useEffect } from 'react';
import './MP3Player.css';
import discImage from "../../assets/disc.png"

function MP3Player({uploadFile, uploadFileName, fileSize}){

    const audioRef = useRef(0)

    const [isPlaying, setIsPlaying] = useState(false);
    const [durationAudio, setDurationAudio] = useState("00:00");
    const [progressTime, setProgressTime] = useState(0)
    const [currentAudioTime, setCurrentAudioTime] = useState("00:00");

    useEffect(()=>{
        setIsPlaying(false);
    },[uploadFileName])


    function timeCalculation(time){
        const minutes = Math.floor(time/60);
        const seconds = Math.floor(time%60);

        return(`${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0": ""}${seconds}`)
    }

    const songTimer =(event)=>{
        setProgressTime((audioRef.current.currentTime/audioRef.current.duration)*100)
        setCurrentAudioTime(timeCalculation(audioRef.current.currentTime))
        if(audioRef.current.ended){
            audioRef.current.currentTime = 0;
            setIsPlaying(false);
        }
    }

    const playSound = ()=> {
        audioRef.current.volume = 0.1;
        if(!isPlaying){
            audioRef.current.play();
            setIsPlaying(true);
            setDurationAudio(timeCalculation(audioRef.current.duration))
        }else {
            audioRef.current.pause();
            setIsPlaying(false);
        }
    }

    const fastBackward = ()=>{
        audioRef.current.currentTime -= 5;
    }
    const fastForward = ()=> {
        audioRef.current.currentTime += 5;
    }

    return(
        <div className="mp3-player-container">
            <div className="file-name">
                <h4>{uploadFileName}</h4>
                <p className='file-size'>{`( ${fileSize} MB)`} </p>
            </div>
            <div className="image-container">
                <img src={discImage} alt="cd image" className={`cd-image ${isPlaying && "anime"}`}/>
            </div>
            <audio  ref={audioRef} src={uploadFile} onTimeUpdate={songTimer} />
            <div className="progressbar-container">
                <div className="progress-duration-meter">
                    <div className="current-time">{currentAudioTime}</div>
                    <div className="duration">{durationAudio}</div>
                </div>
                <div className="progress-div">
                    <div className="progress" style={{width:`${progressTime}%`}} />
                </div>
            </div>
            <div className="audio-control">
                <i className="fa fa-backward" onClick={fastBackward} />
                <i className={`main-button fa ${isPlaying ? "fa-pause" : "fa-play"}`} onClick={playSound} />
                <i className="fa fa-forward" onClick={fastForward} />
            </div>
        </div>
    )
}

export default MP3Player;
