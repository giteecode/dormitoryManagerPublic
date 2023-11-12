import request from "@/utils/request";
import E from "wangeditor";

const {ElMessage} = require("element-plus");
let editor;
export default {
    name: "BuildingInfo",
    components: {
        E,
    },
    data() {
        return {
            author: "",
            loading: true,
            disabled: false,
            judge: false,
            dialogVisible: false,
            detailDialog: false,
            search: "",
            currentPage: 1,
            pageSize: 10,
            total: 0,
            tableData: [],
            detail: {},
            form: {
                id: "",
                title: "",
                content: "",
                author: "",
                releaseTime: "",
            },
            rules: {
                title: [{required: true, message: "请输入标题", trigger: "blur"}],
                content: [{required: true, message: "请输入内容", trigger: "blur"}],
                releaseTime: [
                    {required: true, message: "请选择时间", trigger: "blur"},
                ],
            },
        };
    },
    created() {
        this.getSessionInfo();
        this.load();
        this.loading = true;
        setTimeout(() => {
            //设置延迟执行
            this.loading = false;
        }, 1000);
    },
    mounted() {
    },
    methods: {
        async load() {
            request.get("/notice/find", {
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
            request.get("/notice/find", {
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
        getSessionInfo() {
            let user = JSON.parse(sessionStorage.getItem("user"));
            this.author = user.name;
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
            this.form.author = this.author;
            console.log(this.form.author);
            this.dialogVisible = true;
            this.$nextTick(() => {
                this.$refs.form.resetFields();
                //加载wangEdit
                editor = new E("#div1");
                editor.create();
                this.disabled = false;
                this.form = {};
                this.judge = false;
            });
        },
        save() {
            this.form.content = editor.txt.html(); //获取编辑器内容并赋值
            this.form.author = this.author;
            console.log(this.form.author);
            this.$refs.form.validate((valid) => {
                if (valid) {
                    if (this.judge === false) {
                        //新增
                        request.post("/notice/add", this.form).then((res) => {
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
                        request.put("/notice/update", this.form).then((res) => {
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
            editor.txt.clear();
            editor.destroy();
            this.dialogVisible = false;
        },
        handleEdit(row) {
            //修改
            this.judge = true;
            this.dialogVisible = true;
            this.$nextTick(() => {
                this.$refs.form.resetFields();
                //加载wangEdit
                editor = new E("#div1");
                editor.create();
                // 生拷贝
                this.form = JSON.parse(JSON.stringify(row));
                editor.txt.html(this.form.content);
                this.disabled = true;
            });
        },
        handleDelete(id) {
            console.log(id);
            request.delete("/notice/delete/" + id).then((res) => {
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