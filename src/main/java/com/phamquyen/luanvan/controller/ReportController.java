package com.phamquyen.luanvan.controller;

import com.phamquyen.luanvan.dto.OrderReport;
import com.phamquyen.luanvan.service.OrderService;
import com.phamquyen.luanvan.service.ProductService;
import com.phamquyen.luanvan.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api/v1/report")
public class ReportController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private UserService userService;

    @Autowired
    private ProductService productService;

    @GetMapping("public")
    public ResponseEntity<?> report(@RequestParam String label){
        return ResponseEntity.ok(orderService.orderReport(label));
    }
    @GetMapping("public/info")
    public ResponseEntity<?> info(){
        Map<String, Long> report = new HashMap<>();
        report.put("totalProduct", productService.countProduct());

        report.putAll(orderService.countOrder1Month());
        report.put("totalOrder", orderService.countOrder());
        report.put("totalUser", userService.countUser());
        return ResponseEntity.ok(report);
    }

}
