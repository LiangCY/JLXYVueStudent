<template>
    <div class="lessons-page">
        <div class="loading" v-if="loading">
            <img :src="loadingSrc" alt="Loading icon"/>
        </div>
        <div v-else>
            <div class="message" v-if="lessons.length==0">
                您当前学期没有课程
            </div>
            <div class="weui_cells weui_cells_access" v-else>
                <template v-for="lesson in lessons">
                    <a class="weui_cell" v-link="{name:'lesson',params:{lessonId:lesson.id}}">
                        <div class="weui_cell_bd weui_cell_primary">
                            <p>{{lesson.courseName}}</p>
                        </div>
                        <div class="weui_cell_ft">
                            {{lesson.teachers}}
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
    import {URL_LESSONS} from '../constants';
    export default {
        data(){
            return {
                loadingSrc: LoadingBubbles,
                loading: false,
                lessons: []
            }
        },
        ready(){
            this.loading = true;
            this.$http.get(URL_LESSONS, {}, {
                headers: {
                    'x-access-token': window.localStorage.getItem("jlxy_token")
                }
            }).then(function (response) {
                this.loading = false;
                let data = response.data
                if (data.error == 0) {
                    this.lessons = data.lessons;
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
    .lessons-page {
        height: 100%;
    }

    .lessons-page .loading {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .lessons-page .message {
        margin-top: 12px;
        margin-bottom: 12px;
        text-align: center;
        color: #888;
    }
</style>