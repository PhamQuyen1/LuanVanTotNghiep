package com.phamquyen.luanvan.service.impl;

import com.phamquyen.luanvan.domain.Item;
import com.phamquyen.luanvan.dto.ItemRequest;
import com.phamquyen.luanvan.repository.ItemRepository;
import com.phamquyen.luanvan.service.ItemService;
import com.phamquyen.luanvan.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ItemServiceImpl implements ItemService {

    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private ProductService productService;

    @Override
    public List<Item> addItems(List<ItemRequest> itemRequests){

        List<Item> items = new ArrayList<>();
        for (ItemRequest itemRequest : itemRequests) {
            Item item = new Item();
            item.setPrice(itemRequest.getPrice());
            item.setProduct(productService.findById(itemRequest.getProductId()));
            item.setQuantity(itemRequest.getQuantity());
            items.add(item);
        }
        return items;
    }
}
