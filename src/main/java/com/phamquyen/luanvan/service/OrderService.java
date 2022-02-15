package com.phamquyen.luanvan.service;

import com.phamquyen.luanvan.domain.Order;
import com.phamquyen.luanvan.dto.OrderRequest;

public interface OrderService {
    Order createOrder(OrderRequest orderRequest);
}
