package com.ktsr.controller;

import com.ktsr.model.User;
import com.ktsr.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor

public class UserController {

    private final UserService userService;

    @GetMapping("/profile")
    public ResponseEntity<User> getUserProfile(@RequestHeader("Authorization") String authHeader){
        String jwt = authHeader.substring(7).trim();
        return ResponseEntity.ok(userService.getUserProfile(jwt));
    }


    @GetMapping("")
    public ResponseEntity<List<User>> getAllUsers(@RequestHeader("Authorization") String authHeader){
        String jwt = authHeader.substring(7).trim();
        return ResponseEntity.ok(userService.getAllUsers());
    }

}
