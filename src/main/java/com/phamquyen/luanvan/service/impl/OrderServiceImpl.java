package com.phamquyen.luanvan.service.impl;

import com.phamquyen.luanvan.domain.Item;
import com.phamquyen.luanvan.domain.Order;
import com.phamquyen.luanvan.domain.Users;
import com.phamquyen.luanvan.dto.OrderRequest;
import com.phamquyen.luanvan.repository.OrderRepository;
import com.phamquyen.luanvan.service.ItemService;
import com.phamquyen.luanvan.service.OrderService;
import com.phamquyen.luanvan.service.ProductService;
import com.phamquyen.luanvan.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private ProductService productService;

    @Autowired
    private ItemService itemService;

    @Override
    public Order createOrder(OrderRequest orderRequest){
        Order order = new Order();

        order.setCreateAt(LocalDateTime.now());
        order.setOrderAddress(orderRequest.getOrderAddress());
        order.setNote(orderRequest.getOrderNote());

        Users users = userService.getUserAuthenticate();
        order.setUser(users);

        List<Item> items = itemService.addItems(orderRequest.getItemRequests());
        order.setItems(items);

        orderRepository.save(order);
        return order;
    }

}
