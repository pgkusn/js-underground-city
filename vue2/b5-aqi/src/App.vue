<template>
    <div id="app">
        <template v-if="counties.length">
            <div class="top-wrapper">
                <div class="left">
                    <h1>空氣品質指標(AQI)</h1>
                    <select id="location" v-model="selectCounty">
                        <option v-for="item in countyList" :key="item" :value="item">{{item}}</option>
                    </select>
                </div>
                <div class="right">
                    <ul>
                        <li>
                            <p class="li-top">0~50</p>
                            <p class="li-bottom">普通</p>
                        </li>
                        <li>
                            <p class="li-top">51~100</p>
                            <p class="li-bottom">良好</p>
                        </li>
                        <li>
                            <p class="li-top">101～150</p>
                            <p class="li-bottom">
                                對敏感族群
                                <br />不健康
                            </p>
                        </li>
                        <li>
                            <p class="li-top">151～200</p>
                            <p class="li-bottom">
                                對所有族群
                                <br />不健康
                            </p>
                        </li>
                        <li>
                            <p class="li-top">201～300</p>
                            <p class="li-bottom">非常不健康</p>
                        </li>
                        <li>
                            <p class="li-top">301～400</p>
                            <p class="li-bottom">危害</p>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="separation">
                <div class="separation-city">{{selectCounty}}</div>
                <div class="separation-dashed"></div>
                <div class="update-time">{{currentSite.PublishTime}}</div>
                <span>更新</span>
            </div>
            <div class="bottom-wrapper">
                <div class="information">
                    <div class="card">
                        <div class="location">{{currentSite.SiteName}}</div>
                        <div class="number" :class="statusStyle(currentSite.AQI)">{{currentSite.AQI}}</div>
                    </div>
                    <ul class="detail">
                        <li>
                            <span class="name">臭氧</span>
                            <span class="unit">O3 (ppb)</span>
                            <span class="detail-number">{{currentSite['03']}}</span>
                        </li>
                        <li>
                            <span class="name">懸浮微粒</span>
                            <span class="unit">PM10 (μg/m³)</span>
                            <span class="detail-number">{{currentSite.PM10}}</span>
                        </li>
                        <li>
                            <span class="name">細懸浮微粒</span>
                            <span class="unit">PM2.5 (μg/m³)</span>
                            <span class="detail-number">{{currentSite['PM2.5']}}</span>
                        </li>
                        <li>
                            <span class="name">一氧化碳</span>
                            <span class="unit">CO (ppm)</span>
                            <span class="detail-number">{{currentSite.CO}}</span>
                        </li>
                        <li>
                            <span class="name">二氧化硫</span>
                            <span class="unit">SO2 (ppb)</span>
                            <span class="detail-number">{{currentSite.SO2}}</span>
                        </li>
                        <li>
                            <span class="name">二氧化氮</span>
                            <span class="unit">NO2 (ppb)</span>
                            <span class="detail-number">{{currentSite.NO2}}</span>
                        </li>
                    </ul>
                </div>
                <ul class="card-section">
                    <li class="card hvr-float-shadow" v-for="item in currentCounty" :key="item.SiteId" @click="selectSiteId = item.SiteId">
                        <div class="location">{{item.SiteName}}</div>
                        <div class="number" :class="statusStyle(item.AQI)">{{item.AQI}}</div>
                    </li>
                </ul>
            </div>
        </template>
        <div id="Loading" v-else>
            <div class="loader-inner ball-beat">
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'app',
    data() {
        return {
            counties: [],
            selectCounty: '',
            selectSiteId: '',
        }
    },
    computed: {
        countyList() {
            let origin = this.counties.map(val => val.County);
            let result = Array.from(new Set(origin)); // 移除重複陣列
            this.selectCounty = result[0]; // 指定預設城市(第一筆)
            return result;
        },
        currentCounty() {
            let county = this.counties.filter(val => val.County === this.selectCounty);
            this.selectSiteId = county[0] && county[0].SiteId; // 指定預設地區(第一筆)
            return county;
        },
        currentSite() {
            return this.currentCounty.find(val => val.SiteId === this.selectSiteId);
        }
    },
    methods: {
        fetchData() {
            // 資料來源：https://opendata.epa.gov.tw/Data/Contents/AQI
            return fetch('https://opendata.epa.gov.tw/api/v1/AQI?$format=json').then(res => res.json());
            // return fetch('db.json').then(res => res.json()); // dev data
        },
        statusStyle(aqi) {
            if (!aqi) return;
            if (aqi <= 50) {
                return 'background-green';
            }
            else if (aqi >= 51 && aqi <= 100 ) {
                return 'background-yellow';
            }
            else if (aqi >= 101 && aqi <= 150 ) {
                return 'background-orange';
            }
            else if (aqi >= 151 && aqi <= 200 ) {
                return 'background-peach-red';
            }
            else if (aqi >= 201 && aqi <= 300 ) {
                return 'background-purple';
            }
            else if (aqi >= 301 && aqi <= 400 ) {
                return 'background-wine-red';
            }
        }
    },
    created() {
        this.fetchData().then(res => this.counties = res);
    },
}
</script>

<style lang="scss">
$green: #95f084;
$yellow: #ffe695;
$orange: #ffaf6a;
$peach-red: #ff5757;
$purple: #9777ff;
$wine-red: #ad1774;

* {
    box-sizing: border-box;
}

body {
    font-family: "Noto Sans", sans-serif;
    background: #f0f0f0;
}

