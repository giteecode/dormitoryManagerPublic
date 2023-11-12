package com.example.springboot.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 报修单
 */
@Data
@AllArgsConstructor
@NoArgsConstructor

@TableName(value = "dorm_check")
public class Check {

    @TableId(value = "id")
    private int id;
    @TableField("operatorName")
    private String operatorName;
    @TableField("roomid")
    private int roomid;
    @TableField("grade")
    private String grade;
    @TableField("reason")
    private String reason;
    @TableField("date")
    private String date;

}
