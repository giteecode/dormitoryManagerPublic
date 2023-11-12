package com.example.springboot.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.springboot.entity.Notice;
import com.example.springboot.mapper.NoticeMapper;
import com.example.springboot.service.NoticeService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;


@Service
public class NoticeServiceImpl extends ServiceImpl<NoticeMapper, Notice> implements NoticeService {


    /**
     * 注入DAO层对象
     */
    @Resource
    private NoticeMapper noticeMapper;

    /**
     * 公告添加
     */
    @Override
    public int addNewNotice(Notice notice) {
        int insert = noticeMapper.insert(notice);
        return insert;
    }

    /**
     * 公告查找
     */
    @Override
    public Page find(Integer pageNum, Integer pageSize, String search) {
        Page page = new Page<>(pageNum, pageSize);
        QueryWrapper<Notice> qw = new QueryWrapper<>();
        qw.like("title", search);
        Page noticePage = noticeMapper.selectPage(page, qw);
        return noticePage;
    }

    /**
     * 公告更新
     */
    @Override
    public int updateNewNotice(Notice notice) {
        int i = noticeMapper.updateById(notice);
        return i;
    }

    /**
     * 公告删除
     */
    @Override
    public int deleteNotice(Integer id) {
        int i = noticeMapper.deleteById(id);
        return i;
    }

    /**
     * 首页公告展示
     */
    @Override
    public List<?> homePageNotice() {
        QueryWrapper<Notice> qw = new QueryWrapper<>();
        qw.orderByDesc("release_time");
        List<Notice> noticeList = noticeMapper.selectList(qw);
        return noticeList;
    }
}
