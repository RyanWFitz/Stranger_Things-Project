import React, { useState } from "react";
import { loginUser, registerUser, getUserData, } from "./utilities/api";

const Account = ({user, setUser, token, setToken, UserData, setUserData}) => {
    const [username, setUsername] = useState ('');
    const [password, setPassword] = useState ('');
    const [isRegistering, setIsRegistering] = useState (false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (isRegistering) {
            const {user, token} = await registerUser(username, password);
            setUser(user);
            setToken(token);
        } else {
            const {user, token} = await loginUser(username, password);
            setUser(user);
            setToken(token);

            const response = await getUserData(token);
            setUserData(response.data)
            console.log('hereaskjdfhlaskdf', response)
        }
    }
    
    const handleLogout = () => {
        setUser(false);
        setToken('');
    }
    
    const toggleRegistration = () => {
        setIsRegistering(!isRegistering);
    }
    
    console.log('fetched user data', UserData)

    return <>
    {
        (user && token) ?
        <>
        <h1>User Profile</h1>
        <p className="user-profile-name">Username: {user.username}</p>
        <button className="button" onClick={handleLogout}>Logout</button> 

        </> :
        <>
        <h1>{isRegistering ? "Registration" : "Login"} </h1>
        <form onSubmit={handleSubmit}>
            <input
            className="input-text"
            onChange={(event) => setUsername(event.target.value) }
            required
            name="username"
            type="text"
            placeholder="Username"
            value={username}
            ></input>
            <input
            className="input-text"
            onChange={(event) => setPassword(event.target.value)}
            required
            name="password"
            type="text"
            placeholder="Password"
            value={password}
            ></input>
        <button className="button" type="submit">Submit</button>
        </form>
        <button className="button" onClick={toggleRegistration}>Register/Login</button>
        </>
    }
    </>
}

// add in a way to view just the users posts.
export default Account;