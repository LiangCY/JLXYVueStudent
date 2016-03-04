<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div class="user-page">
        <div class="user-panel">
            <div class="avatar">
                <img :src="'http://114.212.113.228/avatar/'+user.id" alt="">
            </div>
            <div class="content">
                <h4 class="name">{{user.name}}</h4>
            </div>
        </div>
        <div class="weui_cells">
            <div class="weui_cell">
                <div class="weui_cell_bd weui_cell_primary">
                    <p>学号</p>
                </div>
                <div class="weui_cell_ft">
                    {{user.id}}
                </div>
            </div>
            <div class="weui_cell">
                <div class="weui_cell_bd weui_cell_primary">
                    <p>院系</p>
                </div>
                <div class="weui_cell_ft">
                    {{user.school}}
                </div>
            </div>
            <div class="weui_cell">
                <div class="weui_cell_bd weui_cell_primary">
                    <p>专业</p>
                </div>
                <div class="weui_cell_ft">
                    {{user.major.length>12?user.major.substr(0,12)+'...':user.major}}
                </div>
            </div>
            <div class="weui_cell">
                <div class="weui_cell_bd weui_cell_primary">
                    <p>年级</p>
                </div>
                <div class="weui_cell_ft">
                    {{user.year+'级'}}
                </div>
            </div>
        </div>
        <div class="sign_out">
            <div class="button" v-on:click="signOut">退出当前账号</div>
        </div>
    </div>
</template>
<script>
    import notie from 'notie'
    import UserPanel from '../components/UserPanel'
    import {URL_USER} from '../constants'
    export default {
        data(){
            return {
                user: null
            }
        },
        ready(){
            this.$http.get(URL_USER, {}, {
                headers: {
                    'x-access-token': window.localStorage.getItem("jlxy_token")
                }
            }).then(function (response) {
                let data = response.data
                if (data.error == 0) {
                    this.user = data.user;
                } else {
                    notie.alert(3, data.message, 2)
                }
            }, function () {
                notie.alert(3, '请求失败', 2)
            })
        },
        methods: {
            signOut(){
                window.localStorage.removeItem('jlxy_token')
                this.$router.replace('/login')
            }
        }
    }
</script>

<style>
    .user-page .user-panel {
        background-color: #4CAF50;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 32px;
    }

    .user-page .user-panel .avatar {
        margin-top: 24px;
        width: 80px;
        height: 80px;
        border-radius: 40px;
        overflow: hidden;
    }

    .user-page .user-panel .avatar img {
        width: 80px;
        height: 80px;
    }

    .user-page .user-panel .content {
        margin-top: 12px;
        margin-bottom: 12px;
    }

    .user-page .user-panel .content .name {
        text-align: center;
        color: white;
    }

    .user-page .sign_out {
        position: absolute;
        bottom: 0;
        width: 100%;
    }

    .user-page .sign_out .button {
        width: 100%;
        height: 48px;
        background-color: #FF5544;
        color: white;
        text-align: center;
        line-height: 48px;
        font-size: 18px;
    }

</style>
