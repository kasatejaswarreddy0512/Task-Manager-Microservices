package com.ktsr.task_service.controller;

import com.ktsr.task_service.feign.UserService;
import com.ktsr.task_service.model.Task;
import com.ktsr.task_service.model.TaskStatus;
import com.ktsr.task_service.model.UserDto;
import com.ktsr.task_service.repository.TaskRepository;
import com.ktsr.task_service.service.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/task")
@RequiredArgsConstructor
public class TaskController {

    private final TaskService taskService;
    private final UserService userService;

    @PostMapping("/create")
    public ResponseEntity<Task> createTask(@RequestBody Task task,
                                           @RequestHeader("Authorization") String authHeader) throws Exception {

        String jwt = authHeader.replace("Bearer", "").trim();

        ResponseEntity<UserDto> response = userService.getUserProfile("Bearer " + jwt);
        UserDto userDto = response.getBody();
        if (userDto == null) {
            throw new RuntimeException("User profile could not be fetched.");
        }

        Task savedTask = taskService.createTask(task, String.valueOf(userDto.getRole()));
        return new ResponseEntity<>(savedTask, HttpStatus.CREATED);
    }


    @GetMapping("/{id}")
    public ResponseEntity<Task> getTaskById(@PathVariable Long id, @RequestHeader("Authorization") String authHeader){
        String jwt=authHeader.replace("Bearer","").trim();
        UserDto userDto=userService.getUserProfile("Bearer "+jwt).getBody();
        return ResponseEntity.ok(taskService.getTaskById(id));
    }

    @GetMapping("/user")
    public ResponseEntity<List<Task>> getAssignedUserTask(@RequestParam(required = false)TaskStatus  status, @RequestHeader("Authorization") String authHeader){
        String jwt=authHeader.replace("Bearer","").trim();
        UserDto userDto=userService.getUserProfile("Bearer "+jwt).getBody();
        assert userDto != null;
        return ResponseEntity.ok(taskService.assignedUserTask(userDto.getId(),status));
    }

    @GetMapping("/allTask")
    public ResponseEntity<List<Task>> getAllTask(@RequestParam(required = false)TaskStatus  status, @RequestHeader("Authorization") String authHeader){
        String jwt=authHeader.replace("Bearer","").trim();
        UserDto userDto=userService.getUserProfile("Bearer "+jwt).getBody();
        return ResponseEntity.ok(taskService.getAllTasks(status));
    }

    @PutMapping("/{taskId}/user/{userId}/assigned")
    public ResponseEntity<Task> getAssignTaskToUser(
            @PathVariable Long taskId,
            @PathVariable Long userId,
            @RequestHeader("Authorization") String authHeader) {

        String jwt = authHeader.replace("Bearer", "").trim();
        UserDto userDto = userService.getUserProfile("Bearer " + jwt).getBody();
        return ResponseEntity.ok(taskService.assignToUser(userId, taskId));
    }


    @PutMapping("/{id}")
    public ResponseEntity<Task> updateTask(@RequestBody Task task,@PathVariable Long id
            ,@RequestHeader("Authorization") String authHeader){
        String jwt=authHeader.replace("Bearer","").trim();
        UserDto userDto=userService.getUserProfile("Bearer "+jwt).getBody();
        assert userDto != null;
        return ResponseEntity.ok(taskService.updateTask(id,task,userDto.getId()));
    }

    @PutMapping("/complete/{id}")
    public ResponseEntity<Task> completeTask(@PathVariable Long id
            ,@RequestHeader("Authorization") String authHeader){
        String jwt=authHeader.replace("Bearer","").trim();
        UserDto userDto=userService.getUserProfile("Bearer "+jwt).getBody();
        return ResponseEntity.ok(taskService.completeTask(id));
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Task> deleteTask(@PathVariable Long id
            , @RequestHeader("Authorization") String authHeader) {
        String jwt = authHeader.replace("Bearer", "").trim();
        UserDto userDto = userService.getUserProfile("Bearer " + jwt).getBody();
        return ResponseEntity.ok(taskService.deleteTask(id));
    }

}