.background-green {
    background: $green;
}

.background-yellow {
    background: $yellow;
}

.background-orange {
    background: $orange;
}

.background-peach-red {
    background: $peach-red;
}

.background-purple {
    background: $purple;
}

.background-wine-red {
    background: $wine-red;
}

#app {
    width: 1110px;
    margin: 0 auto;
}

.top-wrapper {
    width: 1110px;
    margin: 0 auto;
    margin-top: 40px;
    display: flex;
    align-items: center;
    .left {
        display: inline-block;
        width: 350px;
        h1 {
            font-size: 40px;
            margin: 0 0 8px 0;
        }

        #location {
            width: 350px;
            height: 56px;
            border: solid 3px #000000;
            font-size: 24px;
        }
    }

    .right {
        display: inline-block;
        width: 730.32px;
        height: 110px;
        margin-left: 30px;
        ul {
            margin: 0;
            padding: 0;
            letter-spacing: -5px;
            border: 3px solid #000000;
            display: flex;
            li {
                letter-spacing: normal;
                display: inline-block;
                width: 120.67px;
                height: 110px;
                background: red;
                border-right: 3px solid #000000;
                font-size: 16px;
                font-weight: bold;
                p {
                    text-align: center;
                    padding: 4px 18px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .li-top {
                    margin: 0;
                    height: 54px;
                    border-bottom: 3px solid #000000;
                }

                .li-bottom {
                    margin: 0;
                    height: 56px;
                    background: white;
                }
            }

            li:first-of-type .li-top {
                background: $green;
            }

            li:nth-of-type(2) .li-top {
                background: $yellow;
            }

            li:nth-of-type(3) .li-top {
                background: $orange;
            }

            li:nth-of-type(4) .li-top {
                background: $peach-red;
            }

            li:nth-of-type(5) .li-top {
                background: $purple;
            }

            li:last-child .li-top {
                background: $wine-red;
            }

            li:last-child {
                border: 0;
            }
        }
    }
}

.separation {
    display: flex;
    margin: 30px 0;
    height: 54px;
    align-items: center;
    font-weight: bold;
    white-space: nowrap;
    .separation-city {
        width: 108px;
        font-size: 36px;
        font-weight: bold;
        margin-right: 8px;
    }

    .separation-dashed {
        display: block;
        position: relative;
        width: 100%;
    }

    .separation-dashed::after {
        content: "";
        position: absolute;
        top: 50%;
        left: 0;
        right: 0;
        border: 1px dashed black;
    }

    .update-time {
        font-size: 16px;
        width: 137px;
        height: 22px;
        line-height: 22px;
        margin: 0 22px 0 12px;
    }
}

.bottom-wrapper {
    margin-top: 40px;
    margin-bottom: 40px;
    display: flex;
    align-items: flex-start;
}

.information {
    width: 350px;
    border: 3px solid #000;
}

.card {
    display: flex;
    font-weight: bold;
    text-align: center;
    width: 348px;
    height: 97px;
    border-bottom: 3px solid #000;
    cursor: pointer;
    .location {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 190px;
        font-size: 36px;
        border-right: 3px solid #000;
    }
    .number {
        padding: 22px 30px;
        width: 160px;
        font-size: 48px;
        line-height: 48px;
        @at-root {
            .information .card .number {
                width: 154px;
            }
        }
    }
}

ul.detail {
    margin: 0;
    padding: 30px;
    li {
        display: flex;
        align-items: center;
        width: 100%;
        list-style: none;
        padding: 18px 0;
        border-bottom: 1px solid #000;
        .name,
        .detail-number {
            font-weight: bold;
            font-size: 24px;
        }
        .name {
            margin-right: 8px;
        }
        .unit {
            flex: 1 0 0;
            font-size: 16px;
            font-weight: normal;
        }
    }
    li:first-child {
        padding-top: 0;
    }

    li:last-child {
        padding-bottom: 0;
        border-bottom: 0;
    }
}

ul.card-section {
    padding: 0;
    margin: 0;

    .card {
        border: 3px solid #000;
    }

    li {
        display: flex;
        float: left;
        margin: 0 0 20px 20px;
        box-shadow: 3px 5px 0 0 gray;
        .flex-wrapper {
            display: flex;
        }
    }
}

// LOADING
#Loading {
    top: 50%;
    left: 50%;
    position: absolute;
    -webkit-transform: translateY(-50%) translateX(-50%);
    transform: translateY(-50%) translateX(-50%);
    z-index: 100;
}
@-webkit-keyframes ball-beat {
    50% {
        opacity: 0.2;
        -webkit-transform: scale(0.75);
        transform: scale(0.75);
    }

    100% {
        opacity: 1;
        -webkit-transform: scale(1);
        transform: scale(1);
    }
}

@keyframes ball-beat {
    50% {
        opacity: 0.2;
        -webkit-transform: scale(0.75);
        transform: scale(0.75);
    }

    100% {
        opacity: 1;
        -webkit-transform: scale(1);
        transform: scale(1);
    }
}

.ball-beat > div {
    background-color: #279fcf;
    width: 15px;
    height: 15px;
    border-radius: 100% !important;
    margin: 2px;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    display: inline-block;
    -webkit-animation: ball-beat 0.7s 0s infinite linear;
    animation: ball-beat 0.7s 0s infinite linear;
}
.ball-beat > div:nth-child(2n-1) {
    -webkit-animation-delay: 0.35s !important;
    animation-delay: 0.35s !important;
}
</style>