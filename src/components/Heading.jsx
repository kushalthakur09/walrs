import React, { useState } from "react";
import { Link ,useNavigate} from "react-router-dom";
import { Badge } from "react-bootstrap";
import Modal from "../Modal";
import Cart from "./Cart";
import{useCart} from '../components/ContextReducer';
import iconImg from "../assets/icon.png"
import burgerImg from '../assets/icons8-hamburger-60.png'
export default function Heading(props) {
  const navigate=useNavigate();
  const [cartView,setCartView]=useState(false);
  let data = useCart();
  const handleLogout=()=>{
       localStorage.removeItem("authToken");
       navigate("/login");
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark ps-2 border-bottom border-white">
        <div className="container-fluid ">
          <div className="icon-heading">
          <div className="container d-inline " style={{width:"70px",marginRight:"10px",}}>
            <img src={burgerImg} alt="" srcset="" style={{width:"60px",height:"auto",objectFit:"cover"}} />
            </div>
          <Link className="navbar-brand fs-3 fst-italic hover-underline-animation" to="/">
            {props.title}
          </Link>
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse  " id="navbarNav">
            <ul className="navbar-nav me-auto d-flex justify-content-around">
              <li className="nav-item pd-2" style={{marginLeft:"60px"}}>
                <Link className="nav-link fs-5 active text-center hover-underline-animation" to="/">
                  Home
                </Link>
              </li>
              
              {(localStorage.getItem("authToken"))?
              <li className="nav-item pd-2 text-white" style={{marginLeft:"60px"}}>
                <Link className="nav-link fs-5 active text-center hover-underline-animation text-white" to="/myOrder">
                  My Orders
                </Link>
              </li>
            
             :""}
             <li className="nav-item pd-2" style={{marginLeft:"60px"}}>
                <img src={iconImg} alt="cartIcon" style={{width:"30px",height:"auto",objectFit:"cover",marginTop:"10px"}}/>
                </li>
            </ul>
            {(! localStorage.getItem("authToken"))?
            <div className="d-flex">
              <Link
                className="nav-link btn bg-white text-success mx-1"
                to="/login"
              >
                Log-in
              </Link>

              <Link
                className="nav-link btn bg-white text-success mx-1"
                to="/createuser"
              >
                Sign-Up
              </Link>
            </div>:
            <div>
            <div className="btn bg-white text-success mx-2 " onClick={()=>{
              setCartView(true);
            }}>
                       My Cart {"       "}
              <Badge pill bg="danger">{data.length===0?null:data.length}</Badge>
            </div>
            {cartView ?<Modal onClose={()=>{
              setCartView(false);
            }}><Cart /></Modal>:null}
            <div className="btn bg-white text-danger mx-2 " onClick={handleLogout}>Log-Out</div>
            </div>
            }
          </div>
        </div>
      </nav>
    </div>
  );
}
