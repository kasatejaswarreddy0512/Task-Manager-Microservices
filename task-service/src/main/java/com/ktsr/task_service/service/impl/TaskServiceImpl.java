package com.ktsr.task_service.service.impl;

import com.ktsr.task_service.model.Task;
import com.ktsr.task_service.model.TaskStatus;
import com.ktsr.task_service.repository.TaskRepository;
import com.ktsr.task_service.service.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TaskServiceImpl implements TaskService {

    private final TaskRepository taskRepository;

    @Override
    public Task createTask(Task task, String requestRole) throws Exception {
        if(!requestRole.equalsIgnoreCase("ADMIN")) {
            throw new Exception("Only Admin can Create Task..!");
        }
        task.setStatus(TaskStatus.PENDING);
        task.setCreatedAt(LocalDateTime.now());
        return taskRepository.save(task);
    }

    @Override
    public Task getTaskById(Long id) {
        return taskRepository.findById(id)
                .orElseThrow(()-> new RuntimeException("Task ID Not Found..!"+ id));
    }


    @Override
    public List<Task> getAllTasks(TaskStatus status) {
        List<Task> allTasks=taskRepository.findAll();

        return allTasks.stream()
                .filter(task-> status==null || task.getStatus().name().equalsIgnoreCase(status.toString()))
                .collect(Collectors.toList());
    }

    @Override
    public Task updateTask(Long id, Task task, Long userId) {
        Task updateTask=taskRepository.findById(id)
                .orElseThrow(()-> new RuntimeException(" Task is Not Foud...!"+id));

        if(task.getTitle()!=null){
            updateTask.setTitle(task.getTitle());
        }
        if(task.getImage()!=null){
            updateTask.setImage(task.getImage());
        }
        if(task.getDescription()!=null){
            updateTask.setDescription(task.getDescription());
        }
        if(task.getStatus()!=null){
            updateTask.setStatus(task.getStatus());
        }
        if (task.getTags() != null && !task.getTags().isEmpty()) {
            updateTask.setTags(task.getTags());
        }
        if(task.getDeadline()!=null){
            updateTask.setDeadline(task.getDeadline());
        }

        return taskRepository.save(updateTask);
    }

    @Override
    public Task deleteTask(Long id) {
        Task task= getTaskById(id);
        taskRepository.delete(task);
        return task;
    }

    @Override
    public Task assignToUser(Long userId, Long taskId) {
        Task task= getTaskById(taskId);
        task.setAssignedUserId(userId);
        task.setStatus(TaskStatus.COMPLETED);
        return taskRepository.save(task);
    }

    @Override
    public List<Task> assignedUserTask(Long userId, TaskStatus status) {
        List<Task> allTasks=taskRepository.findByAssignedUserId(userId);

        return allTasks.stream()
                .filter(task-> status==null || task.getStatus().name().equalsIgnoreCase(status.toString()))
                .collect(Collectors.toList());
    }

    @Override
    public Task completeTask(Long id) {
        Task task= getTaskById(id);
        task.setStatus(TaskStatus.PENDING);
        return taskRepository.save(task);
    }
}
