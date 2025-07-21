package com.ktsr.feign;

import com.ktsr.dto.TaskDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestHeader;

@FeignClient(name ="TASK-SERVICE", url = "http://localhost:8081")
public interface TaskService {


    @GetMapping("/api/task/{id}")
    public ResponseEntity<TaskDto> getTaskById(@PathVariable Long id, @RequestHeader("Authorization") String authHeader);


    @PutMapping("/api/task/complete/{id}")
    public ResponseEntity<TaskDto> completeTask(@PathVariable Long id
            ,@RequestHeader("Authorization") String authHeader);


}
