package com.example.springboot.controller;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.example.springboot.common.Result;
import com.example.springboot.entity.DormBuild;
import com.example.springboot.service.DormBuildService;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/building")
public class DormBuildController {

    @Resource
    private DormBuildService dormBuildService;

    /**
     * 楼宇添加
     */
    @PostMapping("/add")
    public Result<?> add(@RequestBody DormBuild dormBuild) {
        int i = dormBuildService.addNewBuilding(dormBuild);
        if (i == 1) {
            return Result.success();
        } else {
            return Result.error("-1", "添加失败");
        }
    }

    /**
     * 楼宇信息更新
     */
    @PutMapping("/update")
    public Result<?> update(@RequestBody DormBuild dormBuild) {
        int i = dormBuildService.updateNewBuilding(dormBuild);
        if (i == 1) {
            return Result.success();
        } else {
            return Result.error("-1", "更新失败");
        }
    }

    /**
     * 楼宇删除
     */
    @DeleteMapping("/delete/{dormBuildId}")
    public Result<?> delete(@PathVariable Integer dormBuildId) {
        int i = dormBuildService.deleteBuilding(dormBuildId);
        if (i == 1) {
            return Result.success();
        } else {
            return Result.error("-1", "删除失败");
        }
    }

    /**
     * 楼宇查找
     */
    @GetMapping("/find")
    public Result<?> findPage(@RequestParam(defaultValue = "1") Integer pageNum,
                              @RequestParam(defaultValue = "10") Integer pageSize,
                              @RequestParam(defaultValue = "") String search) {
        Page page = dormBuildService.find(pageNum, pageSize, search);
        if (page != null) {
            return Result.success(page);
        } else {
            return Result.error("-1", "查询失败");
        }
    }

    /**
     * 首页Echarts 获取楼宇信息
     */
    @GetMapping("/getBuildingName")
    public Result<?> getBuildingName() {
        List<DormBuild> buildingName = dormBuildService.getBuildingId();
        List<Integer> buildingId = buildingName.stream().map(dormBuildId -> dormBuildId.getDormBuildId()).collect(Collectors.toList());

        if (!buildingId.isEmpty()) {
            return Result.success(buildingId);
        } else {
            return Result.error("-1", "查询失败");
        }

    }
}
