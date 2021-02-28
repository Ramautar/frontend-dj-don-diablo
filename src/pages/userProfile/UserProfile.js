import React, {useState, useEffect} from 'react';
import EditUserForm from "../../components/editUserForm/EditUserForm";
import SearchBoxUser from "../../components/searchboxUser/SearchBoxUser";
import './UserProfile.css';
import axios from "axios";

function UserProfile(){

    const [allUsers, setAllUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState("");
    const [selectedUserObject, setSelectedUserObject] = useState({});

    useEffect(()=>{
        setSelectedUserObject({});
        const userObject = allUsers.find((user)=> user.username === selectedUser);
        userObject && setSelectedUserObject(userObject);
    },[selectedUser]);

    useEffect(()=>{
        async function getAllUsers(){
            try{
                const response = await axios.get(`http://localhost:8080/api/user/all-users`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })
                setAllUsers(response.data.users);

            }catch (e) {
                console.log("Cannot receive find users")
            }
        }

        getAllUsers();
    },[])


    return(
        <div className='user-profile-page'>
            <div className='user-profile-container'>
                <div className='user-search-container'>
                    {allUsers && <SearchBoxUser users={allUsers} setSelectedUser={setSelectedUser}/>}
                </div>
                <div className='user-divider'>

                </div>
                <div className='user-form-container'>
                    <h3 className='edit-user-title'>Edit User Profile</h3>
                    <div className='edit-user-form'>
                        {selectedUserObject && <EditUserForm selected_user={selectedUserObject}/>}
                    </div>

                </div>
        </div>
        </div>
    )
}

export default UserProfile;
