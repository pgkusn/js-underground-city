<template>
    <div class="main2">
        <div class="header2">
            <div class="score">
                <div>60 SECONDS CHALLENGE</div>
                <div>SCORE</div>
                <p>{{displayScore}}</p>
            </div>
            <div class="time">
                <p>00</p>
                <p>:</p>
                <p>{{time < 10 ? `0${time}` : time}}</p>
            </div>
        </div>
        <div class="game">
            <p>{{num1}}</p>
            <p>{{displayOpSign}}</p>
            <p>{{num2}}</p>
            <p>=</p>
            <div class="answer">
                <input type="text" @keyup.enter="submit" v-focus />
                <p>press enter to answer</p>
            </div>
        </div>
    </div>
</template>

<script>
import _ from 'lodash';
export default {
    data() {
        return {
            level: null,
            num1: '',
            num2: '',
            op: '',
            time: 60,
        }
    },
    computed: {
        score() {
            return this.$store.state.score;
        },
        opSigns() {
            return ['+', '-', '*', '/'];
        },
        displayOpSign() {
            return this.op.replace(/\//g, '÷').replace(/\*/g, 'x');
        },
        displayScore() {
            return this.score.toString().padStart(3, 0);
        },
        ans() {
            return Math.floor(this.looseJsonParse(this.num1 + this.op + this.num2));
        },
    },
    watch: {
        time(val) {
            this.level = this.getLevel(val);
        }
    },
    methods: {
        submit() {
            // check answer
            let result = Math.floor(event.target.value) === this.ans;

            // set score
            let score = this.score;
            score = result ? score + 1 : this.score > 0 ? score - 1 : 0;
            this.$store.commit('updateScore', score);

            this.newQuestion();

            event.target.value = '';
        },
        getRandomNum() {
            switch (this.level) {
                case 1:
                    return _.random(1, 9);
                    break;
                case 2:
                    return _.random(10, 99);
                    break;
                case 3:
                    return _.random(100, 999);
                    break;
                default:
                    break;
            }
        },
        looseJsonParse(obj) { // 取代eval()
            return Function('"use strict";return (' + obj + ')')();
        },
        getLevel(time) {
            if (time >= 40) {
                return 1;
            }
            else if (time < 40 && time >= 20) {
                return 2;
            }
            else if (time < 20) {
                return 3;
            }
        },
        setTimer() {
            let timer = setInterval(() => {
                if (this.time === 0) {
                    clearInterval(timer);
                    this.$router.replace({ name: 'final' });
                }
                this.time = this.time > 0 ? this.time - 1 : 0;
            }, 1000);
        },
        newQuestion() {
            this.num1 = this.getRandomNum();
            this.num2 = this.getRandomNum();
            this.op = this.opSigns[_.random(0, 3)];
        },
    },
    mounted() {
        this.level = this.getLevel(this.time);
        this.setTimer();
        this.newQuestion();
    },
}
</script>

<style scoped>
.main2 {
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.header2 {
    width: 730px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.score {
    width: 342px;
    display: flex;
    flex-wrap: wrap;
}

.score div {
    width: 100%;
    height: 51px;
    line-height: 43px;
    border: 4px solid #fff;
    color: #fff;
    box-sizing: border-box;
    text-align: center;
    font-size: 1.875rem;
    font-weight: bold;
}

.score div:nth-of-type(2) {
    color: #ff9d00;
    border: none;
    background-color: #fff;
    width: 114px;
    height: 55px;
    line-height: 55px;
}

.score p {
    font-size: 2.75rem;
    font-weight: bold;
    margin-left: 8px;
}

.time {
    width: 260px;
    display: flex;
    color: #fff;
    font-size: 6rem;
    font-weight: bold;
    font-style: italic;
}

.time p {
    margin: 0 10px;
}
.game {
    margin-top: 114px;
    font-size: 7rem;
    display: flex;
    font-weight: bold;
}
.game > p {
    margin: 0 15px;
}

.game > p:nth-of-type(2n) {
    color: #fff;
}

.answer {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: 30px;
}
.answer input {
    width: 255px;
    height: 131px;
    border: 0;
    outline: none;
    font-size: 7rem;
    font-weight: bold;
    text-align: center;
}

.answer p {
    font-size: 1.5rem;
    color: #fff;
    font-weight: normal;
}
</style>