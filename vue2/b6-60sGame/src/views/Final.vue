<template>
    <div class="main3">
        <div class="final">
            <div>60 SECONDS CHALLENGE</div>
            <div>
                <span>—</span> YOUR FINAL SCORE
                <span>—</span>
            </div>
            <div>{{score}}</div>
        </div>
        <div class="btn">
            <router-link tag="p" :to="{ name: 'index' }" replace>TRY AGAIN!</router-link>
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        score() {
            return this.$store.state.score;
        },
    },
}
</script>

<style scoped>
.main3 {
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.final {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-weight: bold;
}

.final div:nth-of-type(1) {
    width: 342px;
    height: 51px;
    line-height: 43px;
    border: 4px solid #fff;
    color: #fff;
    box-sizing: border-box;
    text-align: center;
    font-size: 1.875rem;
}
.final span {
    color: #fff;
}
.final div:nth-of-type(2) {
    font-size: 3.5rem;
    margin-top: 8px;
}
.final div:nth-of-type(3) {
    font-size: 7rem;
}
</style>