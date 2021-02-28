import React, {useEffect, useState} from 'react'
import './AdminController.css'
import SongList from "../../components/songList/SongList";
import MP3Player from "../../components/mp3Player/MP3Player";
import AddCommentSelector from "../../components/addCommentSelector/AddCommentSelector";
import UserInfo from "../../components/userInfo/UserInfo";
import SearchBox from "../../components/searchbox/SearchBox";
import axios from "axios";

function AdminController() {
    const [demos, setDemos] = useState([]);
    const [currentDemo, setCurrentDemo] = useState(null);
    const [searchDemos, setSearchDemos] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);

    useEffect(() => {
        async function getDemoList() {
            try {
                const response = await axios.get(`http://localhost:8080/api/demos/all-demos`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })
                setDemos(response.data.demo);
            } catch (e) {
                console.log("Er is iets misgegaan met communicatie backend")
            }
        }

        getDemoList();
    }, [])


    return (
        <div className="admin-container">
            <div className='admin-profile'>
                <div className='admin-user-infobox'>
                    <h3 className='admin-user-info-title'> Producer info</h3>
                    {(currentDemo || currentDemo === 0) &&
                    <UserInfo username={searchDemos[currentDemo].username} currentDemo={currentDemo}/>}
                </div>
            </div>

            <div className='admin-demo-list'>
                {(demos.length !== 0) &&
                    <SearchBox
                        allDemos={demos}
                        searchDemo={setSearchDemos}
                        currentDemo={setCurrentDemo}
                        setPageNumber={setPageNumber}
                    />}
                {(searchDemos.length !==0) &&
                    <SongList
                        demos={searchDemos}
                        selectedDemo={setCurrentDemo}
                        pageNumber={pageNumber}
                        setPageNumber={setPageNumber}
                    />
                }
            </div>

            <div className='admin-demo-info'>
                <div className='admin-demo-infobox'>
                    <h3 className='admin-demo-info-title'>Demo Info</h3>
                    {(currentDemo || currentDemo === 0) &&
                        <div>
                            <p>File name: {searchDemos[currentDemo].songTitle}</p>
                            <p>Song name: {searchDemos[currentDemo].songName}</p>
                            <p>Artist name: {searchDemos[currentDemo].artistName}</p>
                            <p>Upload date: {searchDemos[currentDemo].uploadDate}</p>
                            <p>Status: {searchDemos[currentDemo].status}</p>
                            <p className='admin-comment'>Comment: {searchDemos[currentDemo].comment}</p>
                            <div className='admin-add-comment'>
                                <AddCommentSelector demoId={searchDemos[currentDemo].id}/>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}


export default AdminController;
