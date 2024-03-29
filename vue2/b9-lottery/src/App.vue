<template>
    <div id="wheel" v-cloak v-if="prizes">
        <div id="prize-box">
            <div
                class="prize"
                :class="{ active: idx === prizeIdx && !drawing }"
                v-for="(prize, idx) in prizes"
                :key="prize.name"
                :style="{ transform: getPrizeTransform(idx) }"
            >
                <div
                    class="prize-content"
                    style="transform: skewY(30deg) rotate(30deg) translate(70px, 45px);"
                >
                    <div class="prize-icon">
                        <i class="material-icons">{{prize.icon}}</i>
                    </div>
                    <div class="prize-text">{{prize.name}}</div>
                    <div class="prize-count">{{prize.total}}</div>
                </div>
            </div>
        </div>
        <div class="pointer" :style="`transform: rotate(${pointerDeg}deg) scale(.75)`">
            <button class="press" :class="{ disable: drawing || !leftPrizes.length }" @click="draw">PRESS</button>
        </div>
        <div id="well-done" v-if="prize && !drawing">
            <div class="text">
                <p>
                    WELL
                    <br />DONE!
                </p>
            </div>
            <div class="get">
                <p>YOUR GET A FREE...</p>
                <p class="item">{{prize.name}}!</p>
            </div>
            <div class="icon" v-for="n in 10" :key="n">
                <i class="material-icons">{{prize.icon}}</i>
            </div>
        </div>
    </div>
</template>

<script>
import _ from 'lodash';
export default {
    name: 'app',
    data() {
        return {
            prizes: null, // 所有禮物
            prizeIdx: null, // 抽中的禮物陣列索引
            lastPrizeIdx: null, // 上次抽中的禮物陣列索引
            pointerDeg: 0, // 指針角度
            drawing: false, // 是否開獎中
        }
    },
    computed: {
        // 剩餘禮物
        leftPrizes() {
            return this.prizes.filter(val => val.total);
        },
        // 抽中的禮物
        prize() {
            return this.prizes[this.prizeIdx];
        },
    },
    methods: {
        getPrizeTransform(idx) {
            let deg = -30 + 60 * idx;
            return `rotate(${deg}deg) skewY(-30deg)`;
        },
        draw() {
            this.drawing = true;
            this.getRandomPrize();
            this.setPointerDeg();
            setTimeout(() => {
                this.prizes[this.prizeIdx].total--; // 動畫結束後將抽中禮物的數量-1
                this.drawing = false;
            }, 6000);
            this.lastPrizeIdx = this.prizeIdx;
        },
        getRandomPrize() {
            let prizeIdx = _.random(0, this.leftPrizes.length - 1);
            let prizeName = this.leftPrizes[prizeIdx].name;
            this.prizeIdx = this.prizes.findIndex(val => val.name === prizeName);
        },
        setPointerDeg() {
            let deg = 360 * 6 + this.prizeIdx * 60;
            let lastDeg = this.lastPrizeIdx ? this.lastPrizeIdx * 60 : 0;
            this.pointerDeg += deg - lastDeg; // 本次角度 + 上次角度 - 上次相對於原點的角度
        },
    },
    created() {
        fetch('db.json')
            .then(res => res.json())
            .then(res => this.prizes = res)
            .catch(err => console.error(err));
    },
}
</script>

