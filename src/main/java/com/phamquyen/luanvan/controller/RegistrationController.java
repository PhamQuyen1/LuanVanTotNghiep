package com.phamquyen.luanvan.controller;

import com.phamquyen.luanvan.dto.RequestRegistration;
import com.phamquyen.luanvan.service.RegistrationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api-public/v1/registration")
public class RegistrationController {

    @Autowired
    RegistrationService registrationService;

    @PostMapping(path = "register", produces = "application/json", consumes = "application/json")
    public String register(@RequestBody RequestRegistration requestRegistration){
        return registrationService.register(requestRegistration);
    }

    @GetMapping(path = "confirm")
    public String confirmRegistration(@RequestParam(name = "token") String token){

        return registrationService.confirmAt(token);
    }


}
