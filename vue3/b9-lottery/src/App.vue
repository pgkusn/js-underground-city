<template>
    <div id="wheel" v-if="prizes.length">
        <div id="prize-box">
            <div class="prize" v-for="(prize, i) in prizes" :key="prize.name" :style="{ transform: getPrizeStyle(i) }">
                <div class="prize-content" style="transform: skewY(30deg) rotate(30deg) translate(70px, 45px)">
                    <div class="prize-icon">
                        <i class="material-icons">{{ prize.icon }}</i>
                    </div>
                    <div class="prize-text">{{ prize.name }}</div>
                    <div class="prize-count">{{ prize.total }}</div>
                </div>
            </div>
        </div>
        <div class="pointer" :style="`transform: rotate(${currentPointDeg}deg) scale(0.75)`">
            <button class="press" @click="draw">PRESS</button>
        </div>
        <div id="well-done" v-if="winPrize && !isDrawing">
            <div class="text">
                <p>WELL<br />DONE!</p>
            </div>
            <div class="get">
                <p>YOUR GET A FREE...</p>
                <p class="item">{{ winPrize.name }}!</p>
            </div>
            <div class="icon" v-for="n in 10" :key="n">
                <i class="material-icons">{{ winPrize.icon }}</i>
            </div>
        </div>
    </div>
</template>

<script>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import axios from 'axios';
import { random } from 'lodash';

axios.defaults.baseURL = 'http://localhost:3001/prizes';

export default {
    name: 'App',
    setup() {
        const prizes = ref([]);

        onMounted(async () => {
            try {
                const { data } = await axios('/');
                prizes.value = data;
            } catch (error) {
                console.error(error.message);
            }

            window.addEventListener('keyup', keyupHandler);
        });

        onBeforeUnmount(() => {
            window.removeEventListener('keyup', keyupHandler);
        });

        const keyupHandler = () => {
            if (event.key === ' ') {
                draw();
            }
        };

        const getPrizeStyle = index => {
            const deg = -30 + 60 * index - 1;
            return `rotate(${deg}deg) skewY(-30deg)`;
        };

        // 計算指針角度
        const currentPointDeg = ref(0);
        const targetPointerDeg = computed(() => -30 + 60 * winIndex.value);

        // 開始抽獎
        const isDrawing = ref(false);
        const winIndex = ref(null);
        const winPrize = computed(() => prizes.value[winIndex.value]);
        const draw = () => {
            // 確認剩餘獎項數
            const allPrizesTotal = prizes.value.reduce(
                (previousValue, currentValue) => previousValue + currentValue.total,
                0
            );

            if (isDrawing.value || !allPrizesTotal) return;

            // 取得中獎獎項
            const ranWinIndex = random(prizes.value.length - 1);
            if (!prizes.value[ranWinIndex].total) {
                draw();
                return;
            }
            const resetDeg = winIndex.value * 60; // 目前指針與起點之間的角度
            winIndex.value = ranWinIndex;

            // 開始轉動
            isDrawing.value = true;
            const transitionDeg = 360 * 6 + 30; // 多轉6圈 + 30度偏移
            currentPointDeg.value = currentPointDeg.value + transitionDeg + targetPointerDeg.value - resetDeg;
            setTimeout(async () => {
                // 扣除已中獎的獎項數
                if (winPrize.value.total) {
                    try {
                        const { data } = await axios({
                            method: 'patch',
                            url: `/${winPrize.value.id}`,
                            data: {
                                total: winPrize.value.total - 1,
                            },
                        });
                        prizes.value[winIndex.value].total = data.total;
                    } catch (error) {
                        console.error(error.message);
                    }
                }
                isDrawing.value = false;
            }, 6000);
        };

        return {
            prizes,
            getPrizeStyle,
            draw,
            winPrize,
            currentPointDeg,
            isDrawing,
        };
    },
};
</script>
