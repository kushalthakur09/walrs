import React,{useState} from 'react';
import { useNavigate} from 'react-router-dom';
import Navigation from '../components/navigation';
import Video from '../components/Video';

export default function Login() {
  let navigate=useNavigate();
   // initializing use state with empty object later updated as users details
  const [details, setDetails] = useState({
    email:"",
    password:"",
  });
  //handling submit event and passing information to backend ----->

  const handleSubmit = async(e)=>{
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/loginuser",{
      method:'POST',
      headers: {
        'Content-Type':'application/json',
      },

      //send entered details to the backend ===>

      body:JSON.stringify({
       
        email: details.email,
        password: details.password,
       
      }),
    });
    const json = await response.json();
    console.log(json);
    if (!json.success) {
      alert("Enter Valid Details");
    }
    if (json.success) {
      localStorage.setItem("userEmail",details.email);
      localStorage.setItem("authToken",json.authToken);
      console.log(localStorage.getItem("authToken"));
      //go to home page-->
      navigate('/');
    }
  };

  // when user type something it will automatically update the value of target ==

  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };
  
  return (
    <div>
      <><Navigation/></>
      <>
        <Video></Video>
      </>
      <div className="container m-3 text-white d-flex flex-column justify-content-center">
        <div className='container login-page'>
        <h2 className='text-center'>Log-In Here</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3 d-flex flex-column w-50 justify-content-center" style={{position:"relative",left:"20vw",minWidth:"400px"}}>
            <label htmlFor="exampleInputEmail1" className="form-label text-white">
              Email address
            </label>
            <input
              type="email"
              name="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              value={details.email}
              onChange={handleChange}
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3 d-flex flex-column justify-content-center w-50" style={{position:"relative",left:"20vw",minWidth:"400px"}}>
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="form-control"
              id="exampleInputPassword1"
              value={details.password}
              onChange={handleChange}
            />
          </div>
          

          <button type="submit" className="mr-3 btn text-white bg-success" style={{position:"relative",left:"20vw"}} >
            Submit
          </button>
          
        </form>
        </div>
      </div>
    </div>
    
  )
}
