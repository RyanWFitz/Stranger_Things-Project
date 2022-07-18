import React from "react";

const Home = ({ UserData, user, token }) => {

    return <>
        <h1 id="pageTitle">Stranger's Things</h1>
        <div id="pageIntro">Welcome to Stranger's Things. If this is your first time, please Register by clicking the Account tab. If you're a returning member, please Log In to Continue!</div>
        <div>{user && token && <h2 className="sent-received-messages">Sent Messages</h2>}</div>
        {UserData.messages?.map((message, idx) => {
            if (message.fromUser._id === UserData._id) {
                return (
                    <div className="sent-messages" key={`${message._id} ${idx}`}>
                        <div>From Post: {message.post.title}</div>
                        <div>{message.content}</div>
                    </div>
                )
            }
        })}

        <div>{user && token && <h2 className="sent-received-messages">Received Messages</h2>}</div>
        {UserData.messages?.map((message, index) => {
            if (message.fromUser._id !== UserData._id) {
                return (
                    <div className="received-messages" key={index}>
                        <div>From: {message.fromUser.username}</div>
                        <div>Regarding: {message.post.title}</div>
                        <div>{message.content}</div>
                    </div>
                )
            }
        })}
    </>

}

export default Home