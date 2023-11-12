import request from "@/utils/request";

const {ElMessage} = require("element-plus");
export default {
    name: "AdjustRoomInfo",
    data() {
        const checkRoomState = (rule, value, callback) => {
            this.dormRoomId = value
            request.get("/room/checkRoomState/" + value).then((res) => {
                if (res.code === "0") {
                    callback();
                } else {
                    callback(new Error(res.msg));
                }
            });
        };
        const checkBedState = (rule, value, callback) => {
            request.get("/room/checkBedState/" + this.dormRoomId + '/' + value).then((res) => {
                if (res.code === "0") {
                    callback();
                } else {
                    callback(new Error(res.msg));
                }
            });
        };
        const checkApplyState = (rule, value, callback) => {
            console.log(this.form.finishTime)
            if (value === "通过" && this.form.finishTime !== null) {
                callback();
            } else if (value === "驳回" && this.form.finishTime !== null) {
                callback();
            } else {
                callback(new Error("请检查订单完成状态与选择时间是否匹配"));
            }
        };
        return {
            loading: true,
            dialogVisible: false,
            detailDialog: false,
            search: "",
            currentPage: 1,
            pageSize: 10,
            total: 0,
            tableData: [],
            form: {},
            dormRoomId: 0,
            orderState: false,
            rules: {
                username: [
                    {required: true, message: "请输入学号", trigger: "blur"},
                    {pattern: /^[a-zA-Z0-9]{4,9}$/, message: "必须由 2 到 5 个字母或数字组成", trigger: "blur",},
                ],
                name: [
                    {required: true, message: "请输入姓名", trigger: "blur"},
                    {pattern: /^(?:[\u4E00-\u9FA5·]{2,10})$/, message: "必须由 2 到 10 个汉字组成", trigger: "blur",},
                ],
                currentRoomId: [
                    {required: true, message: "请输入当前房间号", trigger: "blur"},
                ],
                currentBedId: [
                    {required: true, message: "请输入当前床位号", trigger: "blur"},
                ],
                state: [{validator: checkApplyState, trigger: "blur"},],
                towardsRoomId: [{validator: checkRoomState, trigger: "blur"}],
                towardsBedId: [{validator: checkBedState, trigger: "blur"}],
            },
        }
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
            request.get("/adjustRoom/find", {
                params: {
                    pageNum: this.currentPage,
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
        reset() {
            this.search = ''
            request.get("/adjustRoom/find", {
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
            return row.gender === value;
        },
        judgeOrderState(state) {
            if (state === '通过') {
                this.orderState = true
            } else if (state === '驳回') {
                this.orderState = false
            }
        },
        save() {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    this.judgeOrderState(this.form.state)
                    //修改
                    request.put("/adjustRoom/update/" + this.orderState, this.form).then((res) => {
                        console.log(res);
                        if (res.code === "0") {
                            ElMessage({
                                message: "修改成功",
                                type: "success",
                            });
                            this.search = "";
                            this.load();
                            this.dialogVisible = false;
                        } else if (res.msg === "重复操作") {
                            ElMessage({
                                message: res.msg,
                                type: "error",
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
            });
        },
        cancel() {
            this.$refs.form.resetFields();
            this.dialogVisible = false;
            this.detailDialog = false;
        },
        showDetail(row) {
            // 查看详情
            this.detailDialog = true;
            this.$nextTick(() => {
                this.$refs.form.resetFields();
                this.form = JSON.parse(JSON.stringify(row));
            });
        },
        handleEdit(row) {
            //修改
            // 生拷贝
            this.dialogVisible = true;
            this.$nextTick(() => {
                this.$refs.form.resetFields();
                this.form = JSON.parse(JSON.stringify(row));
            });
        },
        async handleDelete(id) {
            //删除
            request.delete("/adjustRoom/delete/" + id).then((res) => {
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
}