import React, {useState, useEffect} from 'react';
import { auth, googleAuthProvider } from '../../firebase';
import { toast } from 'react-toastify';
import { Button } from 'antd';
import { 
    MailOutlined,
    GoogleOutlined
} from "@ant-design/icons";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from  'react-router-dom';

const Login = ({history}) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const { user } = useSelector((state) => ({...state}));

    useEffect(() => {
        if(user && user.token) history.push("/");
    }, [user])

    let dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const result = await auth.signInWithEmailAndPassword(email, password);
            // console.log(result);
            const {user} = result
            const idTokenResult = await user.getIdTokenResult()

            dispatch({
                type: "LOGGED_IN_USER",
                payload: {
                    email: user.email,
                    token: idTokenResult.token,
                },
            });
            history.push('/')
        } catch (error) {
            console.log(error);
            toast.error(error.message);
            setLoading(false);
        }
    };

    const googleLogin = async () => {
        auth.signInWithPopup(googleAuthProvider).then(async(result) => {
            const { user } = result
            const idTokenResult = await user.getIdTokenResult();
            dispatch({
                type: "LOGGED_IN_USER",
                payload: {
                    email: user.email,
                    token: idTokenResult.token,
                },
            });
            history.push("/");
        })
        .catch(err => {
            console.log(err);
            toast.error(err.message);
        });
    };

    const loginForm = () => (
    <form onSubmit={handleSubmit}>
        <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={email} onChange={(e) => setEmail(e.target.value) }/>
        </div>
        <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" value={password} onChange={(e) => setPassword(e.target.value)}/>
        </div>
        <div class="d-grid gap-2">
            <Button onClick={handleSubmit} type="submit" icon={<MailOutlined/>} className="btn btn-primary mt-3" block shape="round" size="large" disabled={!email || password.length < 6}>Login with Email/Password</Button>
        </div>
    </form>
    );

    return (
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3"></div>
                {loading ? (<h4 className="text-danger">Loading...</h4>) : (<h4>Login</h4>)}
                {loginForm()}
                <div class="d-grid gap-2">
                    <Button onClick={googleLogin} type="danger" icon={<GoogleOutlined/>} className="btn btn-primary mt-3" block shape="round" size="large" >Login with Google</Button>
                    <Link to="/forgot-password" className="float-end text-danger">Forgot Password</Link>
                </div>

            </div>
        </div>
    );
};

export default Login;