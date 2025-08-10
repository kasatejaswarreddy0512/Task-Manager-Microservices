import React from "react";
import SideBar from "./SideBar";
import TaskList from "./TaskList";

const Home = () => {
  return (
    <div className="flex h-screen px-5 lg:px-10 pt-[2.9vh] gap-6">
      {/* Sidebar (left) */}
      <div className="w-[20vw] sticky top-0 h-screen">
        <SideBar />
      </div>

      {/* Task List (right) */}
      <div className="flex-1 overflow-y-auto hide-scrollbar">
        <TaskList />
      </div>
    </div>
  );
};

export default Home;
