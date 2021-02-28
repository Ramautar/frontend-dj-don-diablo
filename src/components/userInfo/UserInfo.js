import React, { useEffect, useState } from 'react';
import './UserInfo.css';
import axios from "axios";

function UserInfo({username, currentDemo, setCurrentUserInfo}) {
    const [currentUser, setCurrentUser] = useState();

    useEffect(() => {
        async function fetchUserInfo() {
            try {
                const response = await axios.get(`http://localhost:8080/api/user/${username}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })
                setCurrentUser(response.data);
                setCurrentUserInfo(response.data)
            } catch (e) {
                console.log("Kan user gegevens niet ophalen")
            }
        }

        fetchUserInfo();
    }, [currentDemo])

    return (
        <div>
            {currentUser &&
            <div className='user-info-container'>
                <p className='user-info-username'>User name: {currentUser.username}</p>
                <p className='user-info-firstname'>First name: {currentUser.firstName}</p>
                <p className='user-info-lastname'>Last name: {currentUser.lastName}</p>
                <p className='user-info-username'>Country: {currentUser.country}</p>
                <p className='user-info-username'>Facebook: {currentUser.facebook ? currentUser.facebook : "-"}</p>
                <p className='user-info-username'>Instagram: {currentUser.instagram ? currentUser.instagram : "-"}</p>
                <p className='user-info-authorization'>Authorization : </p>
                <p className='user-authorization'>
                    {currentUser.roles.map((role,index)=> {return (<ul key={index}> <li>{role.name}</li> </ul>)})}
                </p>
                <p className='user-info-email'>Email: {currentUser.email}</p>
             </div>
            }
        </div>
    )
}

export default UserInfo;
