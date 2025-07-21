package com.ktsr.service;

import com.ktsr.model.Submission;

import java.util.List;

public interface SubmissionService {

    Submission submitTask(Long taskId, String gitHubLink, String jwt, Long userId) throws Exception;

    Submission getSubmissionById(Long id) throws Exception;

    List<Submission> getAllSubmission();

    List<Submission> getTAskSubmissionByTaskId(Long taskId);


    Submission acceptDeclineSubmission(Long id, String staus, String jwt) throws Exception;
}
