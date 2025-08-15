package com.ktsr.service.Impl;

import com.ktsr.dto.TaskDto;
import com.ktsr.feign.TaskService;
import com.ktsr.feign.UserService;
import com.ktsr.model.Submission;
import com.ktsr.repository.SubmissionRepository;
import com.ktsr.service.SubmissionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SubmissionServiceImpl implements SubmissionService {

    private final SubmissionRepository submissionRepository;

    private final TaskService taskService;
    private final UserService userService;

    @Override
    public Submission submitTask(Long taskId, String gitHubLink, String authHeader, Long userId) {
        TaskDto taskDto = taskService.getTaskById(taskId, authHeader).getBody();
        if (taskDto != null) {
            Submission submission = new Submission();
            submission.setTaskId(taskId);
            submission.setUserId(userId);
            submission.setGithubLink(gitHubLink);
            submission.setSubmissionTime(LocalDateTime.now());
            return submissionRepository.save(submission);
        }
        // Better to throw a 404 error
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Task Id Not Found: " + taskId);
    }

    @Override
    public Submission getSubmissionById(Long id) throws Exception {
        return submissionRepository.findById(id)
                .orElseThrow(()-> new Exception(" Task Id Not Found...!" + id));
    }

    @Override
    public List<Submission> getAllSubmission() {
        return submissionRepository.findAll();
    }

    @Override
    public List<Submission> getTAskSubmissionByTaskId(Long taskId) {

        return submissionRepository.findByTaskId(taskId);
    }

    @Override
    public Submission acceptDeclineSubmission(Long id, String status, String jwt) throws Exception {
        Submission submission = getSubmissionById(id);

        submission.setStatus(status);

        if ("ACCEPTED".equalsIgnoreCase(status)) {
            taskService.completeTask(submission.getTaskId(), jwt);
        }

        return submissionRepository.save(submission);
    }

}
