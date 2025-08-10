package com.ktsr.task_service.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String description;
    private String image;
    private Long assignedUserId;
    @ElementCollection
    private List<String> tags= new ArrayList<>();
    private LocalDateTime deadline;
    private LocalDateTime createdAt;

    private TaskStatus status;


}
