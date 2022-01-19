package com.phamquyen.luanvan.service.impl;

import com.phamquyen.luanvan.domain.ConfirmationToken;
import com.phamquyen.luanvan.domain.Users;
import com.phamquyen.luanvan.enumObj.ERole;
import com.phamquyen.luanvan.repository.UsersRepository;
import com.phamquyen.luanvan.service.ConfirmTokenService;
import com.phamquyen.luanvan.service.RoleService;
import com.phamquyen.luanvan.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService, UserDetailsService {

    private final UsersRepository usersRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final RoleService roleService;
    private final ConfirmTokenService confirmTokenService;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<Users> user = usersRepository.findByEmail(username);

        if(!user.isPresent()){
            throw new UsernameNotFoundException("Username khong ton tai");
        }

        return user.get();
    }

//    public Optional<Users> findByEmail(String email){
//        return usersRepository.findByEmail(email);
//    }

    @Override
    public void confirmAt(Users users) {
        users.setLocked(true);
        usersRepository.save(users);
    }

    @Override
    public String signup(Users users) {
        Optional<Users> user = usersRepository.findByEmail(users.getEmail());

        if (user.isPresent()){
            throw new IllegalStateException("Email da ton tai");
        }

        String encodePassword = passwordEncoder.encode(users.getPassword());

        users.setPassword(encodePassword);
        users.setRole(roleService.getRole(ERole.USER));

        usersRepository.save(users);

        String token = UUID.randomUUID().toString();

        ConfirmationToken confirmationToken=  new ConfirmationToken(
                token,
                LocalDateTime.now(),
                LocalDateTime.now().plusMinutes(10),
                users
        );

        confirmTokenService.saveConfirmToken(confirmationToken);
        return token;
    }
}
