package com.phamquyen.luanvan.service;

import com.phamquyen.luanvan.domain.Order;
import com.phamquyen.luanvan.dto.OrderReport;
import com.phamquyen.luanvan.dto.OrderRequest;

import java.util.List;
import java.util.Map;

public interface OrderService {
    Order createOrder(OrderRequest orderRequest);

    boolean checkUserBuyProduct(Long productId);

    void updateOrderStatus(Long orderId, String status);

    Order findOrderById(Long orderId);

    Map<String, Object> listAll(String email, String status, String paymentMethod,String sortField,  String sortDir,int page, int size);

    Map<String, List<OrderReport>> orderReport(String label);

    Map<String, Long> countOrder1Month();

    long countOrder();
}
