package com.example.springboot.service;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;
import com.example.springboot.entity.Electric;

public interface ElectricService extends IService<Electric> {


    //新增订单
    int addNewOrder(Electric electric);

    //查询
    Page find(Integer pageNum, Integer pageSize, String search, String date1, String date2, Integer dormRoomId);

    //查询
    Page individualFind(Integer pageNum, Integer pageSize, String search, String name);


    //删除订单
    int deleteOrder(Integer id);
}
