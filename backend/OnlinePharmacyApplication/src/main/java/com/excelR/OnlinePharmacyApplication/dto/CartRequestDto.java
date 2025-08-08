package com.excelR.OnlinePharmacyApplication.dto;

public class CartRequestDto {
    private Long userId;
    private Long drugId;
    private int quantity;

    public CartRequestDto() {}

    public CartRequestDto(Long userId, Long drugId, int quantity) {
        this.userId = userId;
        this.drugId = drugId;
        this.quantity = quantity;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getDrugId() {
        return drugId;
    }

    public void setDrugId(Long drugId) {
        this.drugId = drugId;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}
