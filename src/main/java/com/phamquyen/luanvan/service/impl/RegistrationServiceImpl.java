package com.phamquyen.luanvan.service.impl;

import com.phamquyen.luanvan.domain.ConfirmationToken;
import com.phamquyen.luanvan.domain.Users;
import com.phamquyen.luanvan.dto.RequestRegistration;
import com.phamquyen.luanvan.service.ConfirmTokenService;
import com.phamquyen.luanvan.service.EmailService;
import com.phamquyen.luanvan.service.RegistrationService;
import com.phamquyen.luanvan.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class RegistrationServiceImpl implements RegistrationService {

    private final UserService userService;
    private final EmailService emailService;
    ConfirmTokenService confirmTokenService;

    @Override
    public String confirmAt(String token) {
//        TODO: save confirm time
        ConfirmationToken confirmationToken = confirmTokenService.getToken(token);
        confirmTokenService.setConfirmAt(confirmationToken);

//        TODO: unlock account
        Users users = confirmationToken.getUsers();
        userService.confirmAt(users);
        return "success";
    }

    @Override
    public String register(RequestRegistration requestRegistration) {

        String token = userService.signup(
                new Users(
                        requestRegistration.getEmail(),
                        requestRegistration.getUsername(),
                        requestRegistration.getPassword()
                ));

        // TODO: send mail

        String subject = "Xác nhận thông tin đăng kí tài khoản";
        String link = "http://localhost:8080/api/v1/registration/confirm?token=" + token;
        String content = "<h4>Chào " + requestRegistration.getUsername() + ",</h4>\n" +
                "<div>Cảm ơn bạn đã chọn cửa hàng của chúng tôi. Bạn cần nhấn vào link bên dưới " +
                "để hoàn thành quá trình đăng kí.</div>\n" +
                "\n" +
                "<div>&nbsp;</div>\n" +
                "\n" +
                "<div>Link: <a href=\"" + link + "\">Kích hoạt ngay</a></div>\n" +
                "\n" +
                "<div>Link chỉ tồn tại trong 10 phút.</div>\n" +
                "\n" +
                "<div>&nbsp;</div>\n" +
                "\n" +
                "<div>Cảm ơn bạn!!</div>";

        emailService.sendMail(
                requestRegistration.getEmail(),
                subject,
                content
                );

        return token;
    }
}
