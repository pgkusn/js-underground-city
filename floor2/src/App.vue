<template>
    <div class="clock">
        <div
            class="hour pointer"
            :style="{ transform: `translate(-50%, -100%) rotate(${hourDeg}deg)` }"
        ></div>
        <div
            class="min pointer"
            :style="{ transform: `translate(-50%, -100%) rotate(${minDeg}deg)` }"
        ></div>
        <div
            class="second pointer"
            :style="{ transform: `translate(-50%, -100%) rotate(${secondDeg}deg)` }"
        ></div>
    </div>
</template>

<script>

export default {
    name: 'app',
    data() {
        return {
            hourDeg: 0,
            minDeg: 0,
            secondDeg: 0,
        }
    },
    methods: {
        setTime() {
            const date = new Date();
            this.hourDeg = date.getHours() * 30 + date.getMinutes() * 30 / 60;
            this.minDeg = date.getMinutes() * 6 + date.getSeconds() * 6 / 60;
            this.secondDeg = date.getSeconds() * 6;
            requestAnimationFrame(this.setTime);
        }
    },
    mounted() {
        requestAnimationFrame(this.setTime);
    },
}
</script>

<style lang="scss">
@import url("~@/assets/reset.scss");
body {
    display: flex;
    height: 100vh;
}
.clock {
    position: relative;
    margin: auto;
    width: 500px;
    height: 500px;
    background: url("~@/assets/clock-bg.svg");
}
.pointer {
    position: absolute;
    top: 50%;
    left: 50%;
    transform-origin: 50% 100%;
}
.hour {
    width: 8px;
    height: 72px;
    background: url("~@/assets/hour-hand.png");
}
.min {
    width: 8px;
    height: 96px;
    background: url("~@/assets/minute-hand.png");
}
.second {
    width: 14px;
    height: 126px;
    background: url("~@/assets/second-hand.png");
}
</style>
