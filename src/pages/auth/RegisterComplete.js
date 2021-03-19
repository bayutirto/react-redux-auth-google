import React, {useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { auth } from '../../firebase';

const RegisterComplete = ({history}) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        setEmail(window.localStorage.getItem('emailForRegistration'));
        console.log(window.location.href);
        console.log(window.localStorage.getItem('emailForRegistration')); 
    }, []);

    const handleSubmit = async (e) => { 
        e.preventDefault();
        // validation

        if(!email || !password) {
            toast.error("Email and Password is required");
            return;
        }
        if(password.length < 6) {
            toast.error("Password must be at least 6 characters long");
            return;
        }

        try {
            const result = await auth.signInWithEmailLink(email, window.location.href);
            // console.log("Result ", result);
            if(result.user.emailVerified) {
                //remove user email from local storage
                window.localStorage.removeItem('emailForRegistration');
                //get user token
                let user = auth.currentUser
                await user.updatePassword(password);
                const idTokenResult = await user.getIdToken();
                //redux store
                console.log("user", user, "idTokenResult", idTokenResult);
                //redirect
                history.push("/");
            }
        } catch (error){
            console.log(error);
            toast.error(error.message);
        }
    };

    const completeRegisterForm = () => (
    <form onSubmit={handleSubmit}>
        <input 
            type="email" 
            className="form-control" 
            value={email} 
            disabled
        />
        <br />
        <input 
            type="password" 
            className="form-control" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            autoFocus
        />

        <button type="submit" className="btn btn-primary mt-3">Complete Registration</button>
    </form>
    );

    return (
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3"></div>
                <h4>Register Complete</h4>
                {completeRegisterForm()}
            </div>
        </div>
    );
};

export default RegisterComplete;