package com.example.springboot.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 访客
 */

@Data
@AllArgsConstructor
@NoArgsConstructor

@TableName(value = "visitor")
public class Visitor {

    @TableId(value = "id", type = IdType.AUTO)
    private Integer id;
    @TableField("name")
    private String visitorName;
    @TableField("gender")
    private String gender;
    @TableField("phone_num")
    private String phoneNum;
    @TableField("origin_city")
    private String originCity;
    @TableField("visit_time")
    private String visitTime;
    @TableField("content")
    private String content;

}
