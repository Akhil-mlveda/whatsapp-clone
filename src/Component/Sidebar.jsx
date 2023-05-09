import { useEffect, useState } from "react";
import "./Sidebar.css";
import { Avatar, IconButton } from "@material-ui/core";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import ChatIcon from "@mui/icons-material/Chat";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import SidebarChat from "./SidebarChat";
import { collection } from "firebase/firestore";
import db from "../firebase";
import { query, onSnapshot } from "firebase/firestore";

// import ChatIcon from "@material-ui/icons/ChatIcon";
// import MoreVertIcon from "@material-ui/icons/MoreVertIcon";
// import { SearchOutlined } from "@material-ui/icons";
// import Icon from '@mui/material/Icon';

function Sidebar() {
  // fetching the data from firebase database
  const [rooms, setRooms] = useState([]);

  useEffect(() => {

    // const q = query(collection(db, "cities"), where("state", "==", "CA"));
    // const unsubscribe = onSnapshot(q, (querySnapshot) => {
    //   const cities = [];
    //   querySnapshot.forEach((doc) => {
    //     cities.push(doc.data().name);
    //   });
    //   console.log("Current cities in CA: ", cities.join(", "));
    // });

    const q = query(collection(db, "rooms"))
    const roomes = onSnapshot(q, (snapshot) => {
      setRooms(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });

    // getDocs(collection(db, "rooms")).then((snapshot) => {
    //   setRooms(
    //     snapshot.docs.map((doc) => ({
    //       id: doc.id,
    //       data: doc.data(),
    //     }))
    //   );
    // });

    // return () => {
    //   second;
    // };
  }, []);

  return (
    // full side bar
    <div className="sidebar">
      {/* sidebar header  */}
      <div className="sidebar__header">
        <Avatar />
        <div className="sidebar__headerRight">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>

      {/* sidebar search components */}
      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <SearchOutlinedIcon />
          <input placeholder="Search or start new chat" type="text" />
        </div>
      </div>

      {/* sidebar chats */}
      <div className="sidebar__chats">
        <SidebarChat addNewChat />
        {/* UPDATED as per the new version */}
        {rooms.map((room) => (
          <SidebarChat key={room.id} id={room.id} name={room.data.name} />
        ))}
      </div>
      {/* <div className="sidebar__chats">
        <SidebarChat addNewChat="fsd" />
        <SidebarChat  />
        <SidebarChat  />
        <SidebarChat />
        <SidebarChat  />
        <SidebarChat  />
        <SidebarChat  />
        <SidebarChat  />
        <SidebarChat  />
        <SidebarChat  />
        <SidebarChat  />
      </div> */}
    </div>
  );
}

export default Sidebar;
