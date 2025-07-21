package com.ktsr.task_service.feign;

import com.ktsr.task_service.model.UserDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;


@FeignClient(name="USER-SERVICE" , url = "http://localhost:8084")
public interface UserService {

    @GetMapping("/api/users/profile")
    public ResponseEntity<UserDto> getUserProfile(@RequestHeader("Authorization") String authHeader);
}
