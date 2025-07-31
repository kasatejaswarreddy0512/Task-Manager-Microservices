import React from "react";
import TaskCard from "../Task/TaskCard/TaskCard";

const TaskList = () => {
  return (
    <div className=" w-[64vw] ml-[120px]">
      <div className="space-y-3">
        {[1, 1, 1, 1].map((item) => (
          <TaskCard key={item} />
        ))}
      </div>
    </div>
  );
};

export default TaskList;
