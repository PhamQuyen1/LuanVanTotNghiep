package com.phamquyen.luanvan.service.impl;

import com.phamquyen.luanvan.domain.Roles;
import com.phamquyen.luanvan.enumeration.ERole;
import com.phamquyen.luanvan.repository.RolesRepository;
import com.phamquyen.luanvan.service.RoleService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class RoleServiceImpl implements RoleService {

    private final RolesRepository rolesRepository;

    public Roles getRole(ERole eRole){
        Optional<Roles> role = rolesRepository.findByRoleName(eRole);

        if (!role.isPresent()){
           throw new IllegalStateException("Role khong ton tai");
        }

        return role.get();
    }

}
