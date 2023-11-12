package com.example.springboot.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.springboot.entity.Repair;
import com.example.springboot.mapper.RepairMapper;
import com.example.springboot.service.RepairService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;


@Service
public class RepairServiceImpl extends ServiceImpl<RepairMapper, Repair> implements RepairService {

    /**
     * 注入DAO层对象
     */
    @Resource
    private RepairMapper repairMapper;

    /**
     * 添加订单
     */
    @Override
    public int addNewOrder(Repair repair) {
        int insert = repairMapper.insert(repair);
        return insert;
    }

    /**
     * 查找订单
     */
    @Override
    public Page find(Integer pageNum, Integer pageSize, String search) {
        Page page = new Page<>(pageNum, pageSize);
        QueryWrapper<Repair> qw = new QueryWrapper<>();
        qw.like("title", search);
        Page orderPage = repairMapper.selectPage(page, qw);
        return orderPage;
    }

    @Override
    public Page individualFind(Integer pageNum, Integer pageSize, String search, String name) {
        Page page = new Page<>(pageNum, pageSize);
        QueryWrapper<Repair> qw = new QueryWrapper<>();
        qw.like("title", search);
        qw.eq("repairer", name);
        Page orderPage = repairMapper.selectPage(page, qw);
        return orderPage;
    }

    /**
     * 更新订单
     */
    @Override
    public int updateNewOrder(Repair repair) {
        int i = repairMapper.updateById(repair);
        return i;
    }

    /**
     * 删除订单
     */
    @Override
    public int deleteOrder(Integer id) {
        int i = repairMapper.deleteById(id);
        return i;
    }

    /**
     * 首页顶部：报修统计
     */
    @Override
    public int showOrderNum() {
        QueryWrapper<Repair> qw = new QueryWrapper<>();
        int orderCount = Math.toIntExact(repairMapper.selectCount(qw));
        return orderCount;
    }
}
