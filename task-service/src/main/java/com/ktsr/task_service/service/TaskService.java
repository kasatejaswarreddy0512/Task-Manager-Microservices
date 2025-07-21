package com.ktsr.task_service.service;

import com.ktsr.task_service.model.Task;
import com.ktsr.task_service.model.TaskStatus;

import java.util.List;

public interface TaskService {

    Task createTask(Task task, String requestRole) throws Exception;

    Task getTaskById(Long id);

    List<Task> getAllTasks(TaskStatus status);

    Task updateTask(Long id, Task task, Long userId);

    Task deleteTask(Long id);

    Task assignToUser(Long userId, Long taskId);

    List<Task> assignedUserTask(Long userId, TaskStatus status);

    Task completeTask(Long id);

}
