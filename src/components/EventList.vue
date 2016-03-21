<template>
    <div class="event-list">
        <div class="event-item" v-for="event in events">
            <div class="avatar">
                <img :src="'http://219.219.117.114/avatar/'+event.userId">
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
        <div class="loading-more" v-show="loadingMore">
            <img :src="loadingSrc" alt="Loading"/>
        </div>
        <div class="message" v-else>已无更多帖子</div>
    </div>
</template>

<script>
    import notie from 'notie'
    import $ from 'jquery'
    import LoadingBubbles from 'loading-svg/loading-spin.svg'
    import {URL_EVENTS} from '../constants'
    export default {
        data () {
            return {
                events: [],
                hasMore: false,
                refreshing: false,
                loadingMore: false,
                loadingSrc: LoadingBubbles
            }
        },
        ready(){
            this.load();
            var self = this;
            window.onscroll = function () {
                if (self.hasMore) {
                    var windowHeight = document.documentElement.clientHeight;
                    var scroll = window.scrollY;
                    var pageHeight = document.body.scrollHeight;
                    if (windowHeight + scroll + 160 > pageHeight) {
                        self.loadMore();
                    }
                }
            }
        },
        methods: {
            load: function () {
                this.fetchEvents(30, function (err, data) {
                    if (err) return notie.alert(3, err, 2);
                    this.events = data.events;
                    this.hasMore = data.hasMore;
                }.bind(this))
            },
            refresh: function () {
                if (this.refreshing || this.loadingMore) return
                this.refreshing = true
                this.$parent.refreshing = true
                this.fetchEvents(30, function (err, data) {
                    if (err) return notie.alert(3, err, 2);
                    this.events = data.events;
                    this.hasMore = data.hasMore;
                    this.refreshing = false;
                    var self = this;
                    $('body').animate({scrollTop: 0}, 400, function () {
                        notie.alert(1, '加载完成', 1);
                        self.$parent.refreshing = false
                    });
                }.bind(this))
            },
            loadMore: function () {
                if (this.refreshing || this.loadingMore) return
                this.loadingMore = true
                this.$parent.refreshing = true
                this.fetchEvents(this.events.length + 30, function (err, data) {
                    if (err) return notie.alert(3, err, 2);
                    this.events = data.events;
                    this.hasMore = data.hasMore;
                    this.loadingMore = false;
                    this.$parent.refreshing = false
                }.bind(this))
            },
            fetchEvents(count, callback){
                this.$http.get(URL_EVENTS, {count: count}, {
                    headers: {
                        'x-access-token': window.localStorage.getItem("jlxy_token")
                    }
                }).then(function (response) {
                    let data = response.data
                    if (data.error == 0) {
                        callback(null, data)
                    } else {
                        callback(data.message)
                    }
                }, function () {
                    callback('请求失败')
                })
            }
        }

    }
</script>

<style>
    .event-item {
        display: flex;
        padding: 12px;
        background-color: #FFF;
        align-items: center;
        border-bottom: 1px solid #ccc;
        border-radius: 4px;
    }

    .event-item:hover {
        background-color: #F8F8F8
    }

    .event-item .avatar {
        width: 40px;
        height: 40px;
        border-radius: 20px;
        overflow: hidden;
        display: inline-block;
    }

    .event-item .avatar img {
        width: 40px;
        height: 40px;
    }

    .event-item .content {
        flex: 1;
        margin-left: 12px;
        align-items: center;
    }

    .event-item .author {
        margin-bottom: 2px;
    }

    .event-item .author .name {
        font-weight: bold;
        color: black;
    }

    .event-item .author .date {
        margin-left: 4px;
        color: #888;
    }

    .event-list .loading-more {
        padding: 12px;
        text-align: center;
    }

    .event-list .message {
        padding: 8px;
        color: #999;
        text-align: center;
    }

</style>
