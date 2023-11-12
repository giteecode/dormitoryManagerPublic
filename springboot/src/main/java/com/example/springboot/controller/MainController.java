package com.example.springboot.controller;

import com.example.springboot.common.Result;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;

@RestController
@RequestMapping("/main")
public class MainController {

    /**
     * 获取身份信息
     */
    @GetMapping("/loadIdentity")
    public Result<?> loadIdentity(HttpSession session) {
        Object identity = session.getAttribute("Identity");

        if (identity != null) {
            return Result.success(identity);
        } else {
            return Result.error("-1", "加载失败");
        }
    }

    /**
     * 获取个人信息
     */
    @GetMapping("/loadUserInfo")
    public Result<?> loadUserInfo(HttpSession session) {
        Object User = session.getAttribute("User");

        if (User != null) {
            return Result.success(User);
        } else {
            return Result.error("-1", "加载失败");
        }
    }

    /**
     * 退出登录
     */
    @GetMapping("/signOut")
    public Result<?> signOut(HttpSession session) {
        session.removeAttribute("User");
        session.removeAttribute("Identity");
        return Result.success();
    }
}
