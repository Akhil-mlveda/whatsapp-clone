import { useState, useEffect } from "react";
import "./SidebarChat.css";
import { Avatar } from "@material-ui/core";
import { collection, addDoc } from "firebase/firestore";
import db from "../firebase";
import { Link } from "react-router-dom";

function SidebarChat({ id, name, addNewChat }) {
  const [seed, setSeed] = useState("");

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 10000));
  }, []);

  const createChat = async () => {
    const roomName = prompt("Please enter name for Chat room");

    if (roomName) {
      // do some database stufffff ....!
      // db.collection("rooms").add({name: roomName, });
      try {
        const docRef = addDoc(collection(db, "rooms"), {
          name: roomName,
        });
        console.log("Successful Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
  };

  return !addNewChat ? (
    <>
      <Link to={`rooms/${id}`}>
        <div className="sidebarChat">
          <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
          <div className="sidebarChat__info">
            <h2>{name}</h2>
            <p>Last message...</p>
          </div>
        </div>
      </Link>
    </>
  ) : (
    <div onClick={createChat} className="sidebarChat">
      <h2>Add New Chat</h2>
    </div>
  );
}

export default SidebarChat;
