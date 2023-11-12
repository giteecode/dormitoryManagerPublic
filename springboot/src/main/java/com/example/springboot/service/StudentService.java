package com.example.springboot.service;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;
import com.example.springboot.entity.Student;


public interface StudentService extends IService<Student> {

    //学生登陆
    Student stuLogin(String username, String password);

    //新增学生
    int addNewStudent(Student student);

    //查询学生
    Page find(Integer pageNum, Integer pageSize, String search);

    //更新学生信息
    int updateNewStudent(Student student);

    //删除学生信息
    int deleteStudent(String username);

    //统计学生人数
    int stuNum();

    //床位信息，查询该学生信息
    Student stuInfo(String username);

}
