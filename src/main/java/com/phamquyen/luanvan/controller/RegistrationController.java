package com.phamquyen.luanvan.controller;

import com.phamquyen.luanvan.dto.ConfirmRequest;
import com.phamquyen.luanvan.dto.RequestRegistration;
import com.phamquyen.luanvan.service.RegistrationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("api-public/v1/registration")
public class RegistrationController {

    @Autowired
    RegistrationService registrationService;

    @PostMapping(path = "register", produces = "application/json", consumes = "application/json")
    public String register(@RequestBody RequestRegistration requestRegistration){
        return registrationService.register(requestRegistration);
    }

    @PutMapping(path = "confirm")
    public String confirmRegistration(@RequestBody ConfirmRequest confirmRequest){

        return registrationService.confirmAt(confirmRequest.getToken());
    }


}
