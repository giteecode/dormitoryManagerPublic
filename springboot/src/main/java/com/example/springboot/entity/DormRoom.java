package com.example.springboot.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 宿舍房间
 */
@Data
@AllArgsConstructor
@NoArgsConstructor

@TableName(value = "dorm_room")
public class DormRoom {

    @TableId(value = "dormroom_id")
    private Integer dormRoomId;
    @TableField("dormbuild_id")
    private int dormBuildId;
    @TableField("floor_num")
    private int floorNum;
    @TableField("max_capacity")
    private int maxCapacity;
    @TableField("current_capacity")
    private int currentCapacity;
    @TableField("first_bed")
    private String firstBed;
    @TableField("second_bed")
    private String secondBed;
    @TableField("third_bed")
    private String thirdBed;
    @TableField("fourth_bed")
    private String fourthBed;

}
