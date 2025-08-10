package com.ktsr.controller;

import com.ktsr.dto.JwtResponse;
import com.ktsr.dto.LoginRequest;
import com.ktsr.dto.SignUpRequest;
import com.ktsr.model.User;
import com.ktsr.service.AuthService;
import com.ktsr.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<JwtResponse> signUp(@RequestBody SignUpRequest signUpRequest) {
        return new ResponseEntity<>(authService.signUp(signUpRequest), HttpStatus.CREATED);
    }

    @PostMapping("signin")
    public ResponseEntity<JwtResponse> signin(@RequestBody  LoginRequest loginRequest) throws Exception {
        return ResponseEntity.ok(authService.signIn(loginRequest));
    }


}
