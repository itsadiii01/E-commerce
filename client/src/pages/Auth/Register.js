import React from "react";
import Layout from "../../component/La/Layout";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import "../../styles/AuthStyles.css";
const Register = () => {
    const [name,setName] = useState("")
    const [email,setEmail]= useState("")
    const [phone,setPhone]= useState("")
    const [address,setAddress]= useState("")
    const [password,setPassword]= useState("");
    const [answer,setAnswer]= useState("");
   const navigate =useNavigate();


const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
  };
const handleSubmit = async (e) =>{
    e.preventDefault()
try {

   // Validation checks
   const hasUpperCase = /[A-Z]/.test(password);
   const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
   const hasRequiredLength = password.length >= 6;

   if (!hasUpperCase || !hasSpecialChar || !hasRequiredLength) {
     toast.error("Password must contain at least 6 characters, one special character, and one capital letter.");
     return;
   }
    const res = await axios.post(`https://aditya-ecom-backend.onrender.com/api/v1/auth/register`,
    {name,phone,email,password,address,answer});

    if(res && res.data.success){
        toast.success(res.data.message);
        navigate('/login')
        toast.success("Resgitered successfully!", { duration: 5000 });
    }
    else{
        toast.error(res.data.message);
    }

} catch (error) {
    console.log(error);
    toast.error("something went wrong");
    
}
    
};

  console.log(process.env.REACT_APP_API);
  return (
    <Layout title={"Register Page"}>
      <div className="form-container"> 
      <h4 className="title">REGISTER FORM</h4>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          
          <input
            type="text"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            className="form-control"
            id="exampleInputName"
            placeholder="Enter your Name"
            required
            
           
          />
         
        </div>

        <div className="mb-3">
          
          <input
            type="email"
            value = {email}
            onChange={(e)=>setEmail(e.target.value)}
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
            
            onChange={handlePasswordChange}
            className="form-control"
            id="exampleInputPassword"
            placeholder="Enter your Password"
            required
           
          />
         
        </div>


        <div className="mb-3">
         
          <input
            type="phone"
             value={phone}
             onChange={(e)=>setPhone(e.target.value)}
            className="form-control"
            id="exampleInputPhone"
            placeholder="Enter your Phone"
            required
          />
        </div>
        <div className="mb-3">
          
          <input
            type="text"
            value={address}
            onChange={(e)=>setAddress(e.target.value)}
            className="form-control"
            id="exampleInputAddress"
            placeholder="Enter your Address"
            required
           
          />
         
        </div>

        <div className="mb-3">
          
          <input
            type="text"
            value={answer}
            onChange={(e)=>setAnswer(e.target.value)}
            className="form-control"
            id="exampleInputAnswer"
            placeholder="what is your place of  brith ? "
            required
           
          />
         
        </div>

        
        
        <button type="submit" className="btn btn-primary">
          REGISTER
        </button>
      </form>
      </div>
    </Layout>
  );
};

export default Register;
