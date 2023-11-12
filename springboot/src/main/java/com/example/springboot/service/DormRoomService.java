package com.example.springboot.service;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;
import com.example.springboot.entity.AdjustRoom;
import com.example.springboot.entity.DormRoom;


public interface DormRoomService extends IService<DormRoom> {
    //统计没有住满的宿舍数量
    public int notFullRoom();

    //新增房间
    int addNewRoom(DormRoom dormRoom);

    //查询房间
    Page find(Integer pageNum, Integer pageSize, String search);

    //更新房间信息
    int updateNewRoom(DormRoom dormRoom);

    //删除房间信息
    int deleteRoom(Integer dormRoomId);

    //删除床位上的学生信息
    int deleteBedInfo(String bedName, Integer dormRoomId, int calCurrentNum);

    //床位信息，查询该学生是否已有宿舍
    DormRoom judgeHadBed(String username);

    //主页 住宿人数
    Long selectHaveRoomStuNum();

    //获取每栋宿舍学生总人数
    Long getEachBuildingStuNum(int dormBuildId);

    //根据调宿申请 更新房间住宿信息
    int adjustRoomUpdate(AdjustRoom adjustRoom);

    // 检查该房间是否满了
    DormRoom checkRoomState(Integer dormRoomId);

    // 检查房间是否存在
    DormRoom checkRoomExist(Integer dormRoomId);

    // 检查床位是否有人
    DormRoom checkBedState(Integer dormRoomId, int bedNum);
}
