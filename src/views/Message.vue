<template>
    <div class="message-page">
        <div class="loading" v-if="loading">
            <img :src="loadingSrc" alt="Loading icon"/>
        </div>
        <div v-else>
            <div class="from">
                <div class="header">
                    <div class="avatar">
                        <img :src="'http://219.219.117.114/avatar/'+message.fromId">
                    </div>
                    <div class="text">
                        <div class="title">{{message.title}}</div>
                        <div class="date">{{message.createAt}}</div>
                        <div class="subtitle">
                            {{message.from}}
                        </div>
                    </div>
                </div>
                <article class="weui_article message">
                    {{message.content||'无内容'}}
                </article>
            </div>
            <div class="to">
                <div class="header">
                    <div class="avatar">
                        <img :src="'http://219.219.117.114/avatar/'+message.fromId">
                    </div>
                    <div class="text">
                        <div class="date">{{message.updateAt}}</div>
                        <div class="subtitle">
                            {{message.to}}
                        </div>
                    </div>
                </div>
                <div v-if="message.toMe">
                    <div v-if="message.reply">
                        <article class="weui_article message">
                            {{message.reply}}
                        </article>
                    </div>
                    <div v-else>
                        <div class="weui_cells weui_cells_form">
                            <div class="weui_cell">
                                <div class="weui_cell_bd weui_cell_primary">
                                <textarea class="weui_textarea" placeholder="请输入回复"
                                          rows="3" v-model="reply">
                                </textarea>
                                </div>
                            </div>
                        </div>
                        <div class="button_area">
                            <button class="weui_btn weui_btn_primary"
                                    v-on:click="replyMessage">回复
                            </button>
                        </div>
                    </div>
                </div>
                <div v-else>
                    <article class="weui_article message">
                        {{message.reply||'未回复'}}
                    </article>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import notie from 'notie';
    import LoadingBubbles from 'loading-svg/loading-bubbles.svg'
    import {URL_MESSAGE, URL_MESSAGE_REPLY} from '../constants';
    export default {
        data(){
            return {
                loadingSrc: LoadingBubbles,
                loading: true,
                message: null,
                reply: '',
                replying: false
            }
        },
        route: {
            data(transition){
                var messageId = transition.to.params.messageId;
                this.fetchMessage(messageId);
            }
        },
        methods: {
            fetchMessage: function (messageId) {
                this.$http.get(URL_MESSAGE + messageId, {}, {
                    headers: {
                        'x-access-token': window.localStorage.getItem("jlxy_token")
                    }
                }).then(function (response) {
                    this.loading = false;
                    let data = response.data
                    if (data.error == 0) {
                        this.message = data.message;
                    } else {
                        notie.alert(3, data.message, 2);
                    }
                }, function () {
                    this.loading = false;
                    notie.alert(3, '请求失败', 2);
                })
            },
            replyMessage: function () {
                if (this.replying) return;
                if (!this.reply) {
                    return notie.alert(3, '请输入回复内容', 2);
                }
                this.replying = true;
                this.$http({
                    url: URL_MESSAGE_REPLY,
                    method: 'post',
                    data: {
                        messageId: this.message._id,
                        reply: this.reply
                    },
                    headers: {
                        'x-access-token': window.localStorage.getItem("jlxy_token")
                    }
                }).then(function (response) {
                    this.replying = false;
                    let data = response.data
                    if (data.error == 0) {
                        this.fetchMessage(this.message._id);
                    } else {
                        notie.alert(3, data.message, 2);
                    }
                }, function () {
                    this.replying = false;
                    notie.alert(3, '请求失败', 2);
                });
            }
        }
    }
</script>

<style>
    .message-page .loading {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .message-page .from {
        border-bottom: 1px solid #CCC;
        margin-bottom: 12px;
    }

    .message-page .header {
        display: flex;
        flex-direction: row;
        padding: 8px 16px;
        align-items: center;
    }

    .message-page .avatar {
        align-items: center;
        width: 60px;
        height: 48px;
    }

    .message-page .avatar img {
        width: 48px;
        height: 48px;
        border-radius: 24px;
    }

    .message-page .header .text {
        flex: 1;
        flex-direction: column;
    }

    .message-page .header .title {
        font-size: 1.3em;
        font-weight: bold;
    }

    .message-page .header .date {
        float: right;
        font-size: 0.9em;
        color: #888;
    }

    .message-page .header .subtitle {
        font-size: 0.9em;
        color: #555;
    }

    .message-page article.message {
        padding: 8px 16px;
    }

    .message-page .button_area {
        margin-top: 12px;
        padding: 8px;
    }

</style>
