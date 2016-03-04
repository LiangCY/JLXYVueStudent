<template>
    <div v-if='!refreshing' transition='fade' class="floating button" v-on:click="refresh">
        <i class="material-icons md-light">cached</i>
    </div>
    <event-list v-ref:list></event-list>
</template>

<script>
    import EventList from '../components/EventList.vue';
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

    .material-icons.md-light {
        color: rgba(255, 255, 255, 1);
    }

    .fade-enter, .fade-leave {
        opacity: 0;
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
        transition: all .4s ease;
    }

    .floating.button:hover {
        background: #2C9F30;
    }
</style>