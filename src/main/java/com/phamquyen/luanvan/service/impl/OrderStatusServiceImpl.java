package com.phamquyen.luanvan.service.impl;

import com.phamquyen.luanvan.domain.OrderStatus;
import com.phamquyen.luanvan.enumeration.EStatus;
import com.phamquyen.luanvan.repository.OrderStatusRepository;
import com.phamquyen.luanvan.service.OrderStatusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderStatusServiceImpl implements OrderStatusService {

    @Autowired
    private OrderStatusRepository orderStatusRepository;

    @Override
    public OrderStatus getByOrderStatusName(EStatus status){

        return orderStatusRepository.findByStatusName(status)
                .orElseThrow(()-> new IllegalStateException("Order Status not exist"));
    }
    @Override
    public List<OrderStatus> findAll(){
        return orderStatusRepository.findAll();
    }
}
