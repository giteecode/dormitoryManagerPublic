import request from "@/utils/request";

const { ElMessage } = require("element-plus");

export default {
    name: "CheckInfo",
    components: {},
    data() {
        return {
            loading: true,
            disabled: false,
            judge: false,
            dialogVisible: false,
            search: "",
            currentPage: 1,
            pageSize: 10,
            total: 0,
            tableData: [],
            detail: {},
            form: {},
            role:"",
            date:[],
            rules: {
                roomid: [{ required: true, message: "宿舍号不能为空", trigger: "blur" }],
                grade: [{ required: true, message: "检查结果不能为空", trigger: "blur" }],
                reason: [{ required: true, message: "说明原因不能为空", trigger: "blur" }],
            },
        };
    },
    created() {
        this.role = JSON.parse(window.sessionStorage.getItem("identity"));
        this.load();
        this.loading = true;
        setTimeout(() => {
            //设置延迟执行
            this.loading = false;
        }, 1000);
    },
    methods: {
        async load() {
            request.get("/check/find", {
                params: {
                    pageNum: this.currentPage,
                    pageSize: this.pageSize,
                    search: this.search,
                    date1:this.date[0]==null?"":this.date[0],
                    date2:this.date[1]==null?"":this.date[1],
                },
            }).then((res) => {
                console.log(res);
                this.tableData = res.data.records;
                this.total = res.data.total;
                this.loading = false;
            });
        },
        reset() {
            this.search = '';
            this.date = [];
            request.get("/check/find", {
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
        showDetail(row) {
            this.detailDialog = true;
            this.$nextTick(() => {
                this.detail = row;
            });
        },
        closeDetailDialog() {
            this.detailDialog = false;
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
                        await request.post("/check/add", this.form).then((res) => {
                            console.log(res);
                            if (res.code === "0") {
                                ElMessage({
                                    message: "新增成功",
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
                    } else {
                        //修改
                        await request.put("/check/update", this.form).then((res) => {
                            console.log(res);
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
        async handleDelete(id) {
            console.log(id);
            request.delete("/check/delete/" + id).then((res) => {
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
};