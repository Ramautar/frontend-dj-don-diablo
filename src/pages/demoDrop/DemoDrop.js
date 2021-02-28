import React, {useState} from "react";
import "./DemoDrop.css";
import {useForm} from "react-hook-form";
import MP3Player from "../../components/mp3Player/MP3Player";
import uploadMP3Logo from '../../assets/upload_mp3_icon.svg';
import Button from "../../components/button/Button";
import { useAuthState } from "../../context/AuthContext";
import axios from "axios";

function DropDemo(){
    const { handleSubmit, register, errors} = useForm({mode:'onTouched'})

    const [isUploadSucces, setIsUploadSucces] = useState(false);
    const [loading, toggleLoading ] = useState(false);
    const [filePath, setFilePath] = useState("");
    const [fileName, setFileName] = useState("No MP3 file selected");
    const [file, setFile] = useState(null);
    const [fileSize, setFileSize] = useState(0)

    const { user } = useAuthState();

    let fileReader = new FileReader();


    async function onFormSubmit(data, e){

        const uploadDate = new Date().toLocaleDateString();
        const demoUpload = {
            username: user.username,
            artistName: data.artistName,
            songName: data.songName,
            personalMessage: data.personalMessage,
            songTitle: fileName,
            uploadDate: uploadDate
        }

        const myDemo = JSON.stringify(demoUpload);
        console.log(myDemo);

        const formData = new FormData();
        formData.append("file", file);
        formData.append("model", myDemo);

        try{
            toggleLoading(true);
            const response = await axios.post("http://localhost:8080/upload",formData,{
                headers: {
                      'Content-Type': 'multipart/form-data',
                       Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            toggleLoading(false)
            e.target.reset();
            setIsUploadSucces(true)
            setTimeout(()=>{
                setIsUploadSucces(false);
            },3000)
            console.log(file)
        }catch (e) {
            toggleLoading(false)
            console.log(e)
        }
    }

    return(
        <div className="drop-demo-container">
            <div className="drop-demo">
                <div className="drop-demo-form">
                    <h2>Drop Demo</h2>
                    <form className="drop" onSubmit={handleSubmit(onFormSubmit)}>
                        <label htmlFor='artist-name' className="text-input">
                            <input
                                className='drop-demo-input'
                                id='artist-name'
                                name='artistName'
                                type="text"
                                placeholder="Artist Name"
                                ref={register({
                                    required:{
                                        value: true,
                                        message:'"Artist name" mag niet leeg zijn'
                                    },
                                    maxLength: {
                                        value: 20,
                                        message:'"Artist name" mag niet meer dan 20 tekens bevatten'
                                    }
                                })}
                            />
                        </label>
                        <label htmlFor='song-name' className="text-input">
                            <input
                                className='drop-demo-input'
                                id='song-name'
                                name='songName'
                                type="text"
                                placeholder="Song Name"
                                ref={register({
                                    required:{
                                        value: true,
                                        message:'"Song name" mag niet leeg zijn'
                                    },
                                    maxLength: {
                                        value: 20,
                                        message:'"Song name" mag niet meer dan 20 tekens bevatten'
                                    }
                                })}
                            />
                        </label>
                        <div className="upload-mp3">
                            <label htmlFor='real-file'>
                                <input
                                    type="file"
                                    name="MP3File"
                                    id="real-file"
                                    className="file-upload"
                                    accept="audio/mp3"
                                    onChange={(event)=>{
                                        setFile(event.target.files[0])
                                        let fileSizeMB = ((event.target.files[0]).size/1048576).toFixed(2)
                                        setFileSize(fileSizeMB)
                                        setFileName(event.target.files[0].name)
                                        fileReader.onload = function(event){
                                            setFilePath(`${event.target.result}`)
                                        }
                                        fileReader.readAsDataURL(event.target.files[0]);
                                    }}
                                    ref={register({
                                        required:{
                                            value: true,
                                            message:"Kies een muziek bestand voor upload"
                                        }
                                    })}
                                />
                            </label>
                            <img
                                className="logo-image"
                                src={uploadMP3Logo}
                                onClick={()=>document.getElementById("real-file").click()}
                                alt= "mp3 upload icon"
                            />
                            <span className="file-upload-txt">{fileName}</span>
                        </div>
                        <label htmlFor='personal-message'>
                            <textarea
                                name="personalMessage"
                                id="personal-message"
                                rows="4"
                                cols="40"
                                placeholder="Personal message"
                                ref={register}
                            >
                            </textarea>
                        </label>
                        <div className="demo-drop-error">
                            {/*Filter door alle foutmeldingen van form en laat opvolgorde zien (1 voor 1)*/}
                            {
                                (errors.artistName && <span>{errors.artistName.message}</span>)||
                                (errors.songName && <span>{errors.songName.message}</span>)||
                                (errors.MP3File && <span>{errors.MP3File.message}</span>)
                            }
                            {isUploadSucces &&<span className='successful-upload'>Demo upload was succesvol!</span>}
                        </div>
                        <div className='drop-demo-btn'>
                            <Button buttonSize={2} onClick={()=>onFormSubmit}>
                                Upload Demo
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="music-player">
                <MP3Player uploadFile={filePath} uploadFileName={fileName} fileSize={fileSize}/>
            </div>
        </div>
    )
}


export default DropDemo;
