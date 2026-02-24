package com.example.productcrud.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;

@Entity
@Data
@AllArgsConstructor
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String description;
    private Double price;
    private String category;
    private Integer stockQuantity;

    public Product() {
    }

    // public Product(Long id, String name, String description, Double price, String
    // category, Integer stockQuantity) {
    // this.id = id;
    // this.name = name;
    // this.description = description;
    // this.price = price;
    // this.category = category;
    // this.stockQuantity = stockQuantity;
    // }

    // public Long getId() {
    // return id;
    // }

    // public void setId(Long id) {
    // this.id = id;
    // }

    // public String getName() {
    // return name;
    // }

    // public void setName(String name) {
    // this.name = name;
    // }

    // public String getDescription() {
    // return description;
    // }

    // public void setDescription(String description) {
    // this.description = description;
    // }

    // public Double getPrice() {
    // return price;
    // }

    // public void setPrice(Double price) {
    // this.price = price;
    // }

    // public String getCategory() {
    // return category;
    // }

    // public void setCategory(String category) {
    // this.category = category;
    // }

    // public Integer getStockQuantity() {
    // return stockQuantity;
    // }

    // public void setStockQuantity(Integer stockQuantity) {
    // this.stockQuantity = stockQuantity;
    // }
}
