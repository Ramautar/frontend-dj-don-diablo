import React, {useState, useEffect} from 'react';
import './EditUserForm.css';
import { useForm } from "react-hook-form";
import axios from "axios";
import { useAuthState } from "../../context/AuthContext";


function EditUserForm({ selected_user }){
    const { user } = useAuthState();

    const {handleSubmit, register, errors}= useForm({mode:'onTouched'});
    const [role, setRole] = useState([]);
    const [checkedAuthority, setCheckedAuthority] = useState(false)
    const [isUploaded, setIsUploaded] = useState(false);

    useEffect(()=>{

        const authorityArray = selected_user.roles && selected_user.roles.map((auth)=>{
            switch (auth.name){
                case 'ROLE_ADMIN': return 'admin';
                case 'ROLE_MODERATOR': return 'mod';
                case 'ROLE_USER': return 'user';
                default: return '';
            }})

        authorityArray && setRole(authorityArray)

    },[selected_user])


    async function onFormSubmit(data, e){
        const modifyUserFormData = {...data, role};
        try{
            await axios.patch(`http://localhost:8080/api/user/${selected_user.id}`,modifyUserFormData, {
            headers: {
                'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        setIsUploaded(true)
        setTimeout(()=>{
            e.target.reset();
            setIsUploaded(false);
        }, 3000)

        }catch (event){
            console.log("Error during sending data")

        }
    }

    function handleAuthorityCheckBox(event){
        const value = event.target.value;
        const authorityArray = role;
        authorityArray.includes(value) ? authorityArray.pop(value) : authorityArray.push(value)
        setRole(authorityArray)
        setCheckedAuthority(!checkedAuthority)
    }

    return(
        <div>
            <form className='edit-user-form' onSubmit={handleSubmit(onFormSubmit)}>
                 <label htmlFor="edit-first-name">
                     <input
                         className='edit-form-input'
                         placeholder={`First name - ${selected_user ? selected_user.firstName : ""}`}
                         name="firstName"
                         id="edit-first-name"
                         ref={register({
                             required:{
                                 value: false,
                                 message:"Dit regel mag niet leeg blijven"
                             },
                             maxLength: {
                                 value: 20,
                                 message:"Voornaam mag niet meer dan 20 tekens bevatten"
                             }
                         })}
                     />
                     {errors.firstName && <span className="error">{errors.firstName.message}</span>}
                 </label>
                <label htmlFor="edit-last-name">
                    <input
                        className='edit-form-input'
                        placeholder={`Last name - ${selected_user ? selected_user.lastName : ""}`}
                        name="lastName"
                        id="edit-last-name"
                        ref={register({
                            required:{
                                value: false,
                                message:"Dit regel mag niet leeg blijven"
                            },
                            maxLength:{
                                value:20,
                                message:"Achternaam mag niet meer dan 20 tekens bevatten"
                            }
                        })}
                    />
                    {errors.lastName && <span className="error">{errors.lastName.message}</span>}
                </label>

                <label htmlFor="edit-country">
                    <input
                        className='edit-form-input'
                        placeholder={`Country - ${selected_user ? selected_user.country : ""}`}
                        name="country"
                        id="edit-country"
                        ref={register({
                            required:{
                                value: false,
                                message:"Dit regel mag niet leeg blijven"
                            }
                        })}
                    />
                    {errors.country && <span className="error">{errors.country.message}</span>}
                </label>

                <label htmlFor="edit-facebook">
                    <input
                        className='edit-form-input'
                        placeholder={`Facebook - ${selected_user.facebook ? selected_user.facebook : ""}`}
                        name="facebook"
                        id="edit-facebook"
                        ref={register}
                    />
                </label>
                <label htmlFor="edit-instagram">
                    <input
                        className='edit-form-input'
                        placeholder={`Instagram - ${selected_user.instagram ? selected_user.instagram : ""}`}
                        name="instagram"
                        id="edit-instagram"
                        ref={register}
                    />
                </label>

                <label htmlFor="edit-email-address">
                    <input
                        className='edit-form-input'
                        placeholder={`Email - ${selected_user ? selected_user.email : ""}`}
                        name="email"
                        id="edit-email-address"
                        ref={register({
                            required:{
                                value:false,
                                message: "Dit regel mag niet leeg blijven"
                            },
                            maxLength:{
                                value: 25,
                                message: "Voornaam mag niet meer dan 20 tekens bevatten"
                            }
                        })}
                    />
                    {errors.email && <span className="error">{errors.email.message}</span>}
                </label>

                <label htmlFor="edit-username">
                    <input
                        className='edit-form-input'
                        placeholder={`Username - ${selected_user ? selected_user.username : ""}`}
                        name="username"
                        id="edit-username"
                        ref={register({
                            required:{
                                value:false,
                                message: "Dit regel mag niet leeg blijven"
                            },
                            maxLength:{
                                value: 25,
                                message: "Username mag niet meer dan 20 tekens bevatten"
                            }
                        })}
                    />
                    {errors.username && <span className="error">{errors.username.message}</span>}
                </label>
                <div className='modify-button-container'>
                    <div className='user-authorities-checkbox'>
                        {role && user.roles.includes('ROLE_ADMIN') &&
                            <>
                                <label htmlFor='user' className='authority-label'>
                                    <input
                                        className='authority-checkbox'
                                        id='user'
                                        type='checkbox'
                                        name='user'
                                        value='user'
                                        onClick={handleAuthorityCheckBox}
                                        checked={role.includes('user')}
                                    />User
                                </label>
                                <label htmlFor='moderator' className='authority-label'>
                                    <input
                                    className='authority-checkbox'
                                    id='moderator'
                                    type='checkbox'
                                    name='mod'
                                    value='mod'
                                    onClick={handleAuthorityCheckBox}
                                    checked={role.includes('mod')}
                                    />Moderator
                                </label>
                                <label htmlFor='administrator' className='authority-label'>
                                    <input
                                    className='authority-checkbox'
                                    id='administrator'
                                    type='checkbox'
                                    name='admin'
                                    value='admin'
                                    onClick={handleAuthorityCheckBox}
                                    checked={role.includes('admin')}
                                    />Administrator
                                </label>
                            </>
                        }
                    </div>
                    <button  className='modify-profile-button' onClick={()=>onFormSubmit}>
                        Modify Profile
                    </button>

                </div>
                <div className='upload-msg'>
                    {isUploaded && <p className='edit-form-upload'>Profiel is succesvol aangepast </p>}
                </div>
            </form>
        </div>
    )
}


export default EditUserForm;
