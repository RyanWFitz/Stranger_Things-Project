import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { apiCall } from "./utilities/api";

//this page should only be available to people who have logged in, first check to see if someone has the correct login token

const Posts = ({ posts, setPosts, user, token, featuredPost, setFeaturedPost }) => {
    const [search, setSearch] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [location, setLocation] = useState('');
    const [willDeliver, setWillDeliver] = useState('false');


    // did not condense the use effect function since this was easier for me to understand
    const getPosts = async () => {
        const fetched = await apiCall('/posts', 'GET', token)
        setPosts(fetched.data.posts)
        console.log(fetched.data.posts)
    }

    const submitPost = async (token, title, description, price, location, willDeliver) => {
        const fetched = await apiCall(
            '/posts',
            'POST',
            token,
            { post: { title, description, price, location, willDeliver } }
        )
        const newPost = await getPosts(token)
        return newPost
    }

    const deletePost = async (postID) => {
        const fetched = await apiCall(`/posts/${postID}`, 'DELETE', token)
        const deletedPost = await getPosts
        return deletedPost
    }

    const history = useHistory();

    useEffect(() => {
        getPosts();
    }, [])


    const searchMatches = (search, post) => {
        return `${post.title} ${post.author.username} ${post.description}`
            .toLowerCase()
            .includes(search.toLowerCase())
    }

    const handleDelete = async (e, postID) => {
        e.stopPropagation();
        if (window.confirm('Delete Post?'))
            deletePost(postID)
    }

    const handleFeaturedClick = (e, post) => {
        if (user && token) {
            setFeaturedPost(post);
            history.push(`/posts/${post._id}`)
        } else {
            alert('Please Log In to View this Post')
        }
    }

    const handleNewPost = async (e) => {
        e.preventDefault();
        const newPost = await submitPost(token, title, description, price, location, willDeliver);
        getPosts();
    }


    return <>
        <h1 className="posts-title">Items for Sale</h1>

        <input className="input-text" onChange={(e) => {
            setSearch(e.target.value)
        }}
            type="text" name="search" placeholder="Search Listings"
        />

        <ul className="post-body">
            {
                posts.filter(post => {
                    return searchMatches(search, post)
                }).map(post => {
                    return <li className="item-body" key={post._id} onClick={(e) => { handleFeaturedClick(e, post) }}>
                        <div>Item for Sale: {post.title}</div>

                        {post.location && <div>Location: {post.location} </div>}

                        <div>Description: {post.description}</div>

                        <div>Price: {post.price}</div>
                        <ul>

                            {user && post.isAuthor &&
                                post.messages.map(message => {
                                    return <li key={message._id}>{message.content}</li>
                                })
                            } 
                        </ul>

                        <div>Will Deliver: {post.willDeliver ? 'Yes' : 'No'} </div>
                        <div>Posted By: {post.author.username}</div>
                        {user && post.isAuthor && <button
                            className="button"  
                            onClick={(e) => handleDelete(e, post._id)}
                        >Delete</button>
                        }
                    </li>
                })
            }
        </ul>

        {user && token && (
            <form className="item-submit" onSubmit={handleNewPost}>
                <div>Item Name</div>
                <input
                    className="input-text"
                    onChange={(e) => setTitle(e.target.value)}
                    type='text' name='itemName'
                    placeholder="Required"
                    value={title}
                />

                <div>Description</div>
                <input 
                className="input-text"
                    onChange={(e) => setDescription(e.target.value)}
                    type='text' name='itemDescription'
                    placeholder="Required"
                    value={description}
                />

                <div>Price</div>
                <input
                className="input-text"
                    onChange={(e) => setPrice(e.target.value)}
                    type='text' name='itemPrice'
                    placeholder="Item Required"
                    value={price}
                />

                <div>Location</div>
                <input
                className="input-text"
                    onChange={(e) => setLocation(e.target.value)}
                    type='text' name='itemLocation'
                    placeholder="Required"
                    value={location}
                />

                <div>Will Deliver Item</div>
                {!willDeliver &&
                    <p>Yes</p>
                }
                <input
                className="input-text"
                    onChange={(e) => setWillDeliver(!willDeliver)}
                    type='checkbox' name='itemDeliver'
                />
                <button className="button" type="submit">Submit Post</button>
            </form>
        )}

    </>
}


export default Posts;