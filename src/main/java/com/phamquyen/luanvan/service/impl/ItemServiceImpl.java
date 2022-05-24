package com.phamquyen.luanvan.service.impl;

import com.phamquyen.luanvan.domain.Item;
import com.phamquyen.luanvan.domain.Product;
import com.phamquyen.luanvan.dto.ItemRequest;
import com.phamquyen.luanvan.repository.ItemRepository;
import com.phamquyen.luanvan.service.ItemService;
import com.phamquyen.luanvan.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ItemServiceImpl implements ItemService {

    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private ProductService productService;


    @Override
    public List<Item> addItems(List<ItemRequest> itemRequests) {

        List<Item> items = new ArrayList<>();
        for (ItemRequest itemRequest : itemRequests) {
            Item item = new Item();
            item.setPrice(itemRequest.getPrice());
            item.setProduct(productService.findById(itemRequest.getProductId()));
            item.setQuantity(itemRequest.getQuantity());
            productService.updateQuantityProduct(item.getProduct(), item.getQuantity());
            items.add(item);
        }
        return items;
    }

    @Override
    public List<Product> getTopSaleProducts(){
        List<Product> products = productService.findAll();
        List<Item> items = itemRepository.findAll();
        Map<Product, Integer> productInteger = items.stream()
                .collect(Collectors.groupingBy(Item::getProduct,
                        Collectors.summingInt(Item::getQuantity)));
        Map<Product, Integer> productIntegerMap = new LinkedHashMap<>();
        productInteger.entrySet().stream().sorted(Map.Entry.<Product, Integer>comparingByValue().reversed()).forEachOrdered(i -> productIntegerMap.put(i.getKey(), i.getValue()));
        System.out.println(productIntegerMap);
        List<Product> productList = new ArrayList<>(productIntegerMap.keySet());
        if(productList.isEmpty()) productList = products;
        else {
            List<Long> productIds = new ArrayList<>();

            for (Product product : productList) {
                productIds.add(product.getProductId());
            }
            if (productList.size() < 5)
                for (Product product : products) {
                    for (Long id : productIds) {
                        if (product.getProductId() != id) {
                            System.out.println(product);
                            productList.add(product);
                            break;
                        }
                    }
                }
        }
        return productList.subList(0, products.size() >= 5 ? 5 : products.size());
    }

}
