package com.example.springboot.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 公告
 */

@Data
@AllArgsConstructor
@NoArgsConstructor

@TableName(value = "notice")
public class Notice {

    @TableId(value = "id", type = IdType.AUTO)
    private Integer id;
    @TableField("title")
    private String title;
    @TableField("content")
    private String content;
    @TableField("author")
    private String author;
    @TableField("release_time")
    private String releaseTime;
}
