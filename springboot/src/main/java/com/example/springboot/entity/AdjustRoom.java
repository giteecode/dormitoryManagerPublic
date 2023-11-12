package com.example.springboot.entity;


import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdjustRoom {

    @TableId(value = "id", type = IdType.AUTO)
    private Integer id;
    @TableField(value = "username")
    private String username;
    @TableField(value = "name")
    private String name;
    @TableField(value = "currentroom_id")
    private int currentRoomId;
    @TableField(value = "currentbed_id")
    private int currentBedId;
    @TableField(value = "towardsroom_id")
    private int towardsRoomId;
    @TableField(value = "towardsbed_id")
    private int towardsBedId;
    @TableField("state")
    private String state;
    @TableField("apply_time")
    private String applyTime;
    @TableField("finish_time")
    private String finishTime;
}
