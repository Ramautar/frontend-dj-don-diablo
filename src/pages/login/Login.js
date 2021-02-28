import React, {useState, useContext, useEffect} from 'react';
import './Login.css';
import {Link} from "react-router-dom";
import {useForm} from "react-hook-form";
import axios from "axios";
import { AuthContext, useAuthState } from "../../context/AuthContext";
import { useHistory } from 'react-router-dom';


function Login() {
    const {handleSubmit, register, errors} = useForm()
    const [loginSuccesMessage, setLoginSuccesMessage] = useState(null);
    const [loginFailMessage, setLoginFailMessage] = useState("");

    const { login } = useContext(AuthContext);
    const { isAuthenticated } = useAuthState();

    // react-router dingen
    const history = useHistory();

    useEffect(() => {
        // als hij de waarde true heeft, DAN sturen we de gebruiker door!
        if (isAuthenticated === true) {
            history.push('/my-demos');
        }
    }, [isAuthenticated]);

    async function onFormSubmit(data, e) {
        setLoginFailMessage("");
        try {
            const response= await axios.post('http://localhost:8080/api/auth/signin',data,{
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setLoginSuccesMessage("Succesvol ingelogd!!!!")
            setTimeout(()=>{
                e.target.reset();
                // We roepen hier de context-functie "login" aan. De context gaat dan met de data die we hebben
                // teruggekregen alles op de juiste manier in localstorage en state zetten!
                login(response.data);
            }, 2000)

        }catch (e) {
            console.log(e.response.data.message);
            setLoginFailMessage("Login onsuccesvol controleer Username en Password")
        }
    }

    return (
        <div className='login-page'>
            <div className='login-container'>
                <div className='login-title'>
                    <h1>Sign in</h1>
                </div>
                <form onSubmit={handleSubmit(onFormSubmit)}>
                    <label htmlFor='login-username' className='login-input'>
                        <input
                            placeholder='Username'
                            type='text'
                            id='login-username'
                            className='login-input-field'
                            name='username'
                            ref={register({
                                required: {
                                    value: true,
                                    message: 'Veld Username mag niet leeg zijn'
                                }
                            })}
                        >
                        </input>
                    </label>
                    <label htmlFor='login-password' className='login-input'>
                        <input
                            placeholder='Password'
                            id='login-password'
                            type='password'
                            className='login-input-field'
                            name='password'
                            ref={register({
                                required: {
                                    value: true,
                                    message: 'Veld Password mag niet leeg zijn'
                                }
                            })}
                        >
                        </input>
                    </label>
                    <button className='login-button' onClick={()=>onFormSubmit}>SIGN IN</button>
                </form>
                <div className='login-error-message'>
                    {(errors.username || errors.password) && <span>Veld Username mag niet leeg zijn</span>}
                    {loginSuccesMessage && <span className='login-succes'>{loginSuccesMessage}</span>}
                    {loginFailMessage && <span className='login-fail'>{loginFailMessage}</span>}
                </div>
                <div className='login-message-container'>
                    <p>Heb je nog geen account? <Link to='/sign-up'>Registreer</Link> je dan eerst.</p>
                </div>
            </div>
        </div>
    )
}

export default Login;
