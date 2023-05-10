import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import "./App.css";
import Chat from "./Component/Chat";
import Sidebar from "./Component/Sidebar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './Component/Login';
import { useStateValue } from './StateProvider';

function App() {
  // const [count, setCount] = useState(0)
  // const [user, setUser] = useState("");
  const [{user}, dispatch] = useStateValue();

  return (
    <>
      <div className="app">
        {!user ? (
          <Login />
        ) : (
          <div className="app__body">
            <Router>
              <Sidebar />
              <Routes>
                <Route path="/rooms/:roomId" element={<Chat />}>
                  {/* sidebar */}
                  {/* <Chat /> */}
                </Route>
                <Route path="/" element={<h2>Home Page</h2>}>
                  {/* chat */}
                  {/* <Chat /> */}
                  {/* <h2>Home Page</h2> */}
                </Route>
              </Routes>
            </Router>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
