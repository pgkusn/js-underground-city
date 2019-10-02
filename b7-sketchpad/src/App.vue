<template>
    <div id="app">
        <div class="cv__wrap">
            <canvas
                id="canvas"
                width="0"
                height="0"
                ref="canvas"
                @mousemove="onMouseMove"
                @mousedown="onMouseDown"
                @mouseup="onMouseUp"
            ></canvas>
            <div class="cursur__pointer"></div>
            <div class="top__panel__wrap">
                <a class="action" download="myCanvas.png">
                    <i class="fas fa-save"></i>
                    <p class="text">SAVE</p>
                </a>
                <div class="action">
                    <i class="far fa-trash-alt"></i>
                    <p class="text">CLEAR ALL</p>
                </div>
                <label class="action" for="file">
                    <i class="fas fa-cloud-upload-alt"></i>
                    <p class="text">UPLOAD IMAGE</p>
                    <input type="file" id="file" hidden accept="image/jpeg, image/png" />
                </label>
                <div class="action">
                    <i class="fas fa-chevron-left"></i>
                    <p class="text">UNDO</p>
                </div>
                <div class="action">
                    <i class="fas fa-chevron-right"></i>
                    <p class="text">REDO</p>
                </div>
                <!-- <div class="action">
                    <i class="fas fa-barcode"></i>
                    <div class="text">FILTER</div>
                    <ul class="filterList">
                        <li>Black&White</li>
                        <li>Brighter</li>
                    </ul>
                </div>-->
                <div class="top__panel__bar">
                    <i class="fas fa-chevron-up"></i>
                </div>
            </div>
            <div class="bot__panel__wrap">
                <div class="action">
                    <i class="fas fa-pen"></i>
                </div>
                <div class="action">
                    <i class="fas fa-eraser"></i>
                </div>
                <div class="action">
                    <div class="label">SIZE:</div>
                    <input type="text" />px
                </div>
                <div class="action">
                    <div class="label">COLOR:</div>
                    <div class="color__options">
                        <span class="option"></span>
                        <span class="option"></span>
                        <span class="option"></span>
                        <span class="option"></span>
                        <span class="option"></span>
                        <input type="color" class="option" />
                    </div>
                </div>
                <div class="bot__panel__bar">
                    <i class="fas fa-chevron-down"></i>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'app',
    data() {
        return {
            ctx: null,
            isMouseDown: false,
            lineWidth: 10,
            strokeStyle: '#faa',
            oldX: 0,
            oldY: 0,
        }
    },
    methods: {
        init() {
            const canvas = this.$refs.canvas;

            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            /** @type {CanvasRenderingContext2D} */
            this.ctx = canvas.getContext('2d');
            this.ctx.lineCap = 'round';
            this.ctx.lineJoin = 'round';
        },
        onMouseMove() {
            if (this.isMouseDown) {
                this.draw();
            }
        },
        onMouseDown() {
            this.isMouseDown = true;
            this.oldX = event.offsetX;
            this.oldY = event.offsetY;
        },
        onMouseUp() {
            this.isMouseDown = false;
        },
        draw() {
            this.ctx.lineWidth = this.lineWidth;
            this.ctx.strokeStyle = this.strokeStyle;

            this.ctx.beginPath();
            this.ctx.moveTo(this.oldX, this.oldY);
            this.ctx.lineTo(event.offsetX, event.offsetY);
            this.ctx.stroke();

            this.oldX = event.offsetX;
            this.oldY = event.offsetY;
        }
    },
    mounted() {
        this.init();
    },
}
</script>

