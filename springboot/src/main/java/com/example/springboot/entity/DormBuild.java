package com.example.springboot.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 宿舍楼
 */
@Data
@AllArgsConstructor
@NoArgsConstructor

@TableName(value = "dorm_build")
public class DormBuild {

    @TableId(value = "id", type = IdType.AUTO)
    private Integer id;
    @TableField("dormbuild_id")
    private int dormBuildId;
    @TableField("dormbuild_name")
    private String dormBuildName;
    @TableField("dormbuild_detail")
    private String dormBuildDetail;
}
