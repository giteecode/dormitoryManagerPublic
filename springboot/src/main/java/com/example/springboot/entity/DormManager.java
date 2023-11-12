package com.example.springboot.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 宿舍管理员
 */
@Data
@AllArgsConstructor
@NoArgsConstructor

@TableName(value = "dorm_manager")
public class DormManager {

    @TableId("username")
    private String username;
    @TableField("password")
    private String password;
    @TableField("dormbuild_id")
    private int dormBuildId;
    @TableField("name")
    private String name;
    @TableField("gender")
    private String gender;
    @TableField("age")
    private int age;
    @TableField("phone_num")
    private String phoneNum;
    @TableField("email")
    private String email;
    @TableField("avatar")
    private String avatar;
}
