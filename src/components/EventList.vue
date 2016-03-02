<template>
    <div class="event-item" v-for="event in events">
        <div class="avatar">
            <img :src="'http://114.212.113.228/avatar/'+event.userId">
        </div>
        <div class="content">
            <div class="author">
                <span class="name"> {{event.username}}</span>
                <span class="date">
                    {{event.date}}
                </span>
            </div>
            {{{event.content}}}
        </div>
    </div>
</template>

<script>
    import {URL_EVENTS} from '../constants'
    export default {
        data () {
            return {
                events: [],
                hasMore: false
            }
        },
        ready(){
            this.fetchEvents();
        },
        http: {
            headers: {
                'x-access-token': window.localStorage.getItem("jlxy_token")
            }
        },
        methods: {
            fetchEvents(){
                this.$http.get(URL_EVENTS).then(function (response) {
                    let data = response.data;
                    console.log(data)
                    if (data.error == 0) {
                        this.events = data.events;
                    } else {
//                    notie.alert(3, data.message, 2)
                    }
                }, function () {
//                notie.alert(3, '请求失败', 2)
                })
            }
        }

    }
</script>

<style>
    body {
        background-color: #DEDEDE;
    }

    .event-item {
        display: flex;
        margin: 10px 8px 0;
        padding: 8px;
        background-color: #FFF;
        box-shadow: #888 2px 2px 5px;
        border: 1px solid #ccc;
        border-radius: 4px;
    }

    .event-item:hover {
        background-color: #F8F8F8
    }

    .event-item .avatar {
        width: 40px;
        height: 40px;
        border-radius: 8px;
        overflow: hidden;
        display: inline-block;
    }

    .event-item .avatar img {
        width: 40px;
        height: 40px;
    }

    .event-item .content {
        flex: 1;
        margin-left: 8px;
        align-items: center;
    }

    .event-item .author {
        margin-bottom: 2px;
    }

    .event-item .author .name {
        font-size: 15px;
        font-weight: bold;
    }

    .event-item .author .date {
        margin-left: 4px;
        color: #888;
    }

</style>
