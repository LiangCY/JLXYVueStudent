<template>
    <div class="resources-page">
        <div class="loading" v-if="loading">
            <img :src="loadingSrc" alt="Loading icon"/>
        </div>
        <div v-else>
            <div class="message" v-if="resources.length==0">
                当前学期没有课程资源
            </div>
            <div class="weui_cells weui_cells_access" v-else>
                <template v-for="resource in resources">
                    <a class="weui_cell" v-link="{name:'resource',params:{resourceId:resource._id}}">
                        <div class="weui_cell_bd weui_cell_primary">
                            <p>{{resource.title}}</p>
                        </div>
                        <div class="weui_cell_ft">
                            {{resource.lesson}}
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
    import {URL_RESOURCES} from '../constants';
    export default {
        data(){
            return {
                loadingSrc: LoadingBubbles,
                loading: false,
                resources: []
            }
        },
        ready(){
            this.loading = true;
            this.$http.get(URL_RESOURCES, {}, {
                headers: {
                    'x-access-token': window.localStorage.getItem("jlxy_token")
                }
            }).then(function (response) {
                this.loading = false;
                let data = response.data
                if (data.error == 0) {
                    this.resources = data.resources;
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
    .resources-page {
        height: 100%;
    }

    .resources-page .loading {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .resources-page .message {
        margin-top: 12px;
        margin-bottom: 12px;
        text-align: center;
        color: #888;
    }
</style>