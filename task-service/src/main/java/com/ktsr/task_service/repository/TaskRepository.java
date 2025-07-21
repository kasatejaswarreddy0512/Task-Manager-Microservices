package com.ktsr.task_service.repository;

import com.ktsr.task_service.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {


     List<Task> findByAssignedUserId(Long userId);

}
