import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";


export const Login = () => {
    const { store, actions } = useContext(Context);
    const validated_token = actions.is_token_valid();
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
        e.preventDefault();

        actions.loginFunction(form)
            .then((data) => {
                if (data) { navigate("/dashboard"); }
            });
    };


    useEffect(() => {

        if (validated_token) {
            navigate("/dashboard")
        } else {
            return;
        }
    }, [validated_token]);

    if (!validated_token) {
        return <>
            <div className="text-center mt-5">
                <h1>Login</h1>
                <div className="sign-up-form container">
                    <form className="d-flex flex-column" onSubmit={handleSubmit}>
                        <input className="form-input" type="email" name="email" value={form.email} onChange={handleInputChange} placeholder="Email" required />
                        <input className="form-input" type="password" name="password" value={form.password} onChange={handleInputChange} placeholder="Password" required />
                        <button className="form-button" type="submit">Login</button>
                    </form>
                    <div className="d-flex text-center justify-content-around mt-5">
                        <p>Are you not registered?</p> <Link className="text-emphasis" to="/signup"><p className="text-emphasis">Sign up here!</p></Link>
                    </div>
                </div>

            </div>
        </>
    }
};
