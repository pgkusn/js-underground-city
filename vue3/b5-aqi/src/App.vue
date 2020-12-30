<template>
    <template v-if="!isEmpty(aqiData)">
        <div class="top-wrapper">
            <div class="left">
                <h1>空氣品質指標(AQI)</h1>
                <select id="location" v-model="currentCounty">
                    <option v-for="(value, name) in aqiData" :key="name" :value="name">
                        {{ name }}
                    </option>
                </select>
            </div>
            <div class="right">
                <ul>
                    <li>
                        <p class="li-top">
                            0~50
                        </p>
                        <p class="li-bottom">
                            普通
                        </p>
                    </li>
                    <li>
                        <p class="li-top">
                            51~100
                        </p>
                        <p class="li-bottom">
                            良好
                        </p>
                    </li>
                    <li>
                        <p class="li-top">
                            101～150
                        </p>
                        <p class="li-bottom">
                            對敏感族群
                            <br>不健康
                        </p>
                    </li>
                    <li>
                        <p class="li-top">
                            151～200
                        </p>
                        <p class="li-bottom">
                            對所有族群
                            <br>不健康
                        </p>
                    </li>
                    <li>
                        <p class="li-top">
                            201～300
                        </p>
                        <p class="li-bottom">
                            非常不健康
                        </p>
                    </li>
                    <li>
                        <p class="li-top">
                            301～400
                        </p>
                        <p class="li-bottom">
                            危害
                        </p>
                    </li>
                </ul>
            </div>
        </div>
        <div class="separation">
            <div class="separation-city">
                {{ currentCounty }}
            </div>
            <div class="separation-dashed" />
            <div class="update-time">
                {{ updateTime }}
            </div>
            <span>更新</span>
        </div>
        <div class="bottom-wrapper">
            <div class="information">
                <div class="card">
                    <div class="location">
                        {{ siteInfo.SiteName }}
                    </div>
                    <div class="number" :class="statusStyle(siteInfo.AQI)">
                        {{ siteInfo.AQI }}
                    </div>
                </div>
                <ul class="detail">
                    <li>
                        <span class="name">臭氧</span>
                        <span class="unit">O3 (ppb)</span>
                        <span class="detail-number">{{ siteInfo['O3'] }}</span>
                    </li>
                    <li>
                        <span class="name">懸浮微粒</span>
                        <span class="unit">PM10 (μg/m³)</span>
                        <span class="detail-number">{{ siteInfo['PM10'] }}</span>
                    </li>
                    <li>
                        <span class="name">細懸浮微粒</span>
                        <span class="unit">PM2.5 (μg/m³)</span>
                        <span class="detail-number">{{ siteInfo['PM2.5'] }}</span>
                    </li>
                    <li>
                        <span class="name">一氧化碳</span>
                        <span class="unit">CO (ppm)</span>
                        <span class="detail-number">{{ siteInfo['CO'] }}</span>
                    </li>
                    <li>
                        <span class="name">二氧化硫</span>
                        <span class="unit">SO2 (ppb)</span>
                        <span class="detail-number">{{ siteInfo['SO2'] }}</span>
                    </li>
                    <li>
                        <span class="name">二氧化氮</span>
                        <span class="unit">NO2 (ppb)</span>
                        <span class="detail-number">{{ siteInfo['NO2'] }}</span>
                    </li>
                </ul>
            </div>
            <ul class="card-section">
                <li
                    v-for="site in sites"
                    :key="site.SiteId"
                    class="card hvr-float-shadow"
                    @click="currentSite = site.SiteName"
                >
                    <div class="location">
                        {{ site.SiteName }}
                    </div>
                    <div class="number" :class="statusStyle(site.AQI)">
                        {{ site.AQI }}
                    </div>
                </li>
            </ul>
        </div>
    </template>
    <div v-else id="Loading">
        <div class="loader-inner ball-beat">
            <div />
            <div />
            <div />
        </div>
    </div>
</template>

<script>
import { computed, onMounted, ref, watch } from 'vue';
import axios from 'axios';
import groupBy from 'lodash/groupBy';
import isEmpty from 'lodash/isEmpty';
import dayjs from 'dayjs';

