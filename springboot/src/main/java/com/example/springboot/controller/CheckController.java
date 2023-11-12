package com.example.springboot.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.example.springboot.common.Result;
import com.example.springboot.entity.Check;
import com.example.springboot.entity.DormRoom;
import com.example.springboot.service.CheckService;
import com.example.springboot.service.DormRoomService;
import org.apache.commons.lang.StringUtils;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Optional;

@RestController
@RequestMapping("/check")
public class CheckController {

    @Resource
    private CheckService checkService;
    @Resource
    private DormRoomService dormRoomService;

    @PostMapping("/add")
    public Result<?> add(HttpSession session, @RequestBody Check check) {
        String username = ((JSONObject)JSON.toJSON(session.getAttribute("User"))).getString("username");

        check.setOperatorName(username);
        check.setDate(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date()));

        int i = checkService.addNewOrder(check);
        if (i == 1) {
            return Result.success();
        } else {
            return Result.error("-1", "添加失败");
        }
    }

    @PutMapping("/update")
    public Result<?> update(@RequestBody Check check) {
        int i = checkService.updateNewOrder(check);
        if (i == 1) {
            return Result.success();
        } else {
            return Result.error("-1", "更新失败");
        }
    }

    @GetMapping("/find")
    public Result<?> findPage(HttpSession session, @RequestParam(defaultValue = "1") Integer pageNum,
        @RequestParam(defaultValue = "10") Integer pageSize, @RequestParam(defaultValue = "") String search,
        @RequestParam(defaultValue = "") String date1, @RequestParam(defaultValue = "") String date2) {
        // 如果是学生, 则只能看见自己宿舍的费用
        String username = ((JSONObject)JSON.toJSON(session.getAttribute("User"))).getString("username");
        String identity = (String)JSON.toJSON(session.getAttribute("Identity"));
        Integer dormRoomId = null;
        if (StringUtils.equals("stu",identity)){
            DormRoom dormRoom = dormRoomService.judgeHadBed(username);
            dormRoomId = Optional.ofNullable(dormRoom).orElse(new DormRoom()).getDormRoomId();
        }
        Page page = checkService.find(pageNum, pageSize, search, date1, date2,dormRoomId);
        if (page != null) {
            return Result.success(page);
        } else {
            return Result.error("-1", "查询失败");
        }
    }

    @GetMapping("/find/{name}")
    public Result<?> individualFind(@RequestParam(defaultValue = "1") Integer pageNum,
        @RequestParam(defaultValue = "10") Integer pageSize, @RequestParam(defaultValue = "") String search,
        @PathVariable String name) {
        System.out.println(name);
        Page page = checkService.individualFind(pageNum, pageSize, search, name);
        if (page != null) {
            return Result.success(page);
        } else {
            return Result.error("-1", "查询失败");
        }
    }

    @DeleteMapping("/delete/{id}")
    public Result<?> delete(@PathVariable Integer id) {
        int i = checkService.deleteOrder(id);
        if (i == 1) {
            return Result.success();
        } else {
            return Result.error("-1", "删除失败");
        }
    }

}
