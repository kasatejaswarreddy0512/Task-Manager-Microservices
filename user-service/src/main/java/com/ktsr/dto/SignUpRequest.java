package com.ktsr.dto;

import com.ktsr.model.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SignUpRequest {
    private String fullName;
    private String email;
    private String password;
    private Role role;
}
