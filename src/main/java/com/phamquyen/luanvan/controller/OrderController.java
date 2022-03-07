package com.phamquyen.luanvan.controller;

import com.phamquyen.luanvan.domain.Order;
import com.phamquyen.luanvan.dto.OrderRequest;
import com.phamquyen.luanvan.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("api/v1/order")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping("")
    public ResponseEntity<?> createOrder(@RequestBody OrderRequest orderRequest){
        Order order = orderService.createOrder(orderRequest);
        return ResponseEntity.ok(order);
    }

    @PutMapping("")
    public ResponseEntity<?> updateOrderStatus(@RequestParam Long orderId, String status){
        orderService.updateOrderStatus(orderId, status);
        return ResponseEntity.ok("Success");
    }

    @GetMapping("{orderId}")
    public ResponseEntity<?> getOrderById(@PathVariable Long orderId){
        return ResponseEntity.ok(orderService.findOrderById(orderId));
    }

    @GetMapping("")
    public ResponseEntity<Map<String, Object>> listAll(
            @RequestParam(required = false) String email,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String paymentMethod,
            @RequestParam(defaultValue = "desc") String sortDir,
            @RequestParam(defaultValue = "1") int page){
        return ResponseEntity.ok(orderService.listAll(email, status, paymentMethod, sortDir, page));
    }

}
