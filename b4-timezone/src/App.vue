<template>
    <div class="wrapper">
        <h1>World Clock</h1>
        <div class="clocks">
            <div class="timezone black" data-timezone="America/New_York">
                <div class="zone">
                    <div class="zone-name">New York</div>
                    <div class="zone-date">{{ny_date}}</div>
                </div>
                <div class="time">{{ny_time}}</div>
            </div>
            <div class="timezone" data-timezone="Europe/London">
                <div class="zone">
                    <div class="zone-name">London</div>
                    <div class="zone-date">{{lon_date}}</div>
                </div>
                <div class="time">{{lon_time}}</div>
            </div>
            <div class="timezone" data-timezone="Asia/Bangkok">
                <div class="zone">
                    <div class="zone-name">Bangkok</div>
                    <div class="zone-date">{{bkk_date}}</div>
                </div>
                <div class="time">{{bkk_time}}</div>
            </div>
            <div class="timezone" data-timezone="Asia/Taipei">
                <div class="zone">
                    <div class="zone-name">Taiwan</div>
                    <div class="zone-date">{{tw_date}}</div>
                </div>
                <div class="time">{{tw_time}}</div>
            </div>
            <div class="timezone black" data-timezone="Australia/Sydney">
                <div class="zone">
                    <div class="zone-name">Sydney</div>
                    <div class="zone-date">{{syd_date}}</div>
                </div>
                <div class="time">{{syd_time}}</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'app',
    data() {
        return {
            tw_date: '',
            tw_time: '',
            ny_date: '',
            ny_time: '',
            lon_date: '',
            lon_time: '',
            bkk_date: '',
            bkk_time: '',
            syd_date: '',
            syd_time: '',
        }
    },
    methods: {
        getLocaleString(timeZone, type) {
            let d = new Date();
            let options = {
                timeZone,
                hour12: false,
            };
            switch (type) {
                case 'date':
                    options['dateStyle'] = 'medium';
                    break;
                case 'time':
                    options['timeStyle'] = 'short';
                    break;
                default:
                    break;
            }
            return d.toLocaleString('en-GB', options);
        },
        timer() {
            // 時區參考：https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
            this.tw_date = this.getLocaleString('Asia/Taipei', 'date');
            this.tw_time = this.getLocaleString('Asia/Taipei', 'time');
            this.ny_date = this.getLocaleString('America/New_York', 'date');
            this.ny_time = this.getLocaleString('America/New_York', 'time');
            this.lon_date = this.getLocaleString('Europe/London', 'date');
            this.lon_time = this.getLocaleString('Europe/London', 'time');
            this.bkk_date = this.getLocaleString('Asia/Bangkok', 'date');
            this.bkk_time = this.getLocaleString('Asia/Bangkok', 'time');
            this.syd_date = this.getLocaleString('Australia/Sydney', 'date');
            this.syd_time = this.getLocaleString('Australia/Sydney', 'time');

            requestAnimationFrame(this.timer);
        }
    },
    mounted() {
        requestAnimationFrame(this.timer);
    },
}
</script>

<style>
* {
    box-sizing: border-box;
}

body {
    text-transform: uppercase;
    background: #e5e5e5;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: "Open Sans", sans-serif;
}

.wrapper {
    width: 540px;
    margin: 0 auto;
}

h1 {
    font-size: 72px;
    font-weight: 800;
    padding: 5px 0;
    margin: 25px 0;
    line-height: 72px;
    text-align: center;
    border-top: 10px solid #000;
    border-bottom: 10px solid #000;
}

.clocks {
    border: 1px solid #000;
    background: #fff;
    color: #000;
}

.timezone {
    border: 1px solid #000;
    position: relative;
    height: 104px;
}

.timezone.black {
    background: #000;
    color: #fff;
}

.zone-name {
    font-weight: 600;
    font-size: 36px;
    line-height: 49px;
}

.zone {
    position: absolute;
    top: 16px;
    left: 40px;
}

.zone-date {
    font-style: italic;
    font-weight: 600;
    font-size: 16px;
}

.time {
    font-size: 72px;
    font-weight: 600;
    display: inline-block;
    position: absolute;
    right: 40px;
    top: 3px;
}
</style>
