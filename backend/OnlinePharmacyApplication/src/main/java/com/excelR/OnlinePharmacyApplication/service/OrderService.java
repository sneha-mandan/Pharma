package com.excelR.OnlinePharmacyApplication.service;

import com.excelR.OnlinePharmacyApplication.dto.OrderResponseDto;
import com.excelR.OnlinePharmacyApplication.entity.*;
import com.excelR.OnlinePharmacyApplication.repository.*;
import com.excelR.OnlinePharmacyApplication.exception.CustomExceptions.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {

    @Autowired private OrderRepository orderRepository;
    @Autowired private DrugRepository drugRepository;
    @Autowired private CartService cartService;
    @Autowired private UserRepository userRepository;

    public OrderResponseDto placeOrder(Order order) {
        User user = userRepository.findById(order.getUser().getId())
                .orElseThrow(() -> new UserNotFoundException("User not found"));
        order.setUser(user);

        double total = 0;
        for (OrderItem item : order.getItems()) {
            Drug drug = drugRepository.findById(item.getDrug().getId())
                    .orElseThrow(() -> new DrugNotFoundException("Drug not found with id: " + item.getDrug().getId()));
            item.setDrug(drug);

            if (drug.getQuantity() == 0 || item.getQuantity() > drug.getQuantity()) {
                throw new DrugOutOfStockException("Not enough stock for: " + drug.getName());
            }

            drug.setQuantity(drug.getQuantity() - item.getQuantity());
            item.setPrice(drug.getPrice() * item.getQuantity());
            total += item.getPrice();
            drugRepository.save(drug);
        }

        order.setTotalPrice(total);
        Order savedOrder = orderRepository.save(order);
        cartService.clearCartByUserId(order.getUser().getId());

        OrderResponseDto response = new OrderResponseDto();
        response.setId(savedOrder.getId());
        response.setUser(user);
        response.setTotalPrice(savedOrder.getTotalPrice());
        response.setOrderDate(savedOrder.getOrderDate());
        response.setItems(savedOrder.getItems());

        return response;
    }

    public List<Order> getOrdersByUser(Long userId) {
        return orderRepository.findByUserId(userId);
    }
}
