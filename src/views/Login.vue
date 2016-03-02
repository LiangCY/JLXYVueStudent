<template>
    <form>
        <div class="form-group">
            <label for="username">用户名</label>
            <input v-model="username" type="text" class="form-control" id="username" placeholder="用户名">
        </div>
        <div class="form-group">
            <label for="password">密码</label>
            <input v-model="password" type="password" class="form-control" id="password" placeholder="密码">
        </div>
        <button v-on:click="doLogin" class="btn btn-primary">登录</button>
    </form>
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
                this.$http.post(URL_LOGIN, {
                    username: this.username,
                    password: this.password
                }).then(function (response) {
                    let data = response.data;
                    if (data.error == 0) {
                        console.log(data);
                        this.$router.go('/')
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
    html {
        height: 100%;
    }

    body {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
    }
</style>
