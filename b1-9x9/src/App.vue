<template>
    <div id="app" class="container">
        <ul>
            <li v-for="(item,i) in 9" :key="item" class="section">
                <div v-if="i===0">
                    <p>九九乘法表</p>
                    <p>MULTIPLICATION CHART</p>
                </div>
                <ul v-else>
                    <li>{{i+1}}</li>
                    <li v-for="(item,j) in 9" :key="item">{{i+1}} x {{j+1}} = {{(i+1)*(j+1)}}</li>
                </ul>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'app',
}
</script>

<style lang="scss" src="@/assets/sass/style.scss"></style>