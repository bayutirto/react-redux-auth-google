import React, {useState, useEffect} from 'react';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { Button } from 'antd';
import { 
    MailOutlined,
} from "@ant-design/icons";

const ForgotPassword = ({ history }) => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const { user } = useSelector((state) => ({...state}));

    useEffect(() => {
        if(user && user.token) history.push("/");
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const config = {
            url: "http://localhost:3000/login",
            handleCodeInApp: true,
        }

        await auth.sendPasswordResetEmail(email, config)
        .then(() => {
            setEmail('')
            setLoading(false)
            toast.success('Check your email for password reset link');
        })
        .catch((error) => {
            setLoading(false)
            toast.error(error.message);
        });
    };

    return(
        <div className="container col-md-6 offset-md-3 p-5">
            {loading ? (<h4 className="text-danger">Loading</h4>) : (<h4>Forgot Password</h4>)}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={email} onChange={(e) => setEmail(e.target.value) } autoFocus/>
                </div>
                <div class="d-grid gap-2">
                    <Button onClick={handleSubmit} icon={<MailOutlined/>} className="btn btn-primary mt-3" block shape="round" size="large" disable={!email}>Reset Password</Button>
                </div>
            </form>
        </div>
    );


};

export default ForgotPassword;
