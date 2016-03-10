<template>
    <div class="tasks-page">
        <div class="loading" v-if="loading">
            <img :src="loadingSrc" alt="Loading icon"/>
        </div>
        <div v-else>
            <div class="message" v-if="tasks.length==0">
                您当前学期没有作业
            </div>
            <div class="weui_cells weui_cells_access" v-else>
                <template v-for="task in tasks">
                    <a class="weui_cell" v-link="{name:'task',params:{taskId:task.taskId}}">
                        <div class="weui_cell_bd weui_cell_primary">
                            <p>{{task.taskTitle}}</p>
                        </div>
                        <div class="weui_cell_ft">
                            {{task.lesson}}
                        </div>
                    </a>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
    import notie from 'notie';
    import LoadingBubbles from 'loading-svg/loading-bubbles.svg'
    import {URL_TASKS} from '../constants';
    export default {
        data(){
            return {
                loadingSrc: LoadingBubbles,
                loading: false,
                tasks: []
            }
        },
        ready(){
            this.loading = true;
            this.$http.get(URL_TASKS, {}, {
                headers: {
                    'x-access-token': window.localStorage.getItem("jlxy_token")
                }
            }).then(function (response) {
                this.loading = false;
                let data = response.data
                if (data.error == 0) {
                    this.tasks = data.tasks;
                } else {
                    notie.alert(3, data.message, 2);
                }
            }, function () {
                this.loading = false;
                notie.alert(3, '请求失败', 2);
            })
        },
        methods: {}
    }
</script>

<style>
    .tasks-page {
        height: 100%;
    }

    .tasks-page .loading {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .tasks-page .message {
        margin-top: 12px;
        margin-bottom: 12px;
        text-align: center;
        color: #888;
    }
</style>