package com.phamquyen.luanvan.service.impl;

import com.phamquyen.luanvan.domain.ConfirmationToken;
import com.phamquyen.luanvan.domain.Users;
import com.phamquyen.luanvan.dto.ConfirmForgotPasswordRequest;
import com.phamquyen.luanvan.dto.ModifiedInfoRequest;
import com.phamquyen.luanvan.dto.UpdatePassword;
import com.phamquyen.luanvan.dto.UserRequest;
import com.phamquyen.luanvan.enumeration.ERole;
import com.phamquyen.luanvan.repository.UsersRepository;
import com.phamquyen.luanvan.service.ConfirmTokenService;
import com.phamquyen.luanvan.service.EmailService;
import com.phamquyen.luanvan.service.RoleService;
import com.phamquyen.luanvan.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService, UserDetailsService {

    private final UsersRepository usersRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final RoleService roleService;
    private final ConfirmTokenService confirmTokenService;
    private final EmailService emailService;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<Users> user = usersRepository.findByEmail(username);

        if(!user.isPresent()){
            throw new UsernameNotFoundException("Username khong ton tai.");
        }

        return user.get();
    }

    @Override
    public void confirmAt(Users users) {
        users.setLocked(true);
        usersRepository.save(users);
    }
    @Override
    public void delete(Users users){
        System.out.println(users);
        users.setRole(null);
        usersRepository.deleteById(users.getUserId());
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

    @Override
    public void forgotPassword(String email){
        Users user = usersRepository.findByEmail(email)
                .orElseThrow(()->new IllegalStateException("Email khong ton tai"));

        String code = UUID.randomUUID().toString();

        ConfirmationToken confirmationToken=  new ConfirmationToken(
                code,
                LocalDateTime.now(),
                LocalDateTime.now().plusMinutes(10),
                user
        );

        confirmTokenService.saveConfirmToken(confirmationToken);

//        TODO: send new password email to user
        String subject = "Mã code xác nhận";
        String content = "<h4>Chào " + user.getFullname() + ",</h4>\n" +
                "<div>Chúng tôi cung cấp một mã code theo yêu cầu của bạn. " +
                "<div>&nbsp;</div>\n" +
                "\n" +
                "<div>Mã code: "+ code +"</div>\n" +
                "\n" +
                "<div>Bạn cần nhập mã code để tiến hành tiến hành thay đổi mật khẩu</div>\n" +
                "\n" +
                "<div>&nbsp;</div>\n" +
                "\n" +
                "<div>Cảm ơn bạn!!</div>";
        emailService.sendMail(user.getEmail(), subject, content);
    }

    @Override
    public List<Users> listAll(){
        return usersRepository.findAll();
    }

    @Override
    public Users findById(Long id){
        return usersRepository.findById(id).orElseThrow(
                ()-> new IllegalStateException("Username khong ton tai"));
    }

    @Override
    public void confirmForgotPassword(ConfirmForgotPasswordRequest confirmForgotPasswordRequest){
        ConfirmationToken confirmationToken = confirmTokenService.getToken(confirmForgotPasswordRequest.getCode());
        confirmTokenService.setConfirmAt(confirmationToken);
        Users users = confirmationToken.getUsers();
        users.setPassword(passwordEncoder.encode(confirmForgotPasswordRequest.getPassword()));
        usersRepository.save(users);
    }

    @Override
    public Users updateInfo(UserRequest userRequest) {
        Users user = this.getUserAuthenticate();
        user.setAddress(userRequest.getAddress());
        user.setFullname(userRequest.getFullname());
        user.setPhone(userRequest.getPhone());
        return usersRepository.save(user);
    }

    @Override
    public boolean updatePassword(UpdatePassword updatePassword) {
        String newPassword = passwordEncoder.encode(updatePassword.getNewPassword());

        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal();

        Users user = usersRepository.findByEmail(userDetails.getUsername()).get();
        if(passwordEncoder.matches(updatePassword.getPassword(), user.getPassword())){
            System.out.println(passwordEncoder.matches(updatePassword.getPassword(), user.getPassword()));
            user.setPassword(newPassword);
            usersRepository.save(user);
            return true;
        }
        return false;
    }

    @Override
    public void modifiedInfo(ModifiedInfoRequest modifiedInfoRequest) {

        Users user = usersRepository.findById(modifiedInfoRequest.getUserId())
                .orElseThrow(()->new IllegalStateException("User khong ton tai"));
        user.setLocked(modifiedInfoRequest.isLooked());
        user.setRole(roleService.getRole(ERole.valueOf(modifiedInfoRequest.getRole())));
        usersRepository.save(user);
    }

    @Override
    public Users getUserAuthenticate(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        return usersRepository.findByEmail(userDetails.getUsername()).get();
    }

    @Override
    public List<Users> findAllByFullname(String fullname){
        return usersRepository.findAllByFullname(fullname);
    }
    @Override
    public List<Users> findAllByEmail(String email){
        return usersRepository.findAllByEmail(email);
    }
    @Override
    public List<Users> findAll(){
        return  usersRepository.findAll();
    }

    @Override
    public void save(Users user){
        usersRepository.save(user);
    }
}
