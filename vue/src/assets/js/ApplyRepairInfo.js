import request from "@/utils/request";

const {ElMessage} = require("element-plus");

export default {
    name: "ApplyRepairInfo",
    components: {},
    data() {
        return {
            loading: true,
            dialogVisible: false,
            detailDialog: false,
            search: "",
            currentPage: 1,
            pageSize: 10,
            total: 0,
            tableData: [],
            detail: {},
            name: '',
            username: '',
            form: {},
            room: {
                dormRoomId: '',
                dormBuildId: '',
            },
            rules: {
                title: [{required: true, message: "请输入标题", trigger: "blur"}],
                content: [{required: true, message: "请输入内容", trigger: "blur"}],
                orderBuildTime: [{required: true, message: "请选择时间", trigger: "blur"},],
            },
        };
    },
    created() {
        this.init()
        this.getInfo()
        this.load()
        this.loading = true
        setTimeout(() => {
            //设置延迟执行
            this.loading = false
        }, 1000);
    },
    methods: {
        init() {
            this.form = JSON.parse(sessionStorage.getItem("user"));
            this.name = this.form.name;
            this.username = this.form.username;
        },
        async load() {
            request.get("/repair/find/" + this.name, {
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
        getInfo() {
            request.get("/room/getMyRoom/" + this.username).then((res) => {
                if (res.code === "0") {
                    this.room = res.data;
                    console.log(this.room);
                } else {
                    ElMessage({
                        message: res.msg,
                        type: "error",
                    });
                }
            });
        },
        filterTag(value, row) {
            return row.state === value;
        },
        showDetail(row) {
            this.detailDialog = true;
            this.$nextTick(() => {
                this.detail = row;
            });
        },
        closeDetails() {
            this.detailDialog = false;
        },
        add() {
            this.dialogVisible = true;
            this.$nextTick(() => {
                this.$refs.form.resetFields();
                this.form.repairer = this.name
                this.form.dormBuildId = this.room.dormBuildId
                this.form.dormRoomId = this.room.dormRoomId
            });
        },
        save() {
            this.$refs.form.validate(async (valid) => {
                if (valid) {
                    //新增
                    console.log(this.form)
                    await request.post("/repair/add", this.form).then((res) => {
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
            })
        },
        cancel() {
            this.$refs.form.resetFields();
            this.dialogVisible = false;
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