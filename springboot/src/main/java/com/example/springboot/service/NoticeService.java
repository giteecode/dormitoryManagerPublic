package com.example.springboot.service;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;
import com.example.springboot.entity.Notice;

import java.util.List;


public interface NoticeService extends IService<Notice> {


    //新增通知
    int addNewNotice(Notice notice);

    //查询
    Page find(Integer pageNum, Integer pageSize, String search);

    //更新通知信息
    int updateNewNotice(Notice notice);

    //删除通知
    int deleteNotice(Integer id);

    // 首页通知展示
    List<?> homePageNotice();
}
