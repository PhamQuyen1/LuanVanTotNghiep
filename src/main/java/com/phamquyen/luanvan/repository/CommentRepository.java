package com.phamquyen.luanvan.repository;

import com.phamquyen.luanvan.domain.Comment;
import com.phamquyen.luanvan.domain.compositeKey.CommentId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentRepository extends JpaRepository<Comment, CommentId> {
}
