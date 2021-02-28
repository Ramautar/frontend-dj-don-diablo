import React, {useState, useContext, useEffect} from 'react';
import { useForm } from 'react-hook-form';
import './SignIn.css';
import { useHistory } from 'react-router-dom';
import Button from '../../components/button/Button';
import axios from "axios";
import { AuthContext, useAuthState } from "../../context/AuthContext";

function SignIn({closeSigninForm}){

    const { login } = useContext(AuthContext);
    const { isAuthenticated } = useAuthState();

    const [showSignInForm, setShowSignInForm] = useState('show');
    const {handleSubmit, register } = useForm({mode:'unTouched'});

    const [loading, toggleLoading] = useState(false);
    const [error, setError] = useState('');

    // react-router dingen
    const history = useHistory();

    // Deze functie wordt elke keer afgevuurd als isAuthenticated (uit context) veranderd
    useEffect(() => {
        // als hij de waarde true heeft, DAN sturen we de gebruiker door!
        if (isAuthenticated === true) {
            setShowSignInForm('close');
            closeSigninForm(false);
            history.push('/demo-drop');
        }
    }, [isAuthenticated]);

    async function onFormSubmit(data){
        toggleLoading(true);
        setError('');
         try{
            const response= await axios.post('http://localhost:8080/api/auth/signin',data);
            console.log(response.data)
             login(response.data)
        }catch(e){
            console.error(e)
             setError('Inloggen is mislukt');
        }
        toggleLoading(false);
    }

    function handleCloseModel(){
        setShowSignInForm('close')
        closeSigninForm(false)
    }

    return(
        <div className={ `${showSignInForm}-form`}>
            <div className='modal-content'>
                <div className='close-modal' onClick={handleCloseModel}>+</div>
                <h2>Sign In</h2>
                <form onSubmit={handleSubmit(onFormSubmit)}>
                    <div className='form-sign-in-container'>
                        <label htmlFor='sign-in-user-name'>
                            <input
                                name='username'
                                type='text'
                                placeholder='User Name'
                                id='sign-in-user-name'
                                maxLength='20'
                                ref={register}
                            />
                        </label>
                        <label htmlFor='sign-in-password'>
                            <input
                                name='password'
                                type='password'
                                placeholder='Password'
                                id='sign-in-password'
                                ref={register}
                            />
                        </label>
                        <div className='sign-in-btn'>
                            <Button buttonSize={1} onClick={()=>onFormSubmit}>
                                Sign in
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignIn;