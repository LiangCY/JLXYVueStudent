<template>
    <div class="lesson-page">
        <div class="loading" v-if="loading">
            <img :src="loadingSrc" alt="Loading icon"/>
        </div>
        <div v-else>
            <div class="header">
                <div class="title">{{lesson.courseName}}</div>
                <div class="subtitle">
                    {{lesson.term}}~{{lesson.term+1}} 第{{lesson.half}}学期
                </div>
            </div>
            <div class="weui_cells_title">任课教师</div>
            <div class="weui_cells weui_cells_access">
                <template v-for="teacher in lesson.teachers">
                    <a class="weui_cell">
                        <div class="weui_cell_hd">
                            <img :src="'http://219.219.117.114/avatar/'+teacher._id" alt="avatar" class="mini avatar">
                        </div>
                        <div class="weui_cell_bd weui_cell_primary">
                            <p>{{teacher.name}}</p>
                        </div>
                        <div class="weui_cell_ft">

                        </div>
                    </a>
                </template>
            </div>
            <div class="weui_cells_title">上课安排</div>
            <div class="weui_cells">
                <div class="weui_cell" v-for="item in lesson.plans">
                    <div class="weui_cell_bd weui_cell_primary">
                        {{item.day}} {{item.period}}
                    </div>
                    <div class="weui_cell_ft">
                        {{item.classroom}}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import notie from 'notie';
    import LoadingBubbles from 'loading-svg/loading-bubbles.svg'
    import {URL_LESSON} from '../constants';
    const days = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
    export default {
        data(){
            return {
                loadingSrc: LoadingBubbles,
                loading: true,
                lesson: null
            }
        },
        route: {
            data(transition){
                var lessonId = transition.to.params.lessonId;
                this.$http.get(URL_LESSON + lessonId, {}, {
                    headers: {
                        'x-access-token': window.localStorage.getItem("jlxy_token")
                    }
                }).then(function (response) {
                    this.loading = false;
                    let data = response.data
                    if (data.error == 0) {
                        var plans = data.lesson.plan.map(function (item) {
                            var day = days[item.day - 1];
                            var period = item.start + ' - ' + (item.start + item.period - 1) + '节';
                            return {
                                day: day,
                                period: period,
                                classroom: item.classroom
                            }
                        });
                        this.lesson = data.lesson;
                        this.lesson.plans = plans;
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
    .lesson-page .loading {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .lesson-page .header {
        padding: 8px 16px;
    }

    .lesson-page .header .title {
        font-size: 1.3em;
        font-weight: bold;
    }

    .lesson-page .header .subtitle {
        font-size: 0.9em;
        color: #666;
    }

    .lesson-page .weui_cells .mini.avatar {
        width: 24px;
        height: 24px;
        border-radius: 12px;
        overflow: hidden;
        margin-right: 8px;
        display: block
    }
</style>
