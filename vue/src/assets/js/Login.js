import request from "@/utils/request";

const {ElMessage} = require("element-plus");
export default {
    name: "Login",
    data() {
        return {
            identity: "",
            form: {
                username: "",
                password: "",
                identity: "",
            },
            rules: {
                username: [
                    {required: true, message: "请输入用户名", trigger: "blur"},
                ],
                password: [{required: true, message: "请输入密码", trigger: "blur"}],
                identity: [{required: true, message: "请选择身份", trigger: "blur"}],
            },
        };
    },
    computed: {
        disabled() {
            const {username, password, identity} = this.form;
            return Boolean(username && password && identity);
        },
    },
    methods: {
        login() {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    this.identity = this.form.identity;
                    request.post("/" + this.identity + "/login", this.form).then((res) => {
                        if (res.code === "0") {
                            ElMessage({
                                message: "登陆成功",
                                type: "success",
                            });
                            // 登陆成功跳转主页
                            window.sessionStorage.setItem("user", JSON.stringify(res.data));
                            window.sessionStorage.setItem("identity", JSON.stringify(this.form.identity));
                            this.$router.replace({path: "/home"});
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
    },
};