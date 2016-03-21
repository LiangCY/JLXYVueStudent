<template>
    <div class="message-list">
        <div class="message-item" v-for="message in messages">
            <div class="avatar">
                <img :src="'http://219.219.117.114/avatar/'+message.userId">
            </div>
            <div class="content">
                <div class="user">
                    <span class="name">{{message.from||message.to}}</span>
                <span class="date">
                    {{message.createAt}}
                </span>
                </div>
                <div class="title">
                    {{{message.title}}}
                </div>
            </div>
            <div v-show="message.isNew" class="new"></div>
        </div>
    </div>
</template>

<script>
    import notie from 'notie'
    import $ from 'jquery'
    import LoadingBubbles from 'loading-svg/loading-spin.svg'
    import {URL_EVENTS} from '../constants'
    export default {
        props: ['messages'],
        methods: {}
    }
</script>

<style>
    .message-item {
        display: flex;
        padding: 12px;
        background-color: #FFF;
        align-items: center;
        border-bottom: 1px solid #ccc;
        border-radius: 4px;
    }

    .message-item:hover {
        background-color: #F8F8F8
    }

    .message-item .avatar {
        width: 40px;
        height: 40px;
        border-radius: 20px;
        overflow: hidden;
        display: inline-block;
    }

    .message-item .avatar img {
        width: 40px;
        height: 40px;
    }

    .message-item .content {
        flex: 1;
        margin-left: 12px;
        align-items: center;
    }

    .message-item .user {
        margin-bottom: 2px;
    }

    .message-item .user .name {
        font-weight: bold;
        color: black;
    }

    .message-item .user .date {
        margin-left: 4px;
        color: #888;
        font-size: .9em;
    }

    .message-item .new {
        background-color: #4CAF50;
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
    }
</style>
