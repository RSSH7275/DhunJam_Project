import React, { useEffect, useState } from "react";
import "./LoginPage.css";
import { useNavigate, Link } from "react-router-dom";

const LoginPage = () => {
  const [passwordType, setPasswordType] = useState("password");
  const [passText, setPasstext] = useState({
    username: "",
    password: "",
  });
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      localStorage.removeItem("userId");
    }
  }, []);

  function saveUserInfo(id) {
    localStorage.setItem("userId", id);
  }

  const handlePasswordChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setPasstext({ ...passText, [name]: value });
    // console.log("pass",passText)
  };
  const togglePswrd = () => {
    if (passwordType == "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };

  function isValidUser(username) {
    const usernameRegex = /^[a-zA-Z][a-zA-Z0-9_@#$]{2,}$/;
    const validate = usernameRegex.test(username);
    // console.log("validUse", usernameRegex.test(username));
    if (!validate) {
      alert("Username Should start with a letter");
      return validate;
    }
    return validate;
  }

  function isValidPassword(password) {
    const pswrdRegex =
      /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*\d)(?=.*?[@#$%^&*?])[A-Za-z\d@$#%^&*?!]{6,}$/;

    const validate = pswrdRegex.test(password);
    // console.log("validPswrd", pswrdRegex.test(password));
    if (!validate) {
      alert(
        " Password must contains at least one uppercase letter,one lowercase letter,one digit and one special character"
      );
      return validate;
    }
    return validate;
  }

  function validateInput(passText) {
    const { username, password } = passText;

    if (username === "") {
      alert("username is a required field");
      return false;
    }
    if (password === "") {
      alert("passport is a required field");
      return false;
    }

    if (!(isValidUser(username) && isValidPassword(password))) {
      return false;
    }

    return true;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validateInput(passText)) {
      return;
    } else {
      const result = await fetch("https://stg.dhunjam.in/account/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(passText),
      });
      const data = await result.json();
      if (data.status === 401) {
        alert("User is Unauthorised");
        return;
      } else if (data.status === 200) {
        saveUserInfo(data.data.id);
        navigate("/user");
        alert("Logged in Sucessfully!");
      } else {
        alert("Something wrong with backend server");
      }
    }
  }

  return (
    <div className="logBody">
      <div className="logElements">
        <p
          style={{
            fontSize: "2rem",
            width: "37.5rem",
            textAlign: "center",
          }}
        >
          Venue Admin Login
        </p>
        <input
          style={{
            backgroundColor: "transparent",
            color: "#FFFFFF",
            borderColor: "#FFFFFF",
            height: "2.5rem",
            borderRadius: "0.5rem",
          }}
          name="username"
          value={passText.username}
          onChange={handlePasswordChange}
          placeholder="Username"
        />

        <div className="passwordSet">
          <input
            type={passwordType}
            style={{
              backgroundColor: "transparent",
              color: "#FFFFFF",
              borderColor: "#FFFFFF",
              height: "2.5rem",
              width: "100%",
              borderRadius: "0.5rem",
            }}
            name="password"
            value={passText.password}
            onChange={handlePasswordChange}
            placeholder="Password"
          />
          <button className="passwordButton" onClick={togglePswrd}>
            {passwordType == "password" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-eye-slash-fill"
                viewBox="0 0 16 16"
              >
                <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z" />
                <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-eye-fill"
                viewBox="0 0 16 16"
              >
                <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
              </svg>
            )}
          </button>
        </div>

        <button
          style={{
            height: "2.5rem",
            borderRadius: "0.5rem",
            backgroundColor: "#6741D9",
            color: "#FFFFFF",
            cursor: "pointer",
          }}
          onClick={handleSubmit}
        >
          Sign in
        </button>
        <p style={{ opacity: "0.8", textAlign: "center" }}>New Registration?</p>
      </div>
    </div>
  );
};

export default LoginPage;
