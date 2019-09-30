<template>
    <div id="app">
        <transition name="fade" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
export default {
    name: 'app',
}
</script>

<style>
* {
    margin: 0;
    padding: 0;
}

body {
    background-color: #ff9d00;
    font-family: "Roboto Condensed", sans-serif;
}

#app {
    display: flex;
    height: 100vh;
}

.btn {
    background-color: black;
    margin-top: 104px;
    width: 350px;
    height: 58px;
    cursor: pointer;
}

.btn p {
    color: #ff9d00;
    font-size: 2.25rem;
    font-weight: bold;
    text-align: center;
    line-height: 58px;
}

/* transition */
.fade-enter-active {
  transition: all .3s ease;
}
.fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.fade-enter, .fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
</style>
