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
                    <div></div>
                    <div></div>
                </div>
                <h2>CHALLENGE</h2>
            </div>
        </div>
        <div class="btn">
            <router-link tag="p" :to="{ name: 'challenge' }" replace>START!</router-link>
        </div>
        <p>try to answer more as you can</p>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.main {
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.header {
    display: flex;
}

.header h1 {
    color: #fff;
    font-size: 15rem;
    text-shadow: 12px 0 0 black;
}

.header h2 {
    font-size: 6rem;
}

.headerSlide {
    width: 473px;
    margin-left: 20px;
    display: flex;
    flex-wrap: wrap;
    align-content: center;
}

.slidebox {
    width: 85px;
    margin-left: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.slidebox div {
    border-top: 4px solid #fff;
    margin: 2px 0;
}

.slidebox p {
    font-size: 2.75rem;
    font-weight: bold;
    color: #fff;
}

.main > p {
    color: #fff;
    font-size: 1.5rem;
}
</style>