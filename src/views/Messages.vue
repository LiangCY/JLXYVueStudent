<template>
    <div class="messages-page">
        <div class="loading" v-if="loading">
            <img :src="loadingSrc" alt="Loading icon"/>
        </div>
        <div v-else>
            <div class="weui_tab">
                <div class="weui_navbar">
                    <div class="weui_navbar_item {{current=='toMe'?'weui_bar_item_on':''}}"
                         v-on:click="select('toMe')">
                        收到的私信
                    </div>
                    <div class="weui_navbar_item {{current=='fromMe'?'weui_bar_item_on':''}}"
                         v-on:click="select('fromMe')">
                        发出的私信
                    </div>
                </div>
                <div class="weui_tab_bd">
                    <message-list :messages="messagesToMe" v-if="current=='toMe'"></message-list>
                    <message-list :messages="messagesFromMe" v-if="current=='fromMe'"></message-list>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import notie from 'notie';
    import LoadingBubbles from 'loading-svg/loading-bubbles.svg'
    import {URL_MESSAGES} from '../constants';
    import MessageList from '../components/MessageList';
    export default {
        data(){
            return {
                loadingSrc: LoadingBubbles,
                loading: false,
                current: 'toMe',
                messagesToMe: [],
                messagesFromMe: []
            }
        },
        components: {
            'message-list': MessageList
        },
        ready(){
            this.loading = true;
            this.$http.get(URL_MESSAGES, {}, {
                headers: {
                    'x-access-token': window.localStorage.getItem("jlxy_token")
                }
            }).then(function (response) {
                this.loading = false;
                let data = response.data
                if (data.error == 0) {
                    this.messagesToMe = data.receive;
                    this.messagesFromMe = data.send;
                } else {
                    notie.alert(3, data.message, 2);
                }
            }, function () {
                this.loading = false;
                notie.alert(3, '请求失败', 2);
            })
        },
        methods: {
            select: function (tab) {
                this.current = tab;
            }
        }
    }
</script>

<style>
    .messages-page {
        height: 100%;
    }

    .messages-page .loading {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>