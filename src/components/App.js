import React, { useState } from "react";
import { NavLink, Route, useHistory } from "react-router-dom";
import Account from "./Account";
import Posts from "./Posts";
import FeaturedPost from "./FeaturedPost";
import Home from "./Home";



const App = () => {

    const [posts, setPosts] = useState([]);
    const [token, setToken] = useState('');
    const [UserData, setUserData] = useState(false);
    const [user, setUser] = useState(false);
    const [featuredPost, setFeaturedPost] = useState('false');
    const [message, setMessage]= useState('');
    const [newMessage, setNewMessage] = useState('');



    return <main>
        <nav>
            <NavLink exact to="/" className="navLink" activeClassName="active">
                Home
            </NavLink>

            <NavLink exact to="/posts" className="navLink" activeClassName="active">
                Posts
            </NavLink>
       
            <NavLink exact to="/login" className="navLink" activeClassName="active">
                Account
            </NavLink>
        </nav>

        <Route exact path="/">
            <Home
            UserData= {UserData}
            user={user}
            token={token}
            />
        </Route>

        <Route path="/posts">
            <Route path="/posts/:postId">
                {token &&
                <FeaturedPost 
                user={user}
                token={token}
                featuredPost={featuredPost}
                setFeaturedPost={setFeaturedPost}
                message={message}
                setMessage={setMessage}
                newMessage={newMessage}
                setNewMessage={setNewMessage}
                />
                }
            </Route>
            <Posts
                user={user}
                token={token}
                posts={posts}
                setPosts={setPosts}
                featuredPost = {featuredPost}
                setFeaturedPost = {setFeaturedPost}
            />
        </Route>

        <Route path="/login">
            <Account
                user={user}
                setUser={setUser}
                token={token}
                setToken={setToken}
                UserData={UserData}
                setUserData={setUserData}
            />
        </Route>
    </main>
}

export default App;