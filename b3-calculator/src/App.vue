<template>
    <div id="app" class="container">
        <div class="row displayboard">
            <div class="col">
                <span>{{temp}}</span>
                <br />
                <span>{{currentNum}}</span>
            </div>
        </div>
        <div class="row">
            <button class="col" @click="appendNum('7')">7</button>
            <button class="col" @click="appendNum('8')">8</button>
            <button class="col" @click="appendNum('9')">9</button>
            <button class="col operations" @click="calc('÷')">÷</button>
        </div>
        <div class="row">
            <button class="col" @click="appendNum('4')">4</button>
            <button class="col" @click="appendNum('5')">5</button>
            <button class="col" @click="appendNum('6')">6</button>
            <button class="col operations" @click="calc('x')">x</button>
        </div>
        <div class="row">
            <button class="col" @click="appendNum('1')">1</button>
            <button class="col" @click="appendNum('2')">2</button>
            <button class="col" @click="appendNum('3')">3</button>
            <button class="col operations" @click="calc('+')">+</button>
        </div>
        <div class="row">
            <button class="col" @click="appendNum('0')">0</button>
            <button class="col" @click="appendNum('00')">00</button>
            <button class="col" @click="appendNum('.')">.</button>
            <button class="col operations" @click="calc('-')">-</button>
        </div>
        <div class="row">
            <div class="col erase">
                <button class="ac" @click="erase('ac')">AC</button>
                <button class="del" @click="erase">⌫</button>
            </div>
            <button class="col operations equ" @click="calc('=')">=</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'app',
    data() {
        return {
            currentNum: '0',
            temp: '',
        }
    },
    methods: {
        appendNum(num) {
            if (this.currentNum === '0' && (num === '0' || num === '00')) {
                this.currentNum = '0';
                return;
            }
            if (num === '.') {
                if (/\./.test(this.currentNum)) return;
            }
            if (this.currentNum === '0' && num !== '.') {
                this.currentNum = '';
            }
            this.currentNum += num;
        },
        erase(type) {
            if (type === 'ac') {
                this.currentNum = '0';
                this.temp = '';
            }
            else {
                this.currentNum = this.currentNum.length > 1 ? this.currentNum.slice(0, this.currentNum.length - 1) : '0';
            }
        },
        calc(symbol) {
            switch (symbol) {
                case '÷':
                    console.log('÷');
                    break;
                case 'x':
                    console.log('x');
                    break;
                case '+':
                    console.log('+');
                    break;
                case '-':
                    console.log('-');
                    break;
                case '=':
                    console.log('=');
                    break;
                default:
                    break;
            }
            this.temp = this.currentNum + symbol;
        }
    },
}
</script>

<style>
body {
    display: flex;
    height: 100vh;
}
.container {
    width: 350px;
    margin: auto;
    border: 1px solid #041936;
    border-radius: 20px 20px 20px 20px;
    background: #062145;
    color: #ffffff;
    box-shadow: rgba(0, 0, 0, 0.4) 0px 20px 40px;
}
.displayboard {
    background: #041936;
    border: 1px solid #041936;
    border-radius: 20px 20px 0px 0px;
}
button {
    background: #062145;
    border: 0px;
    color: #ffffff;
}
.operations {
    background-color: #041936;
    width: 72px;
    height: 64px;
    border-radius: 16px;
}
.equ {
    background: linear-gradient(to right, #00c4ff, #6c00ff);
    width: 155px;
    height: 64px;
    border-radius: 16px;
}
span:first-child {
    float: right;
    color: #00c4ff;
    font-size: 12px;
}
span {
    float: right;
    font-size: 2.5rem;
}
.active {
    font-size: 1.5rem;
}
.col {
    padding: 0;
    margin: 16px;
    font-size: 24px;
    text-align: center;
}
.col-6 {
    padding: 0;
    margin: 16px;
    font-size: 24px;
    text-align: center;
}
.erase {
    display: flex;
}
.ac {
    float: left;
    color: #00c4ff;
    padding: 0;
    flex-grow: 1;
}
.del {
    float: right;
    color: #00c4ff;
    padding: 0;
    flex-grow: 1;
}
</style>
