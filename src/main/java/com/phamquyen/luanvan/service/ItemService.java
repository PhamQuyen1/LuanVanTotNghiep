package com.phamquyen.luanvan.service;

import com.phamquyen.luanvan.domain.Item;
import com.phamquyen.luanvan.domain.Product;
import com.phamquyen.luanvan.dto.ItemRequest;

import java.util.List;

public interface ItemService {
    List<Item> addItems(List<ItemRequest> itemRequests);

    List<Product> getTopSaleProducts();
}
