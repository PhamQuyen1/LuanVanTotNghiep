package com.phamquyen.luanvan.service;

import com.phamquyen.luanvan.domain.Roles;
import com.phamquyen.luanvan.enumObj.ERole;

public interface RoleService {

    public Roles getRole(ERole eRole);
}
