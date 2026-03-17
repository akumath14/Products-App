package com.code.products_backend.service;

import com.code.products_backend.entity.Product;
import com.code.products_backend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Product addProduct(String name) {
        Product product = new Product(name);
        return productRepository.save(product);
    }
}
