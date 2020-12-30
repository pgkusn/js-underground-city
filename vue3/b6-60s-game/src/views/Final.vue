<template>
    <div class="main3">
        <div class="final">
            <div>60 SECONDS CHALLENGE</div>
            <div>
                <span>—</span> YOUR FINAL SCORE
                <span>—</span>
            </div>
            <div>{{ score }}</div>
        </div>
        <div class="btn" @click.prevent="restart">
            TRY AGAIN!
        </div>
    </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
    setup () {
        const store = useStore();
        const router = useRouter();

        const score = computed(() => store.state.score);

        const restart = () => {
            router.replace({ name: 'Home' });
            setTimeout(() => {
                store.commit('zeroing');
            }, 1000);
        };

        return {
            score,
            restart
        };
    }
};
</script>

<style scoped>
.main3 {
    display: flex;
    flex-direction: column;
    margin: auto;
    align-items: center;
    justify-content: center;
}

.final {
    display: flex;
    flex-direction: column;
    font-weight: bold;
    align-items: center;
}

.final div:nth-of-type(1) {
    box-sizing: border-box;
    width: 342px;
    height: 51px;
    border: 4px solid #fff;
    color: #fff;
    text-align: center;
    font-size: 1.875rem;
    line-height: 43px;
}
.final span {
    color: #fff;
}
.final div:nth-of-type(2) {
    margin-top: 8px;
    font-size: 3.5rem;
}
.final div:nth-of-type(3) {
    font-size: 7rem;
}
</style>
