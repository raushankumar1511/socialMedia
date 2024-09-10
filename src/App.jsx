import { useState, useContext, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import CreatePost from "./components/CreatePost";
import PostList from "./components/PostList";
import PostListProvider from "./store/post-list-store";
import FetchInitialPost from "../src/components/FetchIntitalPost";

function App() {
  const [selectedTab, setSelectedTab] = useState("Home");

  const [fetching, setFetching] = useState(false);

  return (
    <PostListProvider>
      <FetchInitialPost setFetching={setFetching} />
      <div className="app-container">
        <Sidebar
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
        ></Sidebar>
        <div className="content">
          <Header className="header"></Header>
          {selectedTab === "Home" ? (
            <div className="row g-4 py-5 row-cols-1 row-cols-lg-3">
              <PostList fetching={fetching}></PostList>
            </div>
          ) : (
            <CreatePost setSelectedTab={setSelectedTab}></CreatePost>
          )}
          <Footer></Footer>
        </div>
      </div>
    </PostListProvider>
  );
}

export default App;
