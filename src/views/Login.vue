<template>
    <div class="login-page">
        <div class="header">
            <div class="title">
                教学辅助系统
            </div>
            <div class="subtitle">
                学生登录
            </div>
        </div>
        <div class="weui_cells weui_cells_form">
            <div class="weui_cell">
                <div class="weui_cell_hd"><label class="weui_label">账号</label></div>
                <div class="weui_cell_bd weui_cell_primary">
                    <input v-model='username' class="weui_input" type="number" pattern="[0-9]*" placeholder="请输入学号"/>
                </div>
            </div>
            <div class="weui_cell">
                <div class="weui_cell_hd"><label class="weui_label">密码</label></div>
                <div class="weui_cell_bd weui_cell_primary">
                    <input v-model='password' class="weui_input" type="password" placeholder="请输入密码"/>
                </div>
            </div>
        </div>
        <div class="weui_btn_area">
            <button class="weui_btn weui_btn_plain_primary" v-on:click="doLogin">登录</button>
        </div>
    </div>
</template>
<script>
    import notie from 'notie'
    import {URL_LOGIN} from '../constants'
    export default {
        data(){
            return {
                username: '',
                password: ''
            }
        },
        methods: {
            doLogin(){
                if (!this.username) {
                    notie.alert(3, '请输入学号', 2)
                    return
                }
                if (!this.password) {
                    notie.alert(3, '请输入密码', 2)
                    return
                }
                this.$http.post(URL_LOGIN, {
                    username: this.username,
                    password: this.password
                }).then(function (response) {
                    let data = response.data
                    if (data.error == 0) {
                        window.localStorage.setItem('jlxy_token', data.token)
                        console.log(1)
                        this.$router.replace('/')
                    } else {
                        notie.alert(3, data.message, 2)
                    }
                }, function () {
                    notie.alert(3, '请求失败', 2)
                })
            }
        }
    }
</script>

<style>
    .login-page .header {
        height: 120px;
        background-color: #4CAF50;
        color: white;
        text-align: center;
        padding-top: 40px;
    }

    .login-page .header .title {
        font-size: 24px;
        font-weight: bold;
    }

    .login-page .header .subtitle {
        margin-top: 8px;
        font-size: 20px;
    }
</style>