export default {
    name: 'App',
    setup () {
        const aqiData = ref({});
        const updateTime = ref('');
        const currentCounty = ref('');
        const currentSite = ref('');

        const sites = computed(() => aqiData.value[currentCounty.value]);
        const siteInfo = computed(() => sites.value?.find(value => value.SiteName === currentSite.value) || {});

        watch(aqiData, value => {
            currentCounty.value = Object.keys(value)[0]; // 預設縣市
        });
        watch(sites, value => {
            currentSite.value = value[0].SiteName; // 預設地區
        });

        onMounted(async () => {
            const { data } = await axios('/webapi/Data/REWIQA/?$orderby=SiteName&$skip=0&$top=1000&format=json');
            aqiData.value = groupBy(data, item => item.County);
            updateTime.value = dayjs().format('YYYY/MM/DD HH:mm:ss');
        });

        const statusStyle = aqi => {
            if (aqi <= 50) {
                return 'background-green';
            }
            else if (aqi >= 51 && aqi <= 100) {
                return 'background-yellow';
            }
            else if (aqi >= 101 && aqi <= 150) {
                return 'background-orange';
            }
            else if (aqi >= 151 && aqi <= 200) {
                return 'background-peach-red';
            }
            else if (aqi >= 201 && aqi <= 300) {
                return 'background-purple';
            }
            else if (aqi >= 301 && aqi <= 400) {
                return 'background-wine-red';
            }
        };

        return {
            aqiData,
            updateTime,
            currentCounty,
            currentSite,
            sites,
            siteInfo,
            isEmpty,
            statusStyle
        };
    }

};
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
    background: #f0f0f0;
    font-family: 'Noto Sans', sans-serif;
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
    margin: 0 auto;
    width: 1110px;
}

.top-wrapper {
    display: flex;
    margin: 0 auto;
    margin-top: 40px;
    width: 1110px;
    align-items: center;
    .left {
        display: inline-block;
        width: 350px;
        h1 {
            margin: 0 0 8px 0;
            font-size: 40px;
        }

        #location {
            width: 350px;
            height: 56px;
            border: solid 3px #000;
            font-size: 24px;
        }
    }

    .right {
        display: inline-block;
        margin-left: 30px;
        width: 730.32px;
        height: 110px;
        ul {
            display: flex;
            margin: 0;
            padding: 0;
            border: 3px solid #000;
            letter-spacing: -5px;
            li {
                display: inline-block;
                width: 120.67px;
                height: 110px;
                border-right: 3px solid #000;
                background: red;
                letter-spacing: normal;
                font-weight: bold;
                font-size: 16px;
                p {
                    display: flex;
                    padding: 4px 18px;
                    text-align: center;
                    align-items: center;
                    justify-content: center;
                }

                .li-top {
                    margin: 0;
                    height: 54px;
                    border-bottom: 3px solid #000;
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
    white-space: nowrap;
    font-weight: bold;
    align-items: center;
    .separation-city {
        margin-right: 10px;
        width: 108px;
        font-weight: bold;
        font-size: 36px;
    }

    .separation-dashed {
        position: relative;
        display: block;
        width: 100%;
    }

    .separation-dashed::after {
        position: absolute;
        top: 50%;
        right: 0;
        left: 0;
        border: 1px dashed black;
        content: '';
    }

    .update-time {
        margin: 0 10px;
        height: 22px;
        font-size: 16px;
        line-height: 22px;
    }
}

.bottom-wrapper {
    display: flex;
    margin-top: 40px;
    margin-bottom: 40px;
    align-items: flex-start;
}

.information {
    width: 350px;
    border: 3px solid #000;
}

.card {
    display: flex;
    width: 348px;
    height: 97px;
    border-bottom: 3px solid #000;
    text-align: center;
    font-weight: bold;
    cursor: pointer;
    .location {
        display: flex;
        width: 190px;
        border-right: 3px solid #000;
        font-size: 36px;
        justify-content: center;
        align-items: center;
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
        padding: 18px 0;
        width: 100%;
        border-bottom: 1px solid #000;
        list-style: none;
        align-items: center;
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
            font-weight: normal;
            font-size: 16px;
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
    margin: 0;
    padding: 0;

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
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 100;
    transform: translateY(-50%) translateX(-50%);
}
@-webkit-keyframes ball-beat {
    50% {
        opacity: .2;
        transform: scale(.75);
    }

    100% {
        opacity: 1;
        transform: scale(1);
    }
}

@keyframes ball-beat {
    50% {
        opacity: .2;
        transform: scale(.75);
    }

    100% {
        opacity: 1;
        transform: scale(1);
    }
}

.ball-beat > div {
    display: inline-block;
    margin: 2px;
    width: 15px;
    height: 15px;
    border-radius: 100% !important;
    background-color: #279fcf;
    animation: ball-beat .7s 0s infinite linear;
    animation-fill-mode: both;
}
.ball-beat > div:nth-child(2n-1) {
    animation-delay: .35s !important;
}
</style>
