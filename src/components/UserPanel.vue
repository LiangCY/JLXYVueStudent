<template>
    <div class="user-panel">
        <div class="avatar">
            <img :src="'http://114.212.113.228/avatar/'+user.id" alt="">
        </div>
        <div class="content">
            <h4 class="name">{{user.name}}</h4>
            <p class="number">{{user.id}}</p>
        </div>
    </div>
</template>

<script>
    import notie from 'notie'
    import {URL_USER_BASIC} from '../constants'
    export default {
        data () {
            return {
                user: null,
                hasMore: false
            }
        },
        ready(){
            this.fetchUser();
        },
        http: {
            headers: {
                'x-access-token': window.localStorage.getItem("jlxy_token")
            }
        },
        methods: {
            fetchUser(){
                this.$http.get(URL_USER_BASIC).then(function (response) {
                    let data = response.data
                    if (data.error == 0) {
                        this.user = data.user
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
    .user-panel {
        background-color: #4CAF50;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 32px;
    }

    .user-panel .avatar {
        margin-top: 24px;
        width: 80px;
        height: 80px;
        border-radius: 40px;
        overflow: hidden;
    }

    .user-panel .avatar img {
        width: 80px;
        height: 80px;
    }

    .user-panel .content {
        margin-top: 12px;
        margin-bottom: 12px;
    }

    .user-panel .content .name {
        text-align: center;
        color: white;
    }

    .user-panel .content .number {
        color: white;
    }
</style>
