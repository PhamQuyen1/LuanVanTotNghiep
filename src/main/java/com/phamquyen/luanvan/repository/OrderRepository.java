package com.phamquyen.luanvan.repository;

import com.phamquyen.luanvan.domain.Order;
import com.phamquyen.luanvan.domain.OrderStatus;
import com.phamquyen.luanvan.domain.PaymentMethod;
import com.phamquyen.luanvan.domain.Users;
import com.phamquyen.luanvan.enumeration.EPaymentMethod;
import com.phamquyen.luanvan.enumeration.EStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    //    @Query("SELECT o FROM Order o " +
//            "where CONCAT(o.user.fullname, ' ',o.orderStatus.statusName ,' ',o.paymentMethod.paymentMethod)" +
//            " LIKE %:keyword%")
    Page<Order> findAllByUserInAndOrderStatusInAndPaymentMethodIn(
            List<Users> user,
            List<OrderStatus> orderStatus,
            List<PaymentMethod> paymentMethod,
            Pageable pageable);

    @Query("SELECT o FROM Order o " +
            "where o.user.fullname LIKE %:fullname% OR o.orderStatus.statusId = :status OR o.paymentMethod.methodId " +
            " = :paymentMethod")
    Page<Order> findWithKeyword(String fullname, Long status, Long paymentMethod, Pageable pageable);

//    @Query("SELECT o FROM Order o " +
//            "where :keyword")
//    Page<Order> findWithKeyword1(String keyword, Pageable pageable);
}
