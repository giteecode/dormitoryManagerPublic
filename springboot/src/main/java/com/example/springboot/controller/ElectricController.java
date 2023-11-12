package com.example.springboot.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.example.springboot.common.Result;
import com.example.springboot.entity.DormRoom;
import com.example.springboot.entity.Electric;
import com.example.springboot.service.DormRoomService;
import com.example.springboot.service.ElectricService;
import org.apache.commons.lang.StringUtils;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Optional;

@RestController
@RequestMapping("/electric")
public class ElectricController {

    @Resource
    private ElectricService repairService;
    @Resource
    private DormRoomService dormRoomService;

    @PostMapping("/add")
    public Result<?> add(HttpSession session, @RequestBody Electric electric) {
        String username = ((JSONObject)JSON.toJSON(session.getAttribute("User"))).getString("username");

        if (electric.getMoney() == 0) {
            return Result.error("-1", "金额不能为0");
        }

        // 只有管理员才能扣费, 其余人只能充值
        if (StringUtils.equals("admin", username)) {
            electric.setType("扣费");
            if (null == electric.getRoomid()) {
                return Result.error("-1", "宿舍号为必填项");
            }
        } else {
            electric.setType("充值");
            DormRoom dormRoom = dormRoomService.judgeHadBed(username);
            if (dormRoom == null) {
                return Result.error("-1", "未查询到操作人宿舍");
            }
            electric.setRoomid(dormRoom.getDormRoomId());
        }

        electric.setOperatorName(username);
        electric.setDate(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date()));

        int i = repairService.addNewOrder(electric);
        if (i == 1) {
            return Result.success();
        } else {
            return Result.error("-1", "添加失败");
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
        Page page = repairService.find(pageNum, pageSize, search, date1, date2,dormRoomId);
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
        Page page = repairService.individualFind(pageNum, pageSize, search, name);
        if (page != null) {
            return Result.success(page);
        } else {
            return Result.error("-1", "查询失败");
        }
    }

}
