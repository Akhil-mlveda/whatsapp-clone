import { useState, useEffect } from "react";
import "./Chat.css";
import { Avatar, IconButton } from "@material-ui/core";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import AttachFile from "@mui/icons-material/AttachFile";
import MoreVert from "@mui/icons-material/MoreVert";
import { InsertEmoticon } from "@mui/icons-material";
import MicIcon from "@mui/icons-material/Mic";
import { useParams } from "react-router-dom";
import db from "../firebase";
import {
  onSnapshot,
  collection,
  doc,
  query,
  orderBy,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { useStateValue } from "../StateProvider";
// import firebase from "firebase";

// import MoreVertIcon from "@mui/icons-material/MoreVert";
// import SidebarChat from "./SidebarChat";

function Chat() {
  const [input, setInput] = useState("");
  const [seed, setSeed] = useState("");
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    // check condition for room id is present or not after the login the user
    if (roomId) {
      // take users name
      // db.collection('rooms').doc(roomId).onSnapshot(snapshot => (setRoomName(snapshot.data().name)))}
      onSnapshot(doc(collection(db, "rooms"), roomId), (doc) => {
        setRoomName(doc.data().name);
      });
    }
    // take user conversation messages
    /////////////// oldways
    // collection("rooms")
    //   .doc(roomId)
    //   .collection("messages")
    //   .orderBy("timestamp", "asc")
    //   .onSnapshot((snapshot) =>
    //     setMessages(snapshot.docs.map((doc) => doc.data()))
    //   );
    const messagesRef = collection(db, "rooms", roomId, "messages");
    const messagesQuery = query(messagesRef, orderBy("timestamp", "asc"));

    onSnapshot(messagesQuery, (snapshot) => {
      const messages = snapshot.docs.map((doc) => doc.data());
      setMessages(messages);
    });

    // return unsub;
  }, [roomId]);

  // set up the profile picture
  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, [roomId]);

  const sendMessage = (e) => {
    e.preventDefault();
    console.log("you typed >>>> ", input);
    // add conversation messages to the database
    // //////old way to add data in to firebase database
    /// db.collection("rooms").doc(roomId).collection("messages").add({
    //   message: input,
    //   name: user.displayName,
    // });
    const messagesRef = collection(db, "rooms", roomId, "messages");

    const newMessage = {
      message: input,
      name: user.displayName,
      timestamp: serverTimestamp(),
      // timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    };

    addDoc(messagesRef, newMessage)
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });

    setInput("");
  };
  return (
    <div className="chat">
      {/* chat header  */}
      <div className="chat__header">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="chat__headerInfo">
          <h3>{roomName}</h3>
          <p>
            Last seen at{" "}
            {new Date(
              messages[messages.length - 1]?.timestamp?.toDate()
            ).toUTCString()}
          </p>
        </div>

        <div className="chat__headerRight">
          <div className="sidebar__headerRight">
            <IconButton>
              <SearchOutlinedIcon />
            </IconButton>
            <IconButton>
              <AttachFile />
            </IconButton>
            <IconButton>
              <MoreVert />
            </IconButton>
          </div>
        </div>
      </div>

      {/* chat body  */}
      <div className="chat__body">
        {messages.map((message) => (
          <>
            <p
              className={`chat__message ${
                message.name === user.displayName && `chat__reciever`
              } `}
            >
              <span className="chat__name">{message.name}</span>
              {message.message}
              <span className="chat__timestamp">
                {new Date(message.timestamp?.toDate()).toUTCString()}
              </span>
            </p>
          </>
        ))}

        {/* <p className={`chat__message ${true && `chat__reciever`} `}>
          <span className="chat__name">Akhil R</span>
          Hey Guys
          <span className="chat__timestamp">04-05-2023 12:01pm</span>
        </p> */}
      </div>

      {/* chat footer */}
      <div className="chat__footer">
        <InsertEmoticon />
        <form>
          <input
            placeholder="Type a message"
            type="text"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
          />
          <button type="submit" onClick={sendMessage}>
            Send a message
          </button>
        </form>
        <MicIcon />
      </div>
    </div>
  );
}

export default Chat;
