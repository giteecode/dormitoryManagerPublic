package com.example.springboot.service;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;
import com.example.springboot.entity.DormBuild;

import java.util.List;


public interface DormBuildService extends IService<DormBuild> {

    //新增楼宇
    int addNewBuilding(DormBuild dormBuild);

    //查询楼宇
    Page find(Integer pageNum, Integer pageSize, String search);

    //更新楼宇信息
    int updateNewBuilding(DormBuild dormBuild);

    //删除楼宇信息
    int deleteBuilding(Integer id);

    List<DormBuild> getBuildingId();
}
