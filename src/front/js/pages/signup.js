import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";


export const Signup = () => {

    const { store, actions } = useContext(Context);

    const [form, setForm] = useState(
        {
            email: "",
            password: ""
        }
    );

    const navigate = useNavigate();


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        const { email, password } = form;

        actions.signupFunction(form);

    };


    return <>
        <div className="text-center mt-5">
            <h1>Sign up</h1>
            <div className="sign-up-form container">
                <form className="d-flex flex-column" onSubmit={handleSubmit}>
                    <input className="form-input" type="email" name="email" value={form.email} onChange={handleInputChange} placeholder="Email" required />
                    <input className="form-input" type="password" name="password" data-value={form.password} onChange={handleInputChange} placeholder="Password" required />
                    <button className="form-button" type="submit">Sign Up</button>
                </form>
                <div className="d-flex text-center justify-content-around mt-5">
                    <p>Already have an account?</p> <Link className="text-emphasis" to="/login"><p className="text-emphasis">Login here!</p></Link>
                </div>
            </div>

        </div>
    </>

}

