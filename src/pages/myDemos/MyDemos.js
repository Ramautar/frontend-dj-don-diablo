import React, {useState, useEffect} from 'react';
import './MyDemos.css';
import axios from "axios";
import { useAuthState} from "../../context/AuthContext";
import SongList from "../../components/songList/SongList";

function MyDemos(){

    const { user } = useAuthState();

    const [demos, setDemos] = useState([]);
    const [currentDemo, setCurrentDemo] = useState(null);
    const [pageNumber, setPageNumber] = useState(0);
    const [loading, toggleLoading] = useState(false);

    useEffect(()=>{
        console.log("MyDemos component")
        async function getDemoList(){
            try{
                const response = await axios.get(`http://localhost:8080/api/demos/${user.username}`,{
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })
                setDemos(response.data.demo);
            }catch (e) {
                console.log("Er is iets misgegaan met communicatie backend")
            }
        }
        getDemoList();
    },[])


    return(
        <div className='my-demo-main-container'>
            <div className='my-demo-container'>
                <div className='my-demo-info'>
                    <h3 className="my-demo-title">My Demo Info</h3>
                    <div className='info'>
                        {(currentDemo || currentDemo === 0) &&
                        <div>
                            <p>File name: {demos[currentDemo].songTitle}</p>
                            <p>Song name: {demos[currentDemo].songName}</p>
                            <p>Upload date: {demos[currentDemo].uploadDate}</p>
                            <p className='my-demo-comment'>Comment : {demos[currentDemo].comment}</p>
                        </div>
                        }
                    </div>
                </div>
                <div className="my-list-container">
                    {demos &&
                        <SongList
                            demos={demos}
                            selectedDemo={setCurrentDemo}
                            pageNumber={pageNumber}
                            setPageNumber={setPageNumber}
                        />
                    }
                </div>
            </div>
        </div>
    )
}

export default MyDemos;
