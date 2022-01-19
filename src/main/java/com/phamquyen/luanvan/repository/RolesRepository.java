package com.phamquyen.luanvan.repository;

import com.phamquyen.luanvan.domain.Roles;
import com.phamquyen.luanvan.enumObj.ERole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RolesRepository extends JpaRepository<Roles, Long> {

    Optional<Roles> findByRoleName(ERole name);
}
