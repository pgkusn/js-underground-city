<template>
    <div class="main">
        <div class="header">
            <div>
                <h1>60</h1>
            </div>
            <div class="headerSlide">
                <h2>SECONDS</h2>
                <div class="slidebox">
                    <p>+−×÷</p>
                    <div />
                    <div />
                </div>
                <h2>CHALLENGE</h2>
            </div>
        </div>
        <div class="btn" @click.prevent="start">
            START!
        </div>
        <p>try to answer more as you can</p>
    </div>
</template>

<script>
import { useRouter } from 'vue-router';

export default {
    name: 'Home',
    setup () {
        const router = useRouter();
        const start = () => {
            router.replace({ name: 'Challenge' });
        };
        return {
            start
        };
    }
};
</script>

<style scoped>
.main {
    display: flex;
    flex-direction: column;
    margin: auto;
    align-items: center;
    justify-content: center;
}

.header {
    display: flex;
}

.header h1 {
    color: #fff;
    text-shadow: 12px 0 0 black;
    font-size: 15rem;
}

.header h2 {
    font-size: 6rem;
}

.headerSlide {
    display: flex;
    margin-left: 20px;
    width: 473px;
    flex-wrap: wrap;
    align-content: center;
}

.slidebox {
    display: flex;
    flex-direction: column;
    margin-left: 10px;
    width: 85px;
    justify-content: center;
}

.slidebox div {
    margin: 2px 0;
    border-top: 4px solid #fff;
}

.slidebox p {
    color: #fff;
    font-weight: bold;
    font-size: 2.75rem;
}

.main > p {
    color: #fff;
    font-size: 1.5rem;
}
</style>
