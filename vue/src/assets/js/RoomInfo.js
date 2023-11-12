import request from "@/utils/request";

const {ElMessage} = require("element-plus");

export default {
    name: "BuildingInfo",
    components: {},
    data() {
        const checkStuNum = (rule, value, callback) => {
            request.get("/stu/exist/" + value).then((res) => {
                request.get("/room/judgeHadBed/" + value).then((result) => {
                    if (res.code === "0" && result.code === "0") {
                        callback();
                    } else if (res.code === "-1" && result.code === "0") {
                        callback(new Error(res.msg));
                    } else if (res.code === "0" && result.code === "-1") {
                        callback(new Error(result.msg));
                    } else {
                        callback(new Error("请输入正确的数据"));
                    }
                });
            });
        };
        return {
            bedNum: 0,
            havePeopleNum: 0,
            loading: true,
            disabled: false,
            judge: false,
            dialogVisible: false,
            bedDialog: false,
            stuInfoDialog: false,
            bedName: "",
            search: "",
            currentPage: 1,
            pageSize: 10,
            total: 0,
            tableData: [],
            form: {
                dormRoomId: "",
                dormBuildId: "",
                floorNum: "",
                maxCapacity: "",
                currentCapacity: "",
                firstBed: "",
                secondBed: "",
                thirdBed: "",
                fourthBed: "",
            },
            rules: {
                dormRoomId: [
                    {required: true, message: "请输入房间号", trigger: "blur"},
                    {pattern: /^[0-9]{4}$/, message: "范围：1000-9999", trigger: "blur"},
                ],
                floorNum: [
                    {required: true, message: "请输入楼层数", trigger: "blur"},
                    {pattern: /^[1-3]$/, message: "范围：1-3", trigger: "blur"},
                ],
                dormBuildId: [
                    {required: true, message: "请输入楼宇号数", trigger: "blur"},
                    {pattern: /^[1-4]$/, message: "范围：1-4", trigger: "blur"},
                ],
                maxCapacity: [
                    {required: true, message: "请输入房间可住人数", trigger: "blur"},
                    {pattern: /^[0-4]$/, message: "范围：0-4", trigger: "blur"},
                ],
                currentCapacity: [
                    {required: true, message: "请输入当前已住人数", trigger: "blur"},
                    {pattern: /^[0-4]$/, message: "范围：0-4", trigger: "blur"},
                ],
                firstBed: [{validator: checkStuNum, trigger: "blur"}],
                secondBed: [{validator: checkStuNum, trigger: "blur"}],
                thirdBed: [{validator: checkStuNum, trigger: "blur"}],
                fourthBed: [{validator: checkStuNum, trigger: "blur"}],
            },
        };
    },
    created() {
        this.load();
        this.loading = true;
        setTimeout(() => {
            //设置延迟执行
            this.loading = false;
        }, 1000);
    },
    methods: {
        async load() {
            request.get("/room/find", {
                params: {
                    pageNum: this.currentPage,
                    pageSize: this.pageSize,
                    search: this.search,
                },
            }).then((res) => {
                this.tableData = res.data.records;
                this.total = res.data.total;
                this.loading = false;
            });
        },
        reset() {
            this.search = ''
            request.get("/room/find", {
                params: {
                    pageNum: 1,
                    pageSize: this.pageSize,
                    search: this.search,
                },
            }).then((res) => {
                console.log(res);
                this.tableData = res.data.records;
                this.total = res.data.total;
                this.loading = false;
            });
        },
        filterTag(value, row) {
            return row.currentCapacity === value;
        },
        add() {
            this.dialogVisible = true;
            this.$nextTick(() => {
                this.$refs.form.resetFields();
                this.disabled = false;
                this.form = {};
                this.judge = false;
            });
        },
        save() {
            this.$refs.form.validate(async (valid) => {
                if (valid) {
                    if (this.judge === false) {
                        //新增
                        request.post("/room/add", this.form).then((res) => {
                            if (res.code === "0") {
                                ElMessage({
                                    message: "新增成功",
                                    type: "success",
                                });
                                this.search = "";
                                this.loading = true;
                                this.load();
                                this.dialogVisible = false;
                            } else {
                                ElMessage({
                                    message: res.msg,
                                    type: "error",
                                });
                            }
                        });
                    } else {
                        //修改
                        request.put("/room/update", this.form).then((res) => {
                            if (res.code === "0") {
                                ElMessage({
                                    message: "修改成功",
                                    type: "success",
                                });
                                this.search = "";
                                this.load();
                                this.dialogVisible = false;
                            } else {
                                ElMessage({
                                    message: res.msg,
                                    type: "error",
                                });
                            }
                        });
                    }
                }
            });
        },
        cancel() {
            this.$refs.form.resetFields();
            this.dialogVisible = false;
            this.bedDialog = false;
            this.stuInfoDialog = false;
        },
        handleEdit(row) {
            //修改
            this.judge = true;
            this.dialogVisible = true;
            this.$nextTick(() => {
                this.$refs.form.resetFields();
                // 生拷贝
                this.form = JSON.parse(JSON.stringify(row));
                this.disabled = true;
            });
        },
        handleDelete(dormRoomId) {
            //删除
            request.delete("/room/delete/" + dormRoomId).then((res) => {
                if (res.code === "0") {
                    ElMessage({
                        message: "删除成功",
                        type: "success",
                    });
                    this.search = "";
                    this.load();
                } else {
                    ElMessage({
                        message: res.msg,
                        type: "error",
                    });
                }
            });
        },
        calCurrentNum(info) {
            this.havePeopleNum = 0;
            // 获取房间人数
            let roomPeopleNum = 0;
            if (info.firstBed != null) {
                roomPeopleNum++;
            }
            if (info.secondBed != null) {
                roomPeopleNum++;
            }
            if (info.thirdBed != null) {
                roomPeopleNum++;
            }
            if (info.fourthBed != null) {
                roomPeopleNum++;
            }
            this.havePeopleNum = roomPeopleNum;
        },
        plusIcon(num, info) {
            //添加图标
            this.judge = false;
            //显示对应床位input
            this.bedNum = num;
            //获取当前房间人数
            this.calCurrentNum(info);
            this.bedDialog = true;
            this.$nextTick(() => {
                this.$refs.form.resetFields();
                // 生拷贝
                this.form = JSON.parse(JSON.stringify(info));
            });
        },
        editIcon(num, info) {
            //修改图标
            this.judge = true;
            //显示对应床位input
            this.bedNum = num;
            //修改床位所住的学生
            this.bedDialog = true;
            this.$nextTick(() => {
                this.$refs.form.resetFields();
                // 生拷贝
                this.form = JSON.parse(JSON.stringify(info));
            });
        },
        detailIcon(num, info) {
            //查看床位所住的学生
            let stu = "";
            // 删除
            if (num === 1) {
                stu = info.firstBed;
            } else if (num === 2) {
                stu = info.secondBed;
            } else if (num === 3) {
                stu = info.thirdBed;
            } else if (num === 4) {
                stu = info.fourthBed;
            }
            request.get("/stu/exist/" + stu).then((res) => {
                if (res.code === "0") {
                    this.stuInfoDialog = true;
                    this.$nextTick(() => {
                        this.$refs.form.resetFields();
                        // 生拷贝
                        this.form = JSON.parse(JSON.stringify(res.data));
                    });
                }
            });
        },
        addStuBed() {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    // 为床位添加学生
                    this.form.currentCapacity = this.havePeopleNum + 1;
                    request.put("/room/update", this.form).then((res) => {
                        if (res.code === "0") {
                            ElMessage({
                                message: "新增成功",
                                type: "success",
                            });
                            this.search = "";
                            this.loading = true;
                            this.load();
                            this.bedDialog = false;
                        } else {
                            ElMessage({
                                message: res.msg,
                                type: "error",
                            });
                        }
                    });
                }
            });
        },
        editStuBed() {
            //修改
            this.$refs.form.validate((valid) => {
                if (valid) {
                    request.put("/room/update", this.form).then((res) => {
                        if (res.code === "0") {
                            ElMessage({
                                message: "修改成功",
                                type: "success",
                            });
                            this.search = "";
                            this.loading = true;
                            this.load();
                            this.bedDialog = false;
                        } else {
                            ElMessage({
                                message: res.msg,
                                type: "error",
                            });
                        }
                    });
                }
            });
        },
        async deleteStuBed(bedNum, info) {
            let bedName = "";
            // 删除
            if (bedNum === 1) {
                bedName = "first_bed";
            } else if (bedNum === 2) {
                bedName = "second_bed";
            } else if (bedNum === 3) {
                bedName = "third_bed";
            } else if (bedNum === 4) {
                bedName = "fourth_bed";
            }
            //更新当前房间人数
            this.calCurrentNum(info);
            request.delete(
                "/room/delete/" +
                bedName +
                "/" +
                info.dormRoomId +
                "/" +
                this.havePeopleNum
            ).then((res) => {
                if (res.code === "0") {
                    ElMessage({
                        message: "删除成功",
                        type: "success",
                    });
                    this.search = "";
                    this.loading = true;
                    this.load();
                    this.bedDialog = false;
                } else {
                    ElMessage({
                        message: res.msg,
                        type: "error",
                    });
                }
            });
        },
        handleSizeChange(pageSize) {
            //改变每页个数
            this.pageSize = pageSize;
            this.load();
        },
        handleCurrentChange(pageNum) {
            //改变页码
            this.currentPage = pageNum;
            this.load();
        },
    },
};