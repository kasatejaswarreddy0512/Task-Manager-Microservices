package com.ktsr.service;

import com.ktsr.model.User;
import com.ktsr.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final JwtService jwtService;

    public UserDetailsService userDetailsService(){
        return new UserDetailsService() {
            @Override
            public UserDetails loadUserByUsername(String email) {
                return userRepository.findByEmail(email)
                        .orElseThrow(()-> new RuntimeException("USer Email Not Found...!"))   ;
            }
        };
    }

    public User getUserProfile(String jwt){
        String email = extractEmailFromJwt(jwt); // your JWT decode logic
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    private String extractEmailFromJwt(String jwt) {
        return jwtService.extractUsername(jwt);
    }

}
