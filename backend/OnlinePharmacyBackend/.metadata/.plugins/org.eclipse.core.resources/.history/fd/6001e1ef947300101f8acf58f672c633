package com.excelR.OnlinePharmacyApplication.controller;

import com.excelR.OnlinePharmacyApplication.entity.Order;
import com.excelR.OnlinePharmacyApplication.dto.OrderResponseDto;
import com.excelR.OnlinePharmacyApplication.service.OrderService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@PreAuthorize("hasRole('USER')")
public class DrugOrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping("/place")
    public OrderResponseDto placeOrder(@RequestBody Order order) {
        return orderService.placeOrder(order);
    }

    @GetMapping("/user/{userId}")
    public List<Order> getUserOrders(@PathVariable Long userId) {
        return orderService.getOrdersByUser(userId);
    }
}
