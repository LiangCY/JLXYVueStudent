<template>
    <div class="events-page">
        <div v-if='!refreshing' transition='fade' class="floating button" v-on:click="refresh">
            <i class="icono-sync"></i>
        </div>
        <event-list v-ref:list></event-list>
    </div>
</template>

<script>
    import EventList from '../components/EventList.vue';
    import $ from 'jquery'
    export default {
        data(){
            return {
                refreshing: false
            }
        },
        components: {
            EventList
        },
        methods: {
            refresh: function () {
                this.$refs.list.refresh();
            }
        }
    }
</script>

<style>
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
        transition: all .4s ease;
    }

    .floating.button:hover {
        background: #2C9F30;
    }
</style>