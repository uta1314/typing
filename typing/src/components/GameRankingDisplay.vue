<template>
    <div class="game-display ranking">
        <h2 class="ranking-title">ランキング</h2>
        <top-button @start-start="startStart()"></top-button>
        <table class="ranking-table">
            <tr><th>Number</th><th>Rank</th><th>Name</th><th>Time</th></tr>
            <tr class="ranking-item" v-for="(r, index) in topRanking" :key="r.name">
                <td class="number">{{index + 1}} 位</td>
                <td v-if="r.rank === 'S'" class="rank s">{{r.rank}}</td>
                <td v-else-if="r.rank ==='A'" class="rank a">{{r.rank}}</td>
                <td v-else-if="r.rank ==='B'" class="rank b">{{r.rank}}</td>
                <td v-else-if="r.rank ==='C'" class="rank c">{{r.rank}}</td>
                <td class="name">{{r.name}}</td>
                <td class="time">{{r.time}} 秒</td>
            </tr>
        </table>
    </div>
</template>

<script>
import axios from 'axios'
import {Howl} from 'howler'
import TopButton from './parts/TopButton'

const soundUrls = {
    gameStart: require("@/assets/sound/game_start_bgm.wav")
}

export default {
    name: 'GameRankingDisplay',
    components: {
        TopButton
    },
    data() {
        return {
            getUrl: 'http://webfantasy.stars.ne.jp/rank_api/GetRank.php',
            allRanking: [],
            audio: {
                gameStart: null,
            }
        }
    },
    mounted() {
        axios.get(this.getUrl)
            .then(response => {
                this.allRanking = response.data
            })
            .catch(error => alert(error)),
        this.audio.gameStart = new Howl({src: [soundUrls.gameStart], volume: 0.2, loop: true})
        this.playSilent(this.audio.gameStart)
    },
    beforeUnmount() {
        this.unloadSilent(this.audio.gameStart);
    },
    computed: {
        topRanking() {
            if (this.allRanking) {
                return this.allRanking.slice(0, 100)
            } else {
                return this.allRanking
            }
        }
    },
    methods: {
        playSilent(audio) {
            audio.play()
        },
        unloadSilent(audio) {
            audio.unload()
        },
        startStart() {
            return this.$emit('start-start')
        }
    },
}
</script>

<style scoped>
    .ranking {
        overflow-y: auto;
        background-image: url('../../public/img/ranking.jpg');
    }
    .game-display::-webkit-scrollbar {
        display: none;
    }
    .ranking-title {
        font-size: 60px;
        font-family: 'M PLUS Rounded 1c', sans-serif;
        color: rgb(255,222,19);
        text-shadow: 2px 2px 0 rgb(246,170,0),-2px 2px 0 rgb(246,170,0), 2px -2px 0 rgb(246,170,0), -2px -2px 0 rgb(246,170,0);
        margin-top: 40px;
        margin-bottom: 30px;
    }
    .ranking-table {
        width: 100%;
        text-align: center;
    }
    .ranking-item {
        font-size: 40px;
        font-family: 'M PLUS Rounded 1c', sans-serif;
    }
    .ranking-table th {
        font-size: 50px;
        font-family: 'M PLUS Rounded 1c', sans-serif;
        color: #fc5dac;
        text-shadow: 2px 2px 0 rgb(248, 208, 241),-2px 2px 0 rgb(248, 208, 241), 2px -2px 0 rgb(248, 208, 241), -2px -2px 0 rgb(248, 208, 241);
        padding-bottom: 25px;
    }
    .ranking-table td {
        position: relative;
        padding-bottom: 10px;
    }
    .ranking-table tr:nth-of-type(2) td:nth-child(1) {
        color: rgb(255,222,19);
        text-shadow: 1px 1px 0 rgb(246,170,0),-1px 1px 0 rgb(246,170,0), 1px -1px 0 rgb(246,170,0), -1px -1px 0 rgb(246,170,0);
    }
    .ranking-table tr:nth-of-type(2) td:nth-child(1)::before {
        content: '';
        position: absolute;
        top: -12px;
        left: 15px;
        width: 60px;
        height: 60px;
        background-image: url('../../public/img/first.png');
        background-repeat: no-repeat;
        background-size: contain;
    }
    .ranking-table tr:nth-of-type(3) td:nth-child(1) {
        color: rgb(206, 206, 191);
        text-shadow: 1px 1px 0 rgb(161, 157, 157),-1px 1px 0 rgb(161, 157, 157), 1px -1px 0 rgb(161, 157, 157), -1px -1px 0 rgb(161, 157, 157);
    }
    .ranking-table tr:nth-of-type(3) td:nth-child(1)::before {
        content: '';
        position: absolute;
        top: -12px;
        left: 15px;
        width: 60px;
        height: 60px;
        background-image: url('../../public/img/second.png');
        background-repeat: no-repeat;
        background-size: contain;
    }
    .ranking-table tr:nth-of-type(4) td:nth-child(1) {
        color: rgb(167, 92, 7);
        text-shadow: 1px 1px 0 rgb(119, 84, 10),-1px 1px 0 rgb(119, 84, 10), 1px -1px 0 rgb(119, 84, 10), -1px -1px 0 rgb(119, 84, 10);
    }
    .ranking-table tr:nth-of-type(4) td:nth-child(1)::before {
        content: '';
        position: absolute;
        top: -12px;
        left: 15px;
        width: 60px;
        height: 60px;
        background-image: url('../../public/img/third.png');
        background-repeat: no-repeat;
        background-size: contain;
    }
    .rank.s {
        color: rgb(255,222,19);
        text-shadow: 1px 1px 0 rgb(246,170,0),-1px 1px 0 rgb(246,170,0), 1px -1px 0 rgb(246,170,0), -1px -1px 0 rgb(246,170,0);
    }
    .rank.a {
        color: #f10a0a;
        text-shadow: 1px 1px 0 rgb(200, 61, 61),-1px 1px 0 rgb(200, 61, 61), 1px -1px 0 rgb(200, 61, 61), -1px -1px 0 rgb(200, 61, 61);
    }
    .rank.b {
        color: #2646fc;
        text-shadow: 1px 1px 0 rgb(11, 178, 255),-1px 1px 0 rgb(11, 178, 255), 1px -1px 0  rgb(11, 178, 255), -1px -1px 0 rgb(11, 178, 255);
    }
    .rank.c {
        color: #0af31d;
        text-shadow: 1px 1px 0 rgb(9, 187, 9),-1px 1px 0 rgb(9, 187, 9), 1px -1px 0 rgb(9, 187, 9), -1px -1px 0 rgb(9, 187, 9);
    }
    .button.start {
        position: absolute;
        top: 0;
        right: 20px;
    }
</style>