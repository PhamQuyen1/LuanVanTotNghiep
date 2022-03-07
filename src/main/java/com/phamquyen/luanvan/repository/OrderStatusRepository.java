package com.phamquyen.luanvan.repository;

import com.phamquyen.luanvan.domain.OrderStatus;
import com.phamquyen.luanvan.enumeration.EStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface OrderStatusRepository extends JpaRepository<OrderStatus, Long> {

//    Optional<OrderStatus> findByStatusName(String statusName);
    Optional<OrderStatus> findByStatusName(EStatus status);
}
