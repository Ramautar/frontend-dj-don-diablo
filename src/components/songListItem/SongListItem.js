import React, {useState, useEffect} from 'react';
import './SongListItem.css';
import axios from "axios";


function SongListItem({item, setSelectSong, selectSong, demoURL, index}){

    const [playingSong, setPlayingSong] = useState(false);
    const [audioURL, setAudioURL] = useState("");
    const [loading, toggleLoading] = useState(false);

    const [audio] = useState(new Audio())

    function stopPlaying(){
        audio.pause();
        audio.currentTime = 0;
        setPlayingSong(false);
    }

    useEffect(()=>{
        if(playingSong){
            stopPlaying();
        }
    },[selectSong, index, demoURL])


    useEffect(()=>{
        audio.setAttribute('src',audioURL);
        if(!playingSong && audioURL !== ""){
            audio.play();
            setPlayingSong(true);
        }else {
            stopPlaying();
        }
        return (stopPlaying)
    },[audioURL])


    async function playSong(){
          try{
              if(!playingSong) {
                  toggleLoading(true);
                  const response = await axios.get(demoURL, {
                      headers: {
                          'Content-Type': 'audio/mpeg',
                          Authorization: `Bearer ${localStorage.getItem('token')}`
                      },
                      responseType: 'blob'
                  })
                  setAudioURL(window.URL.createObjectURL(new Blob([response.data])));

                  //*******        Voor downloaden van MP3 bestand       *******//
                  // const link = document.createElement('a');
                  // link.href = url;
                  // link.setAttribute('download', `${item.songTitle}`);
                  // document.body.appendChild(link);
                  // link.click();
                  //********************************************************//

              }else if(playingSong){
                  stopPlaying();
                }else {
                  audio.setAttribute('src',audioURL);
                  await audio.play();
                  setPlayingSong(true);
                }

          }catch (e){
              console.log("Problems with playing song")
          }
        toggleLoading(false);
    }

    return(
        <div className='song-list-item-container'>
            <button
                className='song-list-input'
                id={`radio${index}`}
                // name='song'
                value={index}
                type='checkbox'
                // onChange={(event)=>setSelectSong(event.target.value)}
                onClick={(event)=>setSelectSong(event.target.value)}
                // defaultChecked={false}
            />
            <label htmlFor={`radio${index}`} >
                <div className={`song-item ${selectSong === `${index}` ? "selected" : ""}`} >
                    <p className="song-position">{index}</p>
                    <div className='song-container'>
                        <p className="song-title">{item.songTitle}</p>
                        <p className='song-info'>
                            <span>{item.username}</span> |
                            <span>{item.artistName}</span> |
                            <span>{item.songName}</span> |
                            <span>{item.uploadDate}</span>
                        </p>
                    </div>
                    <div className={`my-demo-status ${item.status}`}>
                        <p>{item.status}</p>
                    </div>
                    <div className="my-demo-play-button" onClick={playSong}>
                        <span>play demo </span><i className={`fa ${playingSong ? 'fa-pause' :'fa-play'} my-demo-play`}/>
                    </div>
                </div>
            </label>
            {loading && <span className='loading'>Loading...</span>}
        </div>
    )
}

export default SongListItem;
