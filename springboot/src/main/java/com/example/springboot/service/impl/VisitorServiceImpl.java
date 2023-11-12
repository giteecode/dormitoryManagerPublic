package com.example.springboot.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.springboot.entity.Visitor;
import com.example.springboot.mapper.VisitorMapper;
import com.example.springboot.service.VisitorService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;


@Service
public class VisitorServiceImpl extends ServiceImpl<VisitorMapper, Visitor> implements VisitorService {

    @Resource
    private VisitorMapper visitorMapper;

    /**
     * 访客添加
     */
    @Override
    public int addNewVisitor(Visitor visitor) {
        int insert = visitorMapper.insert(visitor);
        return insert;
    }

    /**
     * 访客查询
     */
    @Override
    public Page find(Integer pageNum, Integer pageSize, String search) {
        Page page = new Page<>(pageNum, pageSize);
        QueryWrapper<Visitor> qw = new QueryWrapper<>();
        qw.like("name", search);
        Page visitorPage = visitorMapper.selectPage(page, qw);
        return visitorPage;
    }

    /**
     * 访客信息更新
     */
    @Override
    public int updateNewVisitor(Visitor visitor) {
        int i = visitorMapper.updateById(visitor);
        return i;
    }

    /**
     * 访客删除
     */
    @Override
    public int deleteVisitor(Integer id) {
        int i = visitorMapper.deleteById(id);
        return i;
    }
}
