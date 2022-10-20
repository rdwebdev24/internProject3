import React, { useEffect } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
const Profile = ({userName}) => {
     const navigate = useNavigate()
     const logout = () =>{
          navigate('/login')
          localStorage.removeItem('userId')
     }
  return (
    <div>
      <section className="vh-100" style={{backgroundColor: "#eee"}}>
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-12 col-xl-4">
              <div className="card" style={{borderRadius: "15px",height:"100vh"}}>
                <div className="card-body text-center" style={{}}>
                  <div className="mt-3 mb-4">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                      className="rounded-circle img-fluid"
                      style={{width: "100px"}}
                    />
                  </div>
                  <h4 className="mb-2">{userName.first_name} {userName.last_name}</h4>
                  <p className="text-muted mb-4">
                    @Programmer <span className="mx-2">|</span>{" "}
                    <a href="#!">{userName.email}</a>
                  </p>
                  <Button onClick={logout} variant="contained">Log out</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Profile;