<style lang="scss">
#app {
    font-family: "Segoe UI", "Avenir", Helvetica, Arial, sans-serif, 微軟正黑體;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #e5e5e5;
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}
.cv__wrap {
    width: 100%;
    height: 100%;
    font-weight: bold;
    position: relative;
    overflow: hidden;
    text-align: right;
    &.is-collapse {
        .top__panel__wrap {
            transform: translateY(-80px);
        }
        .bot__panel__wrap {
            transform: translate(-50%, 120px);
        }
    }
    #canvas {
        position: absolute;
        top: 0;
        left: 0;
    }
    .cursur__pointer {
        position: absolute;
        border-radius: 50%;
        pointer-events: none;
    }
    .top__panel__wrap {
        height: 80px;
        background-color: #ffffff;
        text-align: center;
        position: relative;
        transition: all 0.5s;
        min-width: 510px;
        .action {
            margin-right: 36px;
            display: inline-flex;
            height: 100%;
            cursor: pointer;
            transition: all 0.3s;
            color: black;
            text-decoration: none;
            i {
                font-size: 36px;
                line-height: 80px;
            }
            .text {
                font-size: 20px;
                margin-left: 10px;
                line-height: 80px;
            }
            &.is-disable {
                opacity: 0.5;
                cursor: not-allowed;
                &:hover {
                    transform: none;
                }
            }
            &:hover {
                transform: translateY(-5px);
            }
            .filterList {
                position: absolute;
                list-style: none;
                top: 70px;
                background-color: lightgray;
                padding: 20px 16px;
                text-align: left;
                color: #333;
                transition: all 0.5s;
                border-radius: 10px;
                line-height: 2;
                word-wrap: nowrap;
                &:after {
                    content: "";
                    position: absolute;
                    width: 0;
                    height: 0;
                    top: -19px;
                    left: calc(50% - 10px);
                    border-bottom: 10px solid lightgray;
                    border-right: 10px solid transparent;
                    border-left: 10px solid transparent;
                    border-top: 10px solid transparent;
                }
                li {
                    transition: all 0.3s;
                    &:hover {
                        transform: translateY(-3px);
                    }
                }
            }
        }
        .top__panel__bar {
            position: absolute;
            top: calc(100% - 28px);
            left: calc(50% - 28px);
            background-color: inherit;
            color: black;
            width: 56px;
            height: 56px;
            border-radius: 50%;
            cursor: pointer;
            i {
                position: absolute;
                top: 60%;
                left: 50%;
                left: calc(50% - 5px);
                font-size: 10px;
                &:hover {
                    transform: scale(1.1);
                }
            }
        }
    }
    .bot__panel__wrap {
        position: absolute;
        height: 80px;
        width: fit-content;
        background-color: #fff;
        border-radius: 40px;
        bottom: 40px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        justify-content: center;
        transition: all 0.5s;
        padding: 0 30px;
        min-width: 803px;
        .action {
            line-height: 80px;
            font-size: 20px;
            & + .action {
                margin-left: 30px;
            }
            .label {
                display: inline-block;
            }
            i.fas {
                font-size: 36px;
            }
            &:nth-child(3) {
                .label {
                    margin-right: 16px;
                    & + input[type="text"] {
                        background-color: #e8e8e8;
                        width: 74px;
                        height: 48px;
                        border-radius: 40px;
                        border: none;
                        margin-right: 8px;
                        outline: none;
                        text-align: center;
                        font-size: 24px;
                    }
                }
            }
            &:nth-child(4) {
                display: flex;
                .label {
                    margin-right: 16px;
                }
                .color__options {
                    display: flex;
                    align-items: center;
                    .option {
                        display: inline-block;
                        width: 48px;
                        height: 48px;
                        border-radius: 50%;
                        & + .option {
                            margin-left: 8px;
                        }
                        &:first-child {
                            border: 1px solid black;
                            background-color: #fff;
                        }
                        &:nth-child(2) {
                            background-color: #000;
                        }
                        &:nth-child(3) {
                            background-color: #9bffcd;
                        }
                        &:nth-child(4) {
                            background-color: #00cc99;
                        }
                        &:nth-child(5) {
                            background-color: #01936f;
                        }
                    }
                    input[type="color"] {
                        background: none;
                        border: none;
                        border-radius: 50%;
                    }
                }
            }
        }
        .bot__panel__bar {
            position: absolute;
            top: -28px;
            left: calc(50% - 28px);
            background-color: white;
            color: black;
            width: 56px;
            height: 56px;
            border-radius: 50%;
            z-index: -1;
            cursor: pointer;
            i {
                position: absolute;
                top: 20%;
                left: calc(50% - 5px);
                font-size: 10px;
            }
        }
    }
}
</style>
