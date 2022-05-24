package com.phamquyen.luanvan.repository;

import com.phamquyen.luanvan.domain.Users;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UsersRepository extends JpaRepository<Users, Long>{

    Optional<Users> findByEmail(String email);

    @Query("SELECT u FROM Users u where u.fullname LIKE %:fullname%")
    List<Users> findAllByFullname(String fullname);

    @Query("SELECT u FROM Users u where u.email LIKE %:email%")
    List<Users> findAllByEmail(String email);

    @Query("SELECT u FROM Users u where u.email LIKE %:email%")
    Page<Users> findAllByEmail(String email, Pageable pageable);

}
