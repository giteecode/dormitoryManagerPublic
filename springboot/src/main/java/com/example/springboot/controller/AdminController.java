package com.example.springboot.controller;

import com.example.springboot.common.Result;
import com.example.springboot.common.UID;
import com.example.springboot.entity.Admin;
import com.example.springboot.entity.User;
import com.example.springboot.service.AdminService;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

@RestController
@RequestMapping("/admin")
public class AdminController {

    String uid = new UID().produceUID();

    @Resource
    private AdminService adminService;

    /**
     * 管理员登录
     */
    @PostMapping("/login")
    public Result<?> login(@RequestBody User user, HttpSession session) {

        Object o = adminService.adminLogin(user.getUsername(), user.getPassword());
        if (o != null) {
            System.out.println(o);
            //存入session
            session.setAttribute("Identity", "admin");
            session.setAttribute("User", o);
            return Result.success(o);
        } else {
            return Result.error("-1", "用户名或密码错误");
        }
    }

    /**
     * 管理员信息更新
     */
    @PutMapping("/update")
    public Result<?> update(@RequestBody Admin admin) {
        int i = adminService.updateAdmin(admin);
        if (i == 1) {
            return Result.success();
        } else {
            return Result.error("-1", "更新失败");
        }
    }
}
