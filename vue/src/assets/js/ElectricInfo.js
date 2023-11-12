import request from "@/utils/request";

const { ElMessage } = require("element-plus");

export default {
    name: "WaterInfo",
    components: {},
    data() {
        return {
            loading: true,
            disabled: false,
            judge: false,
            dialogVisible: false,
            search: "",
            date: [],
            currentPage: 1,
            pageSize: 10,
            total: 0,
            tableData: [],
            detail: {},
            form: {},
            role: "",
            title: "",
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
            request.get("/electric/find", {
                params: {
                    pageNum: this.currentPage,
                    pageSize: this.pageSize,
                    search: this.search,
                    date1: this.date[0] == null ? "" : this.date[0],
                    date2: this.date[1] == null ? "" : this.date[1]
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
            request.get("/electric/find", {
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
            this.title = "添加电费"
            this.dialogVisible = true;
            this.$nextTick(() => {
                this.$refs.form.resetFields();
                this.disabled = false;
                this.judge = false;
            });
            this.form.type = "充值";
            this.form.money = 1;
            if (this.role == "admin") {
                this.form.type = "扣费";
            }
        },
        save() {
            this.$refs.form.validate(async (valid) => {
                if (valid) {
                    //新增
                    await request.post("/electric/add", this.form).then((res) => {
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
                }
            });
        },
        cancel() {
            this.$refs.form.resetFields();
            this.dialogVisible = false;
        },
        handleEdit(row) {
            this.judge = true;
            this.title = "电费详情"
            this.dialogVisible = true;
            this.$nextTick(() => {
                this.$refs.form.resetFields();
                this.form = JSON.parse(JSON.stringify(row));
                this.disabled = true;
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