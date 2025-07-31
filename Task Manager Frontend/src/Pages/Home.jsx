import React from "react";
import SideBar from "./SideBar";
import TaskList from "./TaskList";

const Home = () => {
  return (
    <div className="flex h-screen px-5 lg:px-20 pt-[2.9vh]">
      {/* Fixed Sidebar */}
      <div className="hidden lg:block w-[25vh] sticky top-0 h-screen">
        <SideBar />
      </div>

      {/* Scrollable Task List (hidden scrollbar) */}
      <div className="flex-1 overflow-y-auto mb-10 hide-scrollbar">
        <TaskList />
      </div>
    </div>
  );
};

export default Home;
