import React, {useState} from 'react';
import { useForm } from "react-hook-form";
import Button from "../../components/button/Button";
import SignUpSuccessful from "../../components/signUpMessage/SignUpError";
import './SignUp.css'
import axios from "axios";


function SignUp(){
    const { handleSubmit, register, errors, watch }= useForm({mode:'onTouched'});
    const [ isRegistered, setIsRegistered ] = useState(false)
    const [ error, setError ] = useState(false)
    const [ errorMessage, setErrorMessage] = useState("");

    const passwordReferrer = watch('password')

    async function onFormSubmit(data, e){
        const registrationFormData = {...data, role:["user"]};
        setErrorMessage("");
        try{
            await axios.post('http://localhost:8080/api/auth/signup',registrationFormData);
            setIsRegistered(true)
            setTimeout(()=>{
                e.target.reset();
                setIsRegistered(false);
            }, 4000)
        }catch (e){
            console.log(e.response.data.message)
            console.log(e.response.data)
            setErrorMessage(e.response.data.message)
            setError(true)

        }
    }

    return(
        <div className="sign-up">
            <div className="form-container">
            <form className={`SignUp-${isRegistered ? "Error" : "form"}`} onSubmit={handleSubmit(onFormSubmit)}>
                <h1 className="sign-up-title">Sign Up</h1>
                    <label htmlFor="first-name">
                        <input
                            placeholder="First name"
                            name="firstName"
                            id="first-name"
                            ref={register({
                                required:{
                                    value: true,
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

                    <label htmlFor="last-name">
                        <input
                            placeholder="Last name"
                            name="lastName"
                            id="last-name"
                            ref={register({
                                required:{
                                    value: true,
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

                    <label htmlFor="country">
                        <input
                            placeholder="Country"
                            name="country"
                            id="country"
                            ref={register({
                                required:{
                                    value: true,
                                    message:"Dit regel mag niet leeg blijven"
                                }
                            })}
                        />
                        {errors.country && <span className="error">{errors.country.message}</span>}
                    </label>

                    <label htmlFor="facebook">
                        <input
                            placeholder="Facebook"
                            name="facebook"
                            id="facebook"
                            ref={register}
                        />
                    </label>
                    <label htmlFor="instagram">
                        <input
                            placeholder="Instagram"
                            name="instagram"
                            id="instagram"
                            ref={register}
                        />
                    </label>

                    <label htmlFor="email-address">
                        <input
                            placeholder="Email address"
                            name="email"
                            id="email-address"
                            ref={register({
                                required:{
                                    value:true,
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

                <label htmlFor="username">
                    <input
                        placeholder="Username"
                        name="username"
                        id="username"
                        ref={register({
                            required:{
                                value:true,
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


                <label htmlFor="password">
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            id="password"
                            ref={register({
                                required: {
                                    value: true,
                                    message: "Dit regel mag niet leeg blijven"
                                },
                                maxLength: {
                                    value: 15,
                                    message: "Wachtwoord mag niet meer dan 20 tekens bevatten"
                                },
                                minLength: {
                                    value: 8,
                                    message: "Wachtwoord moet minimaal 8 tekens lang zijn"
                                }
                            })}
                        />
                        {errors.password && <span className="error">{errors.password.message}</span>}
                    </label>

                    <label htmlFor="confirm-password">
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            name="confirmPassword"
                            id="confirmPassword"
                            ref={register({
                                required: {
                                    value: true,
                                    message: "Dit regel mag niet leeg blijven"
                                },
                                validate: (value)=> value === passwordReferrer || "Wachtwoord komt niet overeen"
                            })}
                        />
                        {errors.confirmPassword && <span className="error">{errors.confirmPassword.message}</span>}
                    </label>
                <div className='sign-up-fetch-error'>
                    {errorMessage && <p>{errorMessage}</p>}
                </div>
                <div className="sign-up-btn">
                    <Button buttonSize={1} onClick={()=>onFormSubmit}>
                        Sign Up
                    </Button>
                </div>
                </form>
                {isRegistered && <SignUpSuccessful />}
                <div className="form-image"></div>
            </div>
        </div>
    )
}

export default SignUp;
