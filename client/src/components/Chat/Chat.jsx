import React, { useState } from "react";
import "./chat.scss";
import { userData } from "../../lib/dummyData";
import cross from "../../assets/cross.png";
function Chat() {
  const user = userData;
  const [chat, setChat] = useState(true);
  return (
    <div className="chat">
      <h1>Message</h1>
      <div className="messages">
        <div className="message" onClick={() => setChat(true)}>
          <img src={user.img} alt="" />
          <span>{user.name}</span>
          <p>Lorem, ipsum dolor...</p>
        </div>
        <div className="message">
          <img src={user.img} alt="" />
          <span>{user.name}</span>
          <p>Lorem, ipsum dolor=...</p>
        </div>
        <div className="message">
          <img src={user.img} alt="" />
          <span>{user.name}</span>
          <p>Lorem, ipsum dolor=...</p>
        </div>
        <div className="message">
          <img src={user.img} alt="" />
          <span>{user.name}</span>
          <p>Lorem, ipsum dolor=...</p>
        </div>
        <div className="message">
          <img src={user.img} alt="" />
          <span>{user.name}</span>
          <p>Lorem, ipsum dolor=...</p>
        </div>
      </div>
      {chat && (
        <div className="chatbox">
          <div className="top">
            <div className="left">
              <img src={user.img} alt="" />
              Muhammad Ahsan
            </div>
            <div className="right">
              <img src={cross} alt="" onClick={() => setChat(null)} />
            </div>
          </div>
          <div className="center">
            <div className="chatMessage">
              <p>Lorem, ipsum dolor</p>
              <span>1 hour ago</span>
            </div>
            <div className="chatMessage own">
              <p>Lorem, ipsum dolor</p>
              <span>1 hour ago</span>
            </div>
            <div className="chatMessage">
              <p>Lorem, ipsum dolor</p>
              <span>1 hour ago</span>
            </div>
            <div className="chatMessage own">
              <p>Lorem, ipsum dolor</p>
              <span>1 hour ago</span>
            </div>
            <div className="chatMessage own">
              <p>Lorem, ipsum dolor</p>
              <span>1 hour ago</span>
            </div>
            <div className="chatMessage own">
              <p>Lorem, ipsum dolor</p>
              <span>1 hour ago</span>
            </div>
            <div className="chatMessage own">
              <p>Lorem, ipsum dolor</p>
              <span>1 hour ago</span>
            </div>
            <div className="chatMessage">
              <p>Lorem, ipsum dolor</p>
              <span>1 hour ago</span>
            </div>
            <div className="chatMessage own">
              <p>Lorem, ipsum dolor</p>
              <span>1 hour ago</span>
            </div>
            <div className="chatMessage">
              <p>Lorem, ipsum dolor</p>
              <span>1 hour ago</span>
            </div>
            <div className="chatMessage own">
              <p>Lorem, ipsum dolor</p>
              <span>1 hour ago</span>
            </div>
          </div>
          <div className="bottom">
            <div className="msg">
              <input type="text" name="" id="" placeholder="Send Message" />
            </div>
            <div className="send">
              <button>Send</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Chat;
