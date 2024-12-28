import React, { useEffect } from "react";
import "../../styles/styles.css";
import { useState } from "react";
import axios from "axios";
import serverUrl from "../../config/config";
import { useNavigate } from "react-router-dom";
import { User } from "../../types/types";

interface Props {
  updateUser: React.Dispatch<React.SetStateAction<User | undefined>>;
}

const ProfileLogInComp = ({ updateUser }: Props) => {
  const navigate = useNavigate();

  const [logInObj, setlogInObj] = useState<{}>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const type = e.target.name;
    setlogInObj({ ...logInObj, [type]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${serverUrl}/users/login`, logInObj);
      let data = response.data;
      alert(data ? data : "incorrect details");
      if (data) {
        sessionStorage.userData = JSON.stringify(data);
        updateUser(data);
        navigate("/");
      }
    } catch {
      alert("error");
    }
  };

  return (
    <div
      className="display-component"
      style={{
        width: "100%",
        height: "100%",
        marginTop: "-1.25%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <div
        className="profile-login"
        style={{ borderBottom: "1px solid black", padding: "20px" }}
      >
        <h1> Log in</h1> <br />
        Username{" "}
        <input
          style={{ width: "60%" }}
          name="username"
          onChange={handleChange}
          type="text"
        />{" "}
        <br />
        Password{" "}
        <input
          style={{ width: "60%" }}
          name="password"
          onChange={handleChange}
          type="password"
        />{" "}
        <br /> <br />
        <button onClick={handleLogin} style={{ width: "100%" }}>
          {" "}
          Log in
        </button>{" "}
        <br /> <br />
      </div>

      <div style={{ marginTop: "1%" }}>
        <h2> Don't have an account? </h2> <br />
        <a href="">
          {" "}
          <h3 style={{backgroundColor : 'white' , width :'25%'}} onClick={() => navigate('/signup')} >Sign up</h3>
        </a>
      </div>
    </div>
  );
};

export default ProfileLogInComp;
