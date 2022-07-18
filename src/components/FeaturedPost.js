import React from "react";
import { useHistory, useParams, } from "react-router-dom";
import { submitMessage } from "./utilities/api";


const FeaturedPost = ({
    user,
    token,
    featuredPost,
    setFeaturedPost,
    message,
    setMessage,
}) => {

    const history = useHistory();
    

    const handleSubmitMessage = async (e) => {
        e.preventDefault();
        const newMessage = await submitMessage(token, featuredPost._id, message,);
        const newArr = ([newMessage, ...featuredPost.messages]);
        const newPost = Object.assign(featuredPost, {messages: newArr});
        setFeaturedPost(newPost);
        setMessage('')
    }

    const handleClose =(e) => {
        setFeaturedPost(false);
        history.push('/posts');

    }

    const { postId } = useParams();




    return featuredPost ? <div className="featured-post">
        <h1>{featuredPost.title}</h1>

        {featuredPost.location && <div>Location: {featuredPost.location} </div>}

        <div>Description: {featuredPost.description}</div>

        <div>Price: {featuredPost.price}</div>

        <ul>
            {user && featuredPost.isAuthor &&
                featuredPost.messages.map(message => {
                    return <li key={message._id}>{message.content}</li>
                })
            }
        </ul>


        <div>Will Deliver: {featuredPost.willDeliver ? 'Yes' : 'No'} </div>
        <div>Posted By: {featuredPost.author.username}</div>

        {user && token && !featuredPost.isAuthor && <form className="MessageSection" onSubmit={handleSubmitMessage}>
            <input
            className="input-text"
                onChange={(e) => setMessage(e.target.value)}
                type="text" name="Message"
                placeholder="Write a Message" value={message} />
            <button className="button" type="submit">Submit Message</button>
        </form>
        }
        <button onClick={handleClose}>Close</button>
    </div>
        : <div>Click a Post to View</div>
}

export default FeaturedPost;