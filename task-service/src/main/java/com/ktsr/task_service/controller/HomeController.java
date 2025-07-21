package com.ktsr.task_service.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

    @GetMapping("/tasks")
    public ResponseEntity<String> HomeTask(){
        return ResponseEntity.ok("Welcome to Task Service");
    }
}
