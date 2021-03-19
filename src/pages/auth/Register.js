import React, {useState, useEffect} from 'react';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { Button } from 'antd';
import { 
    MailOutlined,
} from "@ant-design/icons";

const Register = ({history}) => {

    const [email, setEmail] = useState("");

    const { user } = useSelector((state) => ({...state}));

    useEffect(() => {
        if(user && user.token) history.push("/");
    }, [user])

    const handleSubmit = async (e) => {

        e.preventDefault();
        // console.log("ENV -->", process.env.REACT_APP_REGISTER_REDIRECT_URL);
        const config = {
            // url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
            url: "http://localhost:3000/register/complete",
            handleCodeInApp: true
        }

        await auth.sendSignInLinkToEmail(email, config)
        toast.success(
            `Email is sent to ${email}. Click the link to complete your registration.`
        );

        window.localStorage.setItem('emailForRegistration', email, config);

        setEmail("");
    };

    const registerForm = () => (
    <form onSubmit={handleSubmit}>
        <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={email} onChange={(e) => setEmail(e.target.value) } autoFocus/>
        </div>
        <div class="d-grid gap-2">
            <Button onClick={handleSubmit} type="primary" icon={<MailOutlined/>} className="btn btn-primary mt-3" shape="round" size="large">Register</Button>
        </div>
    </form>
    );

    return (
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3"></div>
                <h4>Register</h4>
                {registerForm()}
            </div>
        </div>
    );
};

export default Register;