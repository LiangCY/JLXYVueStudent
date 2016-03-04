<template>
    <div v-show='!refreshing' class="floating button" v-on:click="refresh">
        <i class="material-icons md-light">cached</i>
    </div>
    <event-list v-ref:events></event-list>
</template>

<script>
    import EventList from '../components/EventList.vue';
    export default {
        data: {
            refreshing: false
        },
        components: {
            EventList
        },
        methods: {
            refresh: function () {
                this.$refs.events.fetchEvents();
            }
        }
    }
</script>

<style>

    .material-icons.md-light {
        color: rgba(255, 255, 255, 1);
    }

    .floating.button {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 48px;
        width: 48px;
        border-radius: 24px;
        position: fixed;
        z-index: 9999;
        background: #4CAF50;
        bottom: 24px;
        right: 24px;
        box-shadow: #888 2px 2px 5px;
    }

    .floating.button:hover {
        background: #2C9F30;
    }
</style>