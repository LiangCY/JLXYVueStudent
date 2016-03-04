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
    <div class="load-more" v-if="hasMore" v-on:click="loadMore">{{loadingMore?'加载中...':'加载更多'}}</div>
</template>

<script>
    import notie from 'notie'
    import {URL_EVENTS} from '../constants'
    export default {
        data () {
            return {
                events: [],
                hasMore: false,
                loading: false,
                loadingMore: false
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
            loadMore(){
                if (this.loading || this.loadingMore) return
                this.loadingMore = true
                this.fetchEvents(this.events.length + 30, true)
            },
            fetchEvents(count, isLoadMore){
                if (this.loading) return
                this.loading = true
                this.$parent.refreshing = true
                count = count || 30;
                this.$http.get(URL_EVENTS, {count: count}).then(function (response) {
                    let data = response.data
                    if (data.error == 0) {
                        this.events = data.events
                        this.hasMore = data.hasMore
                        console.log(data.events)
                    } else {
                        notie.alert(3, data.message, 2)
                    }
                    this.loading = false
                    this.$parent.refreshing = false
                    if (isLoadMore) {
                        this.loadingMore = false
                    } else {
                        $('html, body').animate({scrollTop: 0}, 500)
                    }
                }, function () {
                    notie.alert(3, '请求失败', 2)
                    this.loading = false
                    this.$parent.refreshing = false
                    if (isLoadMore) {
                        this.loadingMore = false
                    }
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

    .load-more {
        padding: 12px;
        color: #2b669a;
        text-align: center;
    }

    .load-more:hover {
        background-color: #DDD
    }

</style>
