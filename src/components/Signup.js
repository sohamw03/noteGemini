import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useNoteContext } from "../context/notes/NoteContext";
import Alert from "./Alert";

export default function Signup() {
    // Note context
    const { showAlert, alert } = useNoteContext();

    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" });

    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();

        if (credentials.password !== credentials.cpassword) {
            showAlert("Passwords don't match!", "warning");
            return;
        }

        const data = {
            name: credentials.name,
            email: credentials.email,
            password: credentials.password,
        };

        const response = await fetch(`${process.env.REACT_APP_BACKEND}/api/auth/createuser`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        const responseJson = await response.json();
        console.log(responseJson);

        if (responseJson.status) {
            showAlert("Signup successful!", "success");
            sessionStorage.setItem("idtkn", responseJson.authToken);
            setTimeout(() => {
                navigate("/");
            }, 2000);
        } else {
            showAlert(responseJson.error, "danger");
        }
    };

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    return (
        <>
            <Alert alert={alert} />
            <div className="container position-absolute top-50 start-50 translate-middle border p-5 rounded-4 shadow" style={{ width: "30rem" }}>
                <form onSubmit={handleSignup} autoComplete="on">
                    <div className="mb-3">
                        <label htmlFor="InputName" className="form-label">
                            Name
                        </label>
                        <input type="text" className="form-control" id="InputName" name="name" onChange={onChange} autoComplete="name" minLength={3} required />
                    </div>
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
                        <input type="password" className="form-control" id="exampleInputPassword1" name="password" onChange={onChange} autoComplete="password" minLength={5} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword2" className="form-label">
                            Confirm Password
                        </label>
                        <input type="password" className="form-control" id="exampleInputPassword2" name="cpassword" onChange={onChange} autoComplete="password" minLength={5} required />
                    </div>
                    <button type="submit" className="btn btn-success w-100 mt-3">
                        Login
                    </button>
                </form>
            </div>
        </>
    );
}
