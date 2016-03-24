<template>
    <div class="resource-page">
        <div class="loading" v-if="loading">
            <img :src="loadingSrc" alt="Loading icon"/>
        </div>
        <div v-else>
            <div class="header">
                <div class="title">{{resource.title}}</div>
                <div class="date">{{resource.createAt+'发布'}}</div>
                <div class="subtitle">
                    {{resource.lesson}}
                </div>
            </div>
            <article class="weui_article resource">
                <h3>资源描述</h3>
                {{{resource.description}}}
            </article>
        </div>
        <a href="{{'http://219.219.117.114'+resource.attachmentUrl}}" target="_blank"
           class="weui_btn weui_btn_primary download">下载链接</a>
    </div>
</template>
<script>
    import notie from 'notie';
    import LoadingBubbles from 'loading-svg/loading-bubbles.svg'
    import {URL_RESOURCE} from '../constants';
    export default {
        data(){
            return {
                loadingSrc: LoadingBubbles,
                loading: true,
                resource: null
            }
        },
        route: {
            data(transition){
                var resourceId = transition.to.params.resourceId;
                this.$http.get(URL_RESOURCE + resourceId, {}, {
                    headers: {
                        'x-access-token': window.localStorage.getItem("jlxy_token")
                    }
                }).then(function (response) {
                    this.loading = false;
                    let data = response.data
                    if (data.error == 0) {
                        this.resource = data.resource;
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
    .resource-page .loading {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .resource-page .header {
        padding: 8px 16px;
    }

    .resource-page .header .title {
        font-size: 1.3em;
        font-weight: bold;
    }

    .resource-page .header .date {
        float: right;
        font-size: 0.9em;
        color: #888;
    }

    .resource-page .header .subtitle {
        font-size: 0.9em;
        color: #555;
    }

    .resource-page article.resource {
        padding: 8px 16px;
    }

    .resource-page a.download {
        margin: 12px 12px;
    }

</style>
