import React, {useState, useEffect} from 'react';
import './MyProfile.css';
import EditUserForm from "../../components/editUserForm/EditUserForm";
import { AuthContext, useAuthState } from '../../context/AuthContext';
import axios from "axios";
import UserInfo from "../../components/userInfo/UserInfo";



function MyProfile(){
    const [myInfo, setMyInfo] = useState();
    const [requestForInfo, setRequestForInfo] = useState(false)
    const [currentUserInfo, setCurrentUserInfo] = useState();

    const { isAuthenticated, user } = useAuthState();


    console.log(user.username);



    return(
        <div className='my-profile-page'>
            <div className='my-profile-info'>
                <div className='my-profile-logo'>

                </div>
                <div className='my-profile-blok'>
                    {user && <UserInfo username={user.username} setCurrentUserInfo={setCurrentUserInfo}/>}
                </div>
            </div>
            <div className='my-profile-separator'> </div>
            <div className='my-profile-container'>
                <h2 className='my-profile-title'>My Profile</h2>
                {currentUserInfo && <EditUserForm selected_user={currentUserInfo}/>}

            </div>
            {/*<div className='my-profile-separator'> </div>*/}
            <div className='my-profile-empty'>

            </div>
        </div>
    )
}

export default MyProfile;
