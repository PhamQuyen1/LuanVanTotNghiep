package com.phamquyen.luanvan.service.impl;

import com.phamquyen.luanvan.domain.*;
import com.phamquyen.luanvan.dto.OrderRequest;
import com.phamquyen.luanvan.enumeration.EPaymentMethod;
import com.phamquyen.luanvan.enumeration.EStatus;
import com.phamquyen.luanvan.repository.OrderRepository;
import com.phamquyen.luanvan.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

    @Autowired
    private OrderStatusService orderStatusService;

    @Autowired
    private PaymentMethodService paymentMethodService;

    @Override
    public Order createOrder(OrderRequest orderRequest) {
        Order order = new Order();

        order.setCreateAt(LocalDateTime.now());
        order.setOrderAddress(orderRequest.getOrderAddress());
        order.setNote(orderRequest.getOrderNote());
        order.setShippingFee(orderRequest.getShippingFee());

        Users users = userService.getUserAuthenticate();
        order.setUser(users);

        OrderStatus orderStatus = orderStatusService.getByOrderStatusName(EStatus.PROCESSING);
        order.setOrderStatus(orderStatus);

        EPaymentMethod ePaymentMethod = EPaymentMethod.valueOf(orderRequest.getPaymentMethod());
        PaymentMethod paymentMethod = paymentMethodService.findByPaymentName(ePaymentMethod);
        order.setPaymentMethod(paymentMethod);
        List<Item> items = itemService.addItems(orderRequest.getItemRequests());
        order.setItems(items);

        orderRepository.save(order);
        return order;
    }

    @Override
    public void updateOrderStatus(Long orderId, String status) {

        try {
            EStatus eStatus = EStatus.valueOf(status);
            OrderStatus orderStatus = orderStatusService.getByOrderStatusName(eStatus);
            Order order = orderRepository.findById(orderId)
                    .orElseThrow(() -> new IllegalStateException("Order khong ton tai"));

            System.out.println(eStatus + " " + orderStatus + "" + order.getOrderStatus().getStatusName());
            System.out.println(order.getOrderStatus().getStatusName().equals(eStatus));

//          TODO: modified quantity of product when change order status
            if (!order.getOrderStatus().getStatusName().equals(eStatus)) {
                if (eStatus.equals(EStatus.CANCELED)) {
                    for (Item item : order.getItems()) {
                        System.out.println(item);
                        productService.updateQuantityProduct(item.getProduct(), -item.getQuantity());
                    }
                }
                if ((eStatus.equals(EStatus.PROCESSING) ||
                        eStatus.equals(EStatus.COMPLETED) ||
                        eStatus.equals(EStatus.CONFIRMED) ||
                        eStatus.equals(EStatus.DELIVERY)) &&
                        order.getOrderStatus().getStatusName().equals(EStatus.CANCELED)) {
                    for (Item item : order.getItems()) {
                        productService.updateQuantityProduct(item.getProduct(), item.getQuantity());
                    }
                }
            }

//          TODO: set order status
            order.setOrderStatus(orderStatus);
            orderRepository.save(order);
        } catch (Exception e) {
            throw new IllegalStateException(e.getMessage());
        }
    }

    @Override
    public Order findOrderById(Long orderId) {
        return orderRepository.findById(orderId)
                .orElseThrow(() -> new IllegalStateException("Order khong ton tai"));
    }

    @Override
    public Map<String, Object> listAll(String email, String status, String paymentMethod, String sortDir, int page) {
        Sort sort = Sort.by("orderId");
//        if (sortDir.equals("asc")) {
//            sort.ascending();
//        } else {
//            sort.descending();
//        }
        sort = sortDir.equals("asc") ? sort.ascending() : sort.descending();
        Pageable pageable = PageRequest.of(page - 1, 10, sort);
        List<Users> users = new ArrayList<>();
        List<OrderStatus> orderStatuses = new ArrayList<>();
        List<PaymentMethod> payments = new ArrayList<>();

        if (email!= null){
            users = userService.findAllByEmail(email);
        }else {
            users = userService.findAll();
        }
        if(status != null){
            EStatus eStatus= EStatus.valueOf(status);
            OrderStatus orderStatus = orderStatusService.getByOrderStatusName(eStatus);
            orderStatuses.add(orderStatus);
        }else {
            orderStatuses = orderStatusService.findAll();
        }
        System.out.println(orderStatuses);
        if (paymentMethod != null){
            EPaymentMethod ePaymentMethod = EPaymentMethod.valueOf(paymentMethod);
            PaymentMethod payment = paymentMethodService.findByPaymentName(ePaymentMethod);
            payments.add(payment);
        }else {
            payments = paymentMethodService.findAll();
        }
        System.out.println(payments);
//        EStatus eStatus = EStatus.valueOf(status);
//        OrderStatus orderStatus = orderStatusService.getByOrderStatusName(eStatus);
//
//        EPaymentMethod ePaymentMethod = EPaymentMethod.valueOf(paymentMethod);
//        PaymentMethod payment = paymentMethodService.findByPaymentName(ePaymentMethod);
//        String keyword = "o.user.fullname LIKE %:" + fullname + "% "
//                + orderStatus != null ? "o.orderStatus.statusId = " + orderStatus.getStatusId() : " "
//                + " " + payment != null ? "o.paymentMethod.methodId = " + payment.getMethodId() : " ";
        Page<Order> orderPage = orderRepository.findAllByUserInAndOrderStatusInAndPaymentMethodIn(users, orderStatuses, payments, pageable);
//        Page<Order> orderPage = orderRepository.findWithKeyword(fullname, orderStatus.getStatusId(), payment.getMethodId(), pageable);
//        Page<Order> orderPage = orderRepository.findWithKeyword1(keyword, pageable);
        Map<String, Object> result = new HashMap<>();
        result.put("orders", orderPage);
        result.put("currentPage", page);
        result.put("totalPage", orderPage.getTotalPages());
        result.put("totalItem", orderPage.getTotalElements());
        return result;
    }

}
