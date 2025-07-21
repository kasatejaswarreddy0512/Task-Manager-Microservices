package com.ktsr.controller;

import com.ktsr.dto.UserDto;
import com.ktsr.feign.TaskService;
import com.ktsr.feign.UserService;
import com.ktsr.model.Submission;
import com.ktsr.service.SubmissionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/submission")
public class SubmissionController {

    private final SubmissionService submissionService;
    private final UserService userService;
    private final TaskService taskService;


    @PostMapping("/submit")
    public ResponseEntity<Submission> submitTask(@RequestParam Long taskId,
                                                 @RequestParam String githubLink,
                                                 @RequestHeader("Authorization") String authHeader) throws Exception {
        // Don’t strip Bearer, just pass as is
        UserDto userDto = userService.getUserProfile(authHeader).getBody();

        if (userDto == null) {
            throw new RuntimeException("User profile could not be fetched.");
        }
        Submission savedSubmission = submissionService.submitTask(
                taskId, githubLink, authHeader, userDto.getId()
        );
        return ResponseEntity.status(HttpStatus.CREATED).body(savedSubmission);
    }


    @GetMapping("/allSubmission")
    public ResponseEntity<List<Submission>> getAllSubmission(@RequestHeader("Authorization") String authHeader){
        String jwt=authHeader.replace("Bearer","").trim();
        UserDto userDto=userService.getUserProfile("Bearer "+jwt).getBody();

        return ResponseEntity.ok(submissionService.getAllSubmission());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Submission> getSubmissionId(@PathVariable Long id, @RequestHeader("Authorization") String authHeader) throws Exception {
        String jwt=authHeader.replace("Bearer","").trim();
        UserDto userDto=userService.getUserProfile("Bearer "+jwt).getBody();

        return ResponseEntity.ok(submissionService.getSubmissionById(id));
    }

    @GetMapping("task/{taskId}")
    public ResponseEntity<List<Submission>> getTAskSubmissionByTaskId(@PathVariable Long taskId, @RequestHeader("Authorization") String authHeader){
        String jwt=authHeader.replace("Bearer","").trim();
        UserDto userDto=userService.getUserProfile("Bearer "+jwt).getBody();

        return ResponseEntity.ok(submissionService.getTAskSubmissionByTaskId(taskId));
    }

    @PutMapping("accept/{id}")
    public ResponseEntity<Submission> acceptDeclineSubmission(
            @PathVariable Long id,
            @RequestParam String status, // ✅ Accept status as query param or form param
            @RequestHeader("Authorization") String authHeader
    ) throws Exception {
        String jwt = authHeader.replace("Bearer", "").trim();

        // Get user profile if needed (optional validation)
        UserDto userDto = userService.getUserProfile("Bearer " + jwt).getBody();

        Submission updatedSubmission = submissionService.acceptDeclineSubmission(id, status, authHeader);
        return ResponseEntity.ok(updatedSubmission);
    }



}
