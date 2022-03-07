package com.phamquyen.luanvan.service;

import com.phamquyen.luanvan.domain.OrderStatus;
import com.phamquyen.luanvan.enumeration.EStatus;

import java.util.List;

public interface OrderStatusService {
    OrderStatus getByOrderStatusName(EStatus status);

    List<OrderStatus> findAll();
}
