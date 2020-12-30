<template>
    <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
            <component :is="Component" />
        </transition>
    </router-view>
</template>

<script>
export default {
    name: 'App'
};
</script>

<style>
* {
    margin: 0;
    padding: 0;
}

body {
    background-color: #ff9d00;
    font-family: 'Roboto Condensed', sans-serif;
}

#app {
    display: flex;
    height: 100vh;
}

.btn {
    margin-top: 104px;
    width: 350px;
    height: 58px;
    background-color: black;
    color: #ff9d00;
    text-align: center;
    font-weight: bold;
    font-size: 2.25rem;
    line-height: 58px;
    cursor: pointer;
}

/* transition */
.fade-enter-active {
    transition: all .3s ease;
}
.fade-leave-active {
    transition: all .8s cubic-bezier(1.0, .5, .8, 1.0);
}
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    transform: translateX(10px);
}
</style>
