<template>
    <div class="task-page">
        <div class="loading" v-if="loading">
            <img :src="loadingSrc" alt="Loading icon"/>
        </div>
        <div v-else>
            <div class="header">
                <div class="title">{{task.taskTitle}}</div>
                <div class="date">{{task.deadline?task.deadline+'截止':''}}</div>
                <div class="subtitle">
                    {{task.lesson}}
                </div>
            </div>
            <article class="weui_article task">
                <h3>作业要求</h3>
                {{{task.taskContent}}}
            </article>
            <h3 class="homework title">我的作业</h3>
            <article class="weui_article homework">
                <h3>标题</h3>
                {{{task.homework.title}}}
                <h3>内容</h3>
                {{{task.homework.content}}}
                <h3>成绩</h3>
                <p v-if="!task.homework||task.homework.status==0">未提交</p>
                <p v-if="task.homework.status==1">未批改</p>
                <p v-if="task.homework.status==2">{{task.homework.grade}}</p>
                <p v-if="task.homework.status==3">申请重交中</p>
                <p v-if="task.homework.status==4">可重新提交</p>
            </article>
        </div>
    </div>
</template>
<script>
    import notie from 'notie';
    import LoadingBubbles from 'loading-svg/loading-bubbles.svg'
    import {URL_TASK} from '../constants';
    export default {
        data(){
            return {
                loadingSrc: LoadingBubbles,
                loading: true,
                task: null
            }
        },
        route: {
            data(transition){
                var taskId = transition.to.params.taskId;
                this.$http.get(URL_TASK + taskId, {}, {
                    headers: {
                        'x-access-token': window.localStorage.getItem("jlxy_token")
                    }
                }).then(function (response) {
                    this.loading = false;
                    let data = response.data
                    if (data.error == 0) {
                        console.log(data)
                        this.task = data.task;
                    } else {
                        notie.alert(3, data.message, 2);
                    }
                }, function () {
                    this.loading = false;
                    notie.alert(3, '请求失败', 2);
                })
            }
        },
        methods: {}
    }
</script>

<style>
    .task-page .loading {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .task-page .header {
        padding: 8px 16px;
    }

    .task-page .header .title {
        font-size: 1.3em;
        font-weight: bold;
    }

    .task-page .header .date {
        float: right;
        font-size: 0.9em;
        color: #888;
    }

    .task-page .header .subtitle {
        font-size: 0.9em;
        color: #555;
    }

    h3.homework.title {
        font-size: 1.2em;
        font-weight: bold;
        margin: 12px 16px 0;
    }

    article.task {
        padding: 8px 16px;
        border-bottom: 1px solid #DDD;
    }

    article.homework {
        padding: 8px 16px;
    }

    article.weui_article h3 {
        font-weight: bold;
    }

</style>
