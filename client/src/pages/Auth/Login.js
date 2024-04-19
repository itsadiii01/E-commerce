import React, { useState } from "react";
import Layout from "../../component/La/Layout";
import toast from "react-hot-toast";
import axios from 'axios';
import { useNavigate,useLocation } from "react-router-dom";
import "../../styles/AuthStyles.css";
import { useAuth } from "../../context/auth";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [auth, setAuth] = useAuth();
    const location = useLocation();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/login`, { email, password });

            if (res && res.data.success) {
                toast.success(res.data.message, { duration: 5000 });
                // toast.success("Password reset successful!", { duration: 5000 });
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token,
                });
                localStorage.setItem('auth', JSON.stringify(res.data));
                navigate(location.state||'/');
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };

    return (
        <Layout title={"Login Page"}>
            <div className="form-container"> 
                <h4 className="title">LOGIN FORM</h4>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-control"
                            id="exampleInputEmail1"
                            placeholder="Enter your Email"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-control"
                            id="exampleInputPassword"
                            placeholder="Enter your Password"
                            required
                        />
                    </div>

                    <div className="mb-3">
        <button type="button" className="btn btn-primary" onClick={()=>{navigate('/forgot-password')}}>
          Forgot Password
        </button>
          
        </div>
                    <button type="submit" className="btn btn-primary">LOGIN</button>
                </form>
            </div>
        </Layout>
    );
};

export default Login;
