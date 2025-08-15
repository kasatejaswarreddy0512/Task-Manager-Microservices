import React, { useEffect } from "react";
import TaskCard from "../Task/TaskCard/TaskCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks, fetchUsersTasks } from "../Redux ToolKit/TaskSlice";
import { useLocation } from "react-router-dom";

const TaskList = () => {
  const dipatch = useDispatch();
  const { task, auth } = useSelector((store) => store);
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const filterValue = queryParams.get("filter");

  useEffect(() => {
    if (auth.user?.role == "ADMIN") {
      dipatch(fetchTasks({ status: filterValue }));
    } else {
      dipatch(fetchUsersTasks({ status: filterValue }));
    }
  }, [filterValue]);

  // console.log("task", task);

  return (
    <div className="w-[900px]">
      <div className="space-y-3">
        {auth.user?.role == "ADMIN"
          ? task.tasks.map((item) => <TaskCard item={item} />)
          : task.usersTask.map((item) => <TaskCard item={item} />)}
      </div>
    </div>
  );
};

export default TaskList;
