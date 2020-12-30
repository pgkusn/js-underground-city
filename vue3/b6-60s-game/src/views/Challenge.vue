<template>
    <div class="main2">
        <div class="header2">
            <div class="score">
                <div>60 SECONDS CHALLENGE</div>
                <div>SCORE</div>
                <p>{{ displayScore }}</p>
            </div>
            <div class="time">
                <p>00</p>
                <p>:</p>
                <p>{{ displayTime }}</p>
            </div>
        </div>
        <div class="game">
            <p>{{ firstNum }}</p>
            <p>{{ displayOp }}</p>
            <p>{{ lastNum }}</p>
            <p>=</p>
            <div class="answer">
                <input
                    v-focus
                    type="text"
                    @keydown.enter="submitHandler"
                >
                <p>press enter to answer</p>
            </div>
        </div>
    </div>
</template>

<script>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import _random from 'lodash/random';

export default {
    name: 'Challenge',
    setup () {
        const store = useStore();
        const router = useRouter();

        // question - number
        const firstNum = ref(0);
        const lastNum = ref(0);

        // question - operator
        const opSign = ['+', '-', 'x', '÷'];
        const currentOp = ref(0);
        const displayOp = computed(() => opSign[currentOp.value]);

        // question - answer
        const answer = computed(() => {
            const firstNumVal = parseInt(firstNum.value, 10);
            const lastNumVal = parseInt(lastNum.value, 10);

            if (currentOp.value === 0) {
                return firstNumVal + lastNumVal;
            }
            if (currentOp.value === 1) {
                return firstNumVal - lastNumVal;
            }
            if (currentOp.value === 2) {
                return firstNumVal * lastNumVal;
            }
            if (currentOp.value === 3) {
                return Math.floor(firstNumVal / lastNumVal);
            }
        });

        // time & level
        const currentTime = ref(60);
        const timer = setInterval(() => {
            currentTime.value--;
            if (!currentTime.value) {
                clearInterval(timer);
                router.replace({ name: 'Final' });
            }
        }, 1000);
        const displayTime = computed(() => currentTime.value < 10 ? `0${currentTime.value}` : currentTime.value);
        const level = computed(() => currentTime.value >= 40 ? 1 : currentTime.value >= 20 ? 2 : 3);

        // score
        const score = computed(() => store.state.score);
        const displayScore = computed(() => score.value < 10 ? `00${score.value}` : score.value < 100 ? `0${score.value}` : score.value);

        const getRandom = digits => {
            const randomNum = [_random(1, 9), _random(10, 99), _random(100, 999)];
            return randomNum[digits - 1];
        };

        const makeQuestion = () => {
            firstNum.value = getRandom(level.value);
            lastNum.value = getRandom(level.value);
            currentOp.value = _random(3);
            console.log(`answer: ${answer.value}`);
        };

        const submitHandler = () => {
            if (!currentTime.value) return;

            const input = parseInt(event.target.value || 0, 10);
            if (input === answer.value) {
                const score = currentTime.value >= 20 ? 1 : 5;
                store.commit('addScore', score);
            }
            else if (store.state.score > 0) {
                store.commit('addScore', -1);
            }
            event.target.value = '';

            makeQuestion();
        };

        makeQuestion();

        return {
            firstNum,
            lastNum,
            displayOp,
            displayTime,
            displayScore,
            submitHandler
        };
    }
};
</script>

<style scoped>
.main2 {
    display: flex;
    flex-direction: column;
    margin: auto;
    align-items: center;
    justify-content: center;
}

.header2 {
    display: flex;
    width: 730px;
    align-items: center;
    justify-content: space-between;
}

.score {
    display: flex;
    width: 342px;
    flex-wrap: wrap;
}

.score div {
    box-sizing: border-box;
    width: 100%;
    height: 51px;
    border: 4px solid #fff;
    color: #fff;
    text-align: center;
    font-weight: bold;
    font-size: 1.875rem;
    line-height: 43px;
}

.score div:nth-of-type(2) {
    width: 114px;
    height: 55px;
    border: none;
    background-color: #fff;
    color: #ff9d00;
    line-height: 55px;
}

.score p {
    margin-left: 8px;
    font-weight: bold;
    font-size: 2.75rem;
}

.time {
    display: flex;
    width: 260px;
    color: #fff;
    font-weight: bold;
    font-style: italic;
    font-size: 6rem;
}

.time p {
    margin: 0 10px;
}
.game {
    display: flex;
    margin-top: 114px;
    font-weight: bold;
    font-size: 7rem;
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
    margin-left: 30px;
    align-items: center;
}
.answer input {
    width: 255px;
    height: 131px;
    outline: none;
    border: 0;
    text-align: center;
    font-weight: bold;
    font-size: 7rem;
}

.answer p {
    color: #fff;
    font-weight: normal;
    font-size: 1.5rem;
}
</style>
