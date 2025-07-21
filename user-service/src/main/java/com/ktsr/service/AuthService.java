package com.ktsr.service;

import com.ktsr.dto.JwtResponse;
import com.ktsr.dto.LoginRequest;
import com.ktsr.dto.SignUpRequest;
import com.ktsr.model.User;
import com.ktsr.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;


    public User signUp(SignUpRequest signUpRequest){
        User user=new User();
        user.setFullName(signUpRequest.getFullName());
        user.setEmail(signUpRequest.getEmail());
        user.setPassword(passwordEncoder.encode(signUpRequest.getPassword()));
        user.setRole(signUpRequest.getRole());
        return userRepository.save(user);
    }

    public JwtResponse signIn(LoginRequest loginRequest) throws Exception {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                loginRequest.getEmail(),loginRequest.getPassword()));

        var user=userRepository.findByEmail(loginRequest.getEmail())
                .orElseThrow(()-> new Exception("User Email Not Found"));

        var jwt=jwtService.generateToken(user);

        JwtResponse response=new JwtResponse();
        response.setToken(jwt);
        return response;
    }
}
