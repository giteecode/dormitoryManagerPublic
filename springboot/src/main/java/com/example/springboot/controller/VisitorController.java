package com.example.springboot.controller;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.example.springboot.common.Result;
import com.example.springboot.entity.Visitor;
import com.example.springboot.service.VisitorService;
import org.apache.commons.lang.StringUtils;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

@RestController
@RequestMapping("/visitor")
public class VisitorController {

    @Resource
    private VisitorService visitorService;

    /**
     * 访客添加
     */
    @PostMapping("/add")
    public Result<?> add(@RequestBody Visitor visitor) {
        int i = visitorService.addNewVisitor(visitor);
        if (i == 1) {
            return Result.success();
        } else {
            return Result.error("-1", "添加失败");
        }
    }

    /**
     * 访客信息更新
     */
    @PutMapping("/update")
    public Result<?> update(@RequestBody Visitor visitor) {
        if (StringUtils.equals("test",visitor.getVisitorName())){
            return Result.error("-1", "禁止修改测试账号");
        }
        int i = visitorService.updateNewVisitor(visitor);
        if (i == 1) {
            return Result.success();
        } else {
            return Result.error("-1", "更新失败");
        }
    }

    /**
     * 访客删除
     */
    @DeleteMapping("/delete/{id}")
    public Result<?> delete(@PathVariable Integer id) {
        int i = visitorService.deleteVisitor(id);
        if (i == 1) {
            return Result.success();
        } else {
            return Result.error("-1", "删除失败");
        }
    }

    /**
     * 访客查询
     */
    @GetMapping("/find")
    public Result<?> findPage(@RequestParam(defaultValue = "1") Integer pageNum,
                              @RequestParam(defaultValue = "10") Integer pageSize,
                              @RequestParam(defaultValue = "") String search) {
        Page page = visitorService.find(pageNum, pageSize, search);
        if (page != null) {
            return Result.success(page);
        } else {
            return Result.error("-1", "查询失败");
        }
    }
}
