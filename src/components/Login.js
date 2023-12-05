import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useNoteContext } from "../context/notes/NoteContext";
import Alert from "./Alert";

export default function Login() {
    // Note context
    const { alert, showAlert } = useNoteContext();

    const [credentials, setCredentials] = useState({ email: "", password: "" });

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const data = {
                email: credentials.email,
                password: credentials.password,
            };

            const response = await fetch(`${process.env.REACT_APP_BACKEND}/api/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            const responseJson = await response.json();
            console.log(responseJson);

            if (responseJson.status) {
                showAlert("Login successful!", "success");
                sessionStorage.setItem("idtkn", responseJson.authToken);
                setTimeout(() => {
                    navigate("/");
                }, 2000);
            } else {
                showAlert("Invalid Username or Password!", "danger");
            }
        } catch (error) {
            showAlert("Couldn't reach the server! Please try again", "warning");
        }
    };

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    return (
        <>
            <Alert alert={alert} />
            <div className="container position-absolute top-50 start-50 translate-middle border p-5 rounded-4 shadow" style={{ width: "30rem" }}>
                <form onSubmit={handleLogin} autoComplete="on">
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">
                            Email address
                        </label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" onChange={onChange} autoComplete="email" required />
                        <div id="emailHelp" className="form-text">
                            We'll never share your email with anyone else.
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">
                            Password
                        </label>
                        <input type="password" className="form-control" id="exampleInputPassword1" name="password" onChange={onChange} autoComplete="password" required />
                    </div>
                    <button type="submit" className="btn btn-success w-100 mt-3">
                        Login
                    </button>
                </form>
            </div>
        </>
    );
}
