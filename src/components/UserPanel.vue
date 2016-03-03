<template>
    <div class="panel">
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
    .panel {
        background-color: #2b669a;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .avatar {
        margin-top: 24px;
        width: 80px;
        height: 80px;
        border-radius: 40px;
        overflow: hidden;
    }

    .avatar img {
        width: 80px;
        height: 80px;
    }

    .content {
        margin-top: 12px;
        margin-bottom: 12px;
    }

    .content .name {
        text-align: center;
        color: white;
    }

    .content .number {
        color: white;
    }
</style>
