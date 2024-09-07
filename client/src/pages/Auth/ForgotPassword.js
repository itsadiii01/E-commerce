import React, { useState } from "react";
import Layout from "../../component/La/Layout";
import toast from "react-hot-toast";
import axios from 'axios';
import { useNavigate} from "react-router-dom";
import "../../styles/AuthStyles.css";
// import { useAuth } from "../../context/auth";

const ForgotPassword = () => {

  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();
  // const [auth, setAuth] = useAuth();
  // const location = useLocation();
//   const handlePasswordChange = (e) => {
//     const Password = e.target.value;
//     setNewPassword(Password);
//   };
  const handleSubmit = async (e) => {
      e.preventDefault();
    const Password = e.target.value;
    setNewPassword(Password);
      try {

        const hasUpperCase = /[A-Z]/.test(newPassword);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(newPassword);
        const hasRequiredLength = newPassword.length >= 6;
     
        if (!hasUpperCase || !hasSpecialChar || !hasRequiredLength) {
          toast.error("Password must contain at least 6 characters, one special character, and one capital letter.");
          return;
        }
          const res = await axios.post(`https://aditya-ecom-backend.onrender.com/api/v1/auth/forgot-password`, 
          { email, newPassword,answer });

          if (res && res.data.success) {
              toast.success(res.data.message);
             navigate('/login');
             toast.success("Password reset successfully!",{ duration: 5000 });
          } else {
              toast.error(res.data.message);
          }
      } catch (error) {
          console.log(error);
          toast.error("Something went wrong");
      }
  };


  return (
    <Layout title={'Forget Password-Ecommerce App'}>
     <div className="form-container"> 
                <h4 className="title">RESET PASSWORD</h4>
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
                            type="text"
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            className="form-control"
                            id="exampleInputEmail1"
                            placeholder="Enter Your Place Of Birth"
                            required
                        />
                    </div>


                    <div className="mb-3">
                        <input
                            type="password"
                            value={newPassword} 
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="form-control"
                            id="exampleInputPassword"
                            placeholder="Enter Your New Password"
                            required
                        />
                    </div>

                    
        
                    <button type="submit" className="btn btn-primary">RESET</button>
                </form>
            </div>
    </Layout>
  )
}

export default ForgotPassword
