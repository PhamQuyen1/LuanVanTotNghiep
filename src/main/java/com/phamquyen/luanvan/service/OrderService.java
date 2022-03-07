package com.phamquyen.luanvan.service;

import com.phamquyen.luanvan.domain.Order;
import com.phamquyen.luanvan.dto.OrderRequest;

import java.util.Map;

public interface OrderService {
    Order createOrder(OrderRequest orderRequest);

    void updateOrderStatus(Long orderId, String status);

    Order findOrderById(Long orderId);

    Map<String, Object> listAll(String email, String status, String paymentMethod, String sortDir,int page);
}
