<template>
    <div class="index-page">
        <user-panel></user-panel>
        <grids>
            <grid v-link="'events'" label="消息" image-url="/static/images/icons/event.png"></grid>
            <grid v-link="'lessons'" label="课程" image-url="/static/images/icons/lesson.png"></grid>
            <grid v-link="'tasks'" label="作业" image-url="/static/images/icons/homework.png"></grid>
            <grid v-link="'resources'" label="资源" image-url="/static/images/icons/resource.png"></grid>
            <grid v-link="'messages'" label="私信" image-url="/static/images/icons/message.png"></grid>
            <grid link="some-link" label="讨论区" image-url="/static/images/icons/talk.png"></grid>
        </grids>
    </div>
</template>

<script>
    import {Grids,Grid} from 'vue-weui';
    import UserPanel from '../components/UserPanel';
    export default {
        components: {
            Grids, Grid, UserPanel
        }
    }
</script>