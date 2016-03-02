<template>
    <form>
        <div class="form-group">
            <label for="username">用户名</label>
            <input type="text" class="form-control" id="username" placeholder="用户名">
        </div>
        <div class="form-group">
            <label for="password">密码</label>
            <input type="password" class="form-control" id="password" placeholder="密码">
        </div>
        <button type="submit" class="btn btn-primary">登录</button>
    </form>
</template>
<script>
    import {buttons} from 'vue-strap'
    export default {
        components: {
            buttons
        }
    }
</script>
<style>
    html {
        height: 100%;
    }
    body {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
    }
</style>