<style lang="scss">
body,
html {
    background: #5858b9;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: "Roboto Condensed", sans-serif;
    font-weight: bold;
}
p {
    margin: 0;
}
#wheel {
    width: 549px;
    height: 549px;
    display: flex;
    justify-content: center;
    align-items: center;
}
#wheel::after {
    content: "";
    width: 549px;
    height: 549px;
    background: transparent url("~@/assets/wheel-outside.svg") 50% 50% no-repeat
        padding-box;
    position: absolute;
    z-index: 10;
}
.pointer {
    position: absolute;
    width: 200px;
    height: 289px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 6s cubic-bezier(0.38, 0.22, 0.1, 0.99) 0s;
    z-index: 15;
    transform-origin: 100px 145px;
}
.pointer::after {
    content: "";
    width: 200px;
    height: 289px;
    background: transparent url("~@/assets/hand.svg") 50% 0% no-repeat
        padding-box;
    position: absolute;
    z-index: 20;
    pointer-events: none;
}
.press {
    height: 105px;
    width: 105px;
    background: #1f1172;
    outline: none;
    border: none;
    border-radius: 50%;
    padding: 0;
    color: #ff00ba;
    font-size: 32px;
    font-family: "Roboto Condensed", sans-serif;
    z-index: 15;
    cursor: pointer;
    &.disable {
        cursor: default;
        pointer-events: none;
    }
}
.years {
    height: 35px;
    width: 80px;
    background: #1f1172;
    outline: none;
    border: none;
    border-radius: 10px;
    padding: 0;
    color: #ff00ba;
    font-size: 18px;
    font-family: "Roboto Condensed", sans-serif;
    z-index: 15;
    margin-left: 10px;
}
.refresh {
    background: #f0beff;
    color: #343caa;
    padding-top: 2px;
}
#change-year {
    position: absolute;
    top: 20px;
    left: 20px;
    display: flex;
    align-items: center;
}
/** PRIZE **/
#prize-box {
    width: 497px;
    height: 497px;
    border-radius: 50%;
    background-color: #343caa;
    z-index: 4;
    position: absolute;
    overflow: hidden;
}
.prize {
    width: 50%;
    height: 50%;
    background-color: #f0beff;
    color: #343caa;
    border: 1px solid #1f1172;
    position: absolute;
    top: 0;
    right: 0;
    transform-origin: 0 100%;
    box-sizing: border-box;
}
.prize.active {
    background-color: #ff00ba;
    color: white;
}
.prize.active:nth-of-type(2n) {
    background-color: #ff00ba;
    color: white;
}
.prize:nth-of-type(2n) {
    background-color: #343caa;
    color: #f0beff;
}
.prize-content {
    width: 100px;
    height: 100px;
    display: flex;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
.small {
    width: 60px;
    height: 60px;
}
.prize-icon i {
    font-family: "Material Icons";
    font-weight: normal;
    font-style: normal;
    font-size: 4rem;
}
.prize-text {
    font-size: 2rem;
}
.prize-count {
    height: 45px;
    width: 30px;
    background-color: #343caa;
    color: #f0beff;
    text-align: center;
    border-radius: 10px;
    margin-top: 5px;
}
.prize:nth-of-type(2n) .prize-count {
    background-color: #f0beff;
    color: #343caa;
}
/** Well Done! **/
#well-done {
    width: 100%;
    height: 237px;
    position: absolute;
    background: #343baa;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;
    overflow: hidden;
}
#well-done .text {
    font-size: 72px;
    margin-left: 8%;
    line-height: 72px;
    z-index: 5;
}
#well-done .get {
    font-size: 32px;
    margin-right: 6%;
    z-index: 3;
}
#well-done .get .item {
    font-size: 72px;
    color: #ff00ba;
    text-decoration: underline;
}
#well-done .icon {
    position: absolute;
    top: 150px;
    left: -1%;
    z-index: 2;
}
#well-done .icon:nth-of-type(3) {
    top: 25px;
    left: 2%;
    transform: rotate(20deg);
}
#well-done .icon:nth-of-type(4) {
    top: 210px;
    left: 5%;
    transform: rotate(-30deg);
}
#well-done .icon:nth-of-type(5) {
    top: -10px;
    left: 20%;
    transform: rotate(-30deg);
}
#well-done .icon:nth-of-type(6) {
    top: 150px;
    left: 28%;
}
#well-done .icon:nth-of-type(7) {
    top: -5px;
    left: 70%;
}
#well-done .icon:nth-of-type(8) {
    top: 210px;
    left: 78%;
    transform: rotate(20deg);
}
#well-done .icon:nth-of-type(9) {
    top: 150px;
    left: 92%;
    transform: rotate(-20deg);
}
#well-done .icon:nth-child(10) {
    top: 20px;
    left: 98%;
    transform: rotate(20deg);
}
#well-done .icon i {
    font-size: 3rem;
    color: #22299b;
}
</style>
