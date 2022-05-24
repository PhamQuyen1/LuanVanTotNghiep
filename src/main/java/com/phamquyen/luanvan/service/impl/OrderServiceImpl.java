package com.phamquyen.luanvan.service.impl;

import com.phamquyen.luanvan.domain.*;
import com.phamquyen.luanvan.dto.OrderReport;
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

import java.text.DecimalFormat;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
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
    private EmailService emailService;

    @Autowired
    private PaymentMethodService paymentMethodService;

    @Override
    public Order createOrder(OrderRequest orderRequest) {
        Order order = new Order();

        order.setCreateAt(LocalDateTime.now());
        order.setOrderAddress(orderRequest.getOrderAddress());
        order.setNote(orderRequest.getOrderNote());


        Users users = userService.getUserAuthenticate();
        order.setUser(users);

        OrderStatus orderStatus = orderStatusService.getByOrderStatusName(EStatus.PROCESSING);
        order.setOrderStatus(orderStatus);

        EPaymentMethod ePaymentMethod = EPaymentMethod.valueOf(orderRequest.getPaymentMethod());
        PaymentMethod paymentMethod = paymentMethodService.findByPaymentName(ePaymentMethod);
        order.setPaymentMethod(paymentMethod);
        List<Item> items = itemService.addItems(orderRequest.getItemRequests());
        order.setItems(items);

        order = orderRepository.save(order);
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

        String formatDateTime = order.getCreateAt().format(formatter);
        String content = "<table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" class=\"backgroundTable main-temp\" style=\"background-color: #d5d5d5;\">\n" +
                "            <tbody>\n" +
                "                <tr>\n" +
                "                    <td>\n" +
                "                        <table width=\"600\" align=\"center\" cellpadding=\"15\" cellspacing=\"0\" border=\"0\" class=\"devicewidth\" style=\"background-color: #ffffff;\">\n" +
                "                            <tbody>\n" +
                "                                <!-- Start header Section -->\n" +
                "                                <tr>\n" +
                "                                    <td style=\"padding-top: 30px;\">\n" +
                "                                        <table width=\"560\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" class=\"devicewidthinner\" style=\"border-bottom: 1px solid #eeeeee; text-align: center;\">\n" +
                "                                            <tbody>\n" +
                "                                                <tr>\n" +
                "                                                    <td style=\"padding-bottom: 10px;\">\n" +
                "                                                        <a href=\"https://localhost:3000\"><img src=\"https://drive.google.com/uc?export=view&id=1vTFz62UdQOQdyjTGYVDYUY9lIdsfMFzG\" alt=\"PapaChina\" /></a>\n" +
                "                                                    </td>\n" +
                "                                                </tr>\n" +
                "                                                <tr>\n" +
                "                                                    <td style=\"font-size: 14px; line-height: 18px; color: #666666;\">\n" +
                "                                                        Can Tho University\n" +
                "                                                    </td>\n" +
                "                                                </tr>\n" +
                "                                                <tr>\n" +
                "                                                    <td style=\"font-size: 14px; line-height: 18px; color: #666666;\">\n" +
                "                                                        Cần Thơ, Việt Nam\n" +
                "                                                    </td>\n" +
                "                                                </tr>\n" +
                "                                                <tr>\n" +
                "                                                    <td style=\"font-size: 14px; line-height: 18px; color: #666666;\">\n" +
                "                                                        Phone: 310-807-6672 | Email: info@example.com\n" +
                "                                                    </td>\n" +
                "                                                </tr>\n" +
                "                                                <tr>\n" +
                "                                                    <td style=\"font-size: 14px; line-height: 18px; color: #666666; padding-bottom: 25px;\">\n" +
                "                                                        <strong>Mã đơn hàng:</strong> " + order.getOrderId() + " | <strong>Ngày đặt hàng:</strong> " + formatDateTime + "\n" +
                "                                                    </td>\n" +
                "                                                </tr>\n" +
                "                                            </tbody>\n" +
                "                                        </table>\n" +
                "                                    </td>\n" +
                "                                </tr>\n" +
                "                                \n" +
                "                                \n" +
                "                                \n" +
                "                                \n" +
                "                                \n";

        String pattern = "###,###.###";
        DecimalFormat decimalFormat = new DecimalFormat(pattern);
        String orderTotal = decimalFormat.format(order.getItems().stream().mapToInt(i -> i.getQuantity() * i.getPrice()).sum());
        for (Item item : order.getItems()) {

            String price = decimalFormat.format(item.getPrice());

            String totalPrice = decimalFormat.format(item.getPrice() * item.getQuantity());
            content += "<tr>\n" +
                    "                                    <td style=\"padding-top: 0;\">\n" +
                    "                                        <table width=\"560\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" class=\"devicewidthinner\" style=\"border-bottom: 1px solid #eeeeee;\">\n" +
                    "                                            <tbody>\n" +
                    "                                                <tr>\n" +
                    "                                                    \n" +
                    "                                                    <td style=\"font-size: 14px; font-weight: bold; color: #666666; padding-bottom: 5px;\">\n" +
                    "                                                        " + item.getProduct().getProductName() + "\n" +
                    "                                                    </td>\n" +
                    "                                                    <td style=\"font-size: 14px; line-height: 18px; color: #757575; text-align: right;\">\n" +
                    "                                                        " + price + " \n" +
                    "                                                    </td>\n" +
                    "                                                </tr>\n" +
                    "                                                <tr>\n" +
                    "                                                    <td style=\"font-size: 14px; line-height: 18px; color: #757575; width: 440px;\">\n" +
                    "                                                        Quantity: " + item.getQuantity() + " kg\n" +
                    "                                                    </td>\n" +
                    "                                                    <td style=\"font-size: 14px; line-height: 18px; color: #757575; text-align: right; padding-bottom: 10px;\">\n" +
                    "                                                        <b style=\"color: #666666;\">" + totalPrice + " đ</b> Tổng\n" +
                    "                                                    </td>\n" +
                    "                                                </tr>\n" +

                    "                                            </tbody>\n" +
                    "                                        </table>\n" +
                    "                                    </td>\n" +
                    "                                </tr>";
        }
        content += "<tr>\n" +
                "                                    <td style=\"padding-top: 0;\">\n" +
                "                                        <table width=\"560\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" class=\"devicewidthinner\" style=\"border-bottom: 1px solid #bbbbbb; margin-top: -5px;\">\n" +
                "                                            <tbody>\n" +
                "                                                <tr>\n" +
                "                                                    <td rowspan=\"5\" style=\"width: 55%;\"></td>\n" +
                "                                                    <td style=\"font-size: 14px; line-height: 18px; color: #757575;\">\n" +
                "                                                        <strong>Tổng đơn hàng:</strong>\n" +
                "                                                    </td>\n" +
                "                                                    <td style=\"font-size: 14px; line-height: 18px; color: #666666; width: 130px; text-align: right;\">\n" +
                "                                                        " + orderTotal + " đ\n" +
                "                                                    </td>\n" +
                "                                                </tr>\n" +
                "                                                \n" +
                "                                            </tbody>\n" +
                "                                        </table>\n" +
                "                                    </td>\n" +
                "                                </tr>\n" +
                "\t\t\t\t\t\t\t\t<tr>\n" +
                "                                    <td style=\"padding-top: 0;\">\n" +
                "                                        <table width=\"560\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" class=\"devicewidthinner\" style=\"border-bottom: 1px solid #bbbbbb;\">\n" +
                "                                            <tbody>\n" +
                "                                                <tr>\n" +
                "                                                    <td style=\"width: 55%; font-size: 16px; font-weight: bold; color: #666666; padding-bottom: 5px;\">\n" +
                "                                                        Địa chỉ giao hàng: \n" +
                "                                                    </td>\n" +
                "\t\t\t\t\t\t\t\t\t\t\t\t\t<td style=\"width: 55%; font-size: 14px; line-height: 18px; color: #666666;\">\n" +
                "                                                        " + order.getOrderAddress() + "\n" +
                "                                                    </td>\n" +
                "                                                    \n" +
                "                                                </tr>\n" +
                "                                                \n" +
                "                                                \n" +
                "                                            </tbody>\n" +
                "                                        </table>\n" +
                "                                    </td>\n" +
                "                                </tr>\n" +
                "                                \n" +
                "                                <tr>\n" +
                "                                    <td >\n" +
                "                                        <table width=\"560\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" class=\"devicewidthinner\">\n" +
                "                                            <tbody>\n" +
                "                                                \n" +
                "                                                <tr>\n" +
                "                                                    <td colspan=\"2\" style=\"width: 100%; text-align: center; font-style: italic; font-size: 13px; font-weight: 600; color: #666666;\">\n" +
                "                                                        <b style=\"font-size: 14px;\"></b> Cảm ơn quý khách đã tin dùng sản phẩm của chúng tôi\n" +
                "                                                    </td>\n" +
                "                                                </tr>\n" +
                "                                            </tbody>\n" +
                "                                        </table>\n" +
                "                                    </td>\n" +
                "                                </tr>\n" +
                "                                \n" +
                "                            </tbody>\n" +
                "                        </table>\n" +
                "                    </td>\n" +
                "                </tr>\n" +
                "            </tbody>\n" +
                "        </table>";
        emailService.sendMail(order.getUser().getEmail(), "Xác nhận đơn hàng", content);
        return order;
    }

    @Override
    public boolean checkUserBuyProduct(Long productId) {
        System.out.println(productId);
        Users users = userService.getUserAuthenticate();
        List<Order> orders = orderRepository.findByUser(users);

        System.out.println(orders);
        boolean check = false;
        if (orders.size() > 0) {
            for (Order order : orders) {
                List<Item> items = order.getItems();
                check = items.stream().anyMatch(item -> item.getProduct().getProductId() == productId);
                System.out.println(check);
                if (check) {

                    break;
                }

            }
        }

        return check;
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
    public Map<String, Object> listAll(String email, String status, String paymentMethod, String sortField, String sortDir, int page, int size) {
        Sort sort = Sort.by(sortField);
//        if (sortDir.equals("asc")) {
//            sort.ascending();
//        } else {
//            sort.descending();
//        }
        sort = sortDir.equals("asc") ? sort.ascending() : sort.descending();
        Pageable pageable = PageRequest.of(page - 1, size, sort);
        List<Users> users = new ArrayList<>();
        List<OrderStatus> orderStatuses = new ArrayList<>();
        List<PaymentMethod> payments = new ArrayList<>();
        System.out.println(status + paymentMethod);
        if (email != null) {
            users = userService.findAllByEmail(email);
        } else {
            users = userService.findAll();
        }
        if (status.length() != 0) {
            EStatus eStatus = EStatus.valueOf(status);
            OrderStatus orderStatus = orderStatusService.getByOrderStatusName(eStatus);
            orderStatuses.add(orderStatus);
        } else {
            orderStatuses = orderStatusService.findAll();
        }
        System.out.println(orderStatuses);
        if (paymentMethod.length() != 0) {
            EPaymentMethod ePaymentMethod = EPaymentMethod.valueOf(paymentMethod);
            PaymentMethod payment = paymentMethodService.findByPaymentName(ePaymentMethod);
            payments.add(payment);
        } else {
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
        result.put("orders", orderPage.getContent());
        result.put("currentPage", page);
        result.put("totalPage", orderPage.getTotalPages());
        result.put("totalItem", orderPage.getTotalElements());
        return result;
    }

    @Override
    public Map<String, List<OrderReport>> orderReport(String label) {
        Map<String, List<OrderReport>> result = new HashMap<>();
        LocalDateTime date = LocalDateTime.now(ZoneId.systemDefault());
        LocalDateTime date1 = date.plusDays(1L);
        LocalDateTime date2 = date.plusMonths(1L);
        System.out.println(date);
//      TODO: report 10 days
        List<OrderReport> orderReports = new ArrayList<>();
        for (int j = 0; j < 10; j++) {


            date1 = date1.minusDays(1L);
            LocalDateTime startDate = date1.withMinute(0).withHour(0).withSecond(0).withNano(0);
            LocalDateTime endDate = startDate.plusDays(1L).minusNanos(1);
            List<Order> byCreateAt = orderRepository.findByCreateAtBetween(startDate, endDate);
            int sum = 0;
            for (Order order : byCreateAt) {
                sum += order.getItems().stream().mapToInt(i -> i.getQuantity() * i.getPrice()).sum();
            }
            System.out.println(startDate);
            System.out.println(endDate);
            System.out.println(sum);
            System.out.println(byCreateAt);
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
            String formatDateTime = date1.format(formatter);
            orderReports.add(new OrderReport(formatDateTime, sum));

        }
//      TODO: report 12 months

        List<OrderReport> orderReportMonths = new ArrayList<>();
        for (int j = 0; j < 12; j++) {


            date2 = date2.minusMonths(1L);
            int month = date2.getMonthValue();
            LocalDateTime startDate = LocalDateTime.of(date2.getYear(), date2.getMonth(), 1, 1, 1);
            startDate = date2.withDayOfMonth(1).withHour(0).withMinute(0).withSecond(0).withNano(0);
            LocalDateTime endDate = startDate.plusMonths(1L).minusNanos(1);
            List<Order> byCreateAtMonths = orderRepository.findByCreateAtBetween(startDate, endDate);
            int sum = 0;
            for (Order order : byCreateAtMonths) {
                sum += order.getItems().stream().mapToInt(i -> i.getQuantity() * i.getPrice()).sum();
            }

            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM");
            String formatDateTime = date2.format(formatter);
            orderReportMonths.add(new OrderReport(formatDateTime, sum));

        }
        result.put("days", orderReports);
        result.put("months", orderReportMonths);
        return result;
    }

    @Override
    public Map<String, Long> countOrder1Month() {
        Map<String, Long> map = new HashMap<>();
        LocalDateTime date = LocalDateTime.now(ZoneId.systemDefault());
        LocalDateTime startDate = date.withDayOfMonth(1);
        LocalDateTime endDate = date.plusMonths(1L).minusDays(1l);
        List<Order> byCreateAtMonths = orderRepository.findByCreateAtBetween(startDate, endDate);
        int sum = 0;
        for (Order order : byCreateAtMonths) {
            sum += order.getItems().stream().mapToInt(i -> i.getQuantity() * i.getPrice()).sum();
        }
        map.put("orderOneMonth", Long.valueOf(byCreateAtMonths.size()));
        map.put("amountOrderOneMonth", Long.valueOf(sum));
        return map;
    }

    @Override
    public long countOrder() {
        return orderRepository.count();
    }

}
