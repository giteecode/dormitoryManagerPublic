package com.example.springboot.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 系统管理员
 */

@Data
@AllArgsConstructor
@NoArgsConstructor

@TableName(value = "admin")
public class Admin {

    @TableId(value = "username")
    private String username;
    @TableField(value = "password")
    private String password;
    @TableField(value = "name")
    private String name;
    @TableField(value = "gender")
    private String gender;
    @TableField(value = "age")
    private int age;
    @TableField(value = "phone_num")
    private String phoneNum;
    @TableField(value = "email")
    private String email;
    @TableField("avatar")
    private String avatar;
}
