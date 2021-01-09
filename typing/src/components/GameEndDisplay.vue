<template>
    <div class="game-display end">
        <top-button @start-start="startStart()"></top-button>
        <div v-if="rank() === 'S'">
            <div class="rank s">{{rank()}}</div>
        </div>
        <div v-else-if="rank() === 'A'">
            <div class="rank a">{{rank()}}</div>
        </div>
        <div v-else-if="rank() === 'B'">
            <div class="rank b">{{rank()}}</div>
        </div>
        <div v-else-if="rank() === 'C'">
            <div class="rank c">{{rank()}}</div>
        </div>
        <div v-else>
            <div class="rank d">{{rank()}}</div>
        </div>
        <div v-if="game === 'win'">
            <h2 class="title win" :style="{marginBottom:'20px'}">WIN</h2>
            <div class="grades time">Time : {{timeCountSeconds}} 秒</div>
            <div class="grades success">Success : {{successCount}}</div>
            <div class="grades miss">Miss : {{missCount}}</div>
            <div class="button" ref="button">
                <a @click.prevent="gameStart" @mouseenter="playSilent(audio.button)">もう一度プレイ</a>
            </div>
            <div class="fee-image one">
                <img :src="feeImage01" alt="報酬画像">
            </div>
            <div class="fee-image two">
                <img :src="feeImage02" alt="報酬画像">
            </div>
        </div>
        <div v-else>
            <h2 class="title lose">LOSE</h2>
            <div class="grades success">Success : {{successCount}}</div>
            <div class="grades miss">Miss : {{missCount}}</div>
            <div class="button" ref="button">
                <a @click.prevent="gameStart" @mouseenter="playSilent(audio.button)">もう一度プレイ</a>
            </div>
            <div class="fee-image one">
                <img :src="feeImage01" alt="報酬画像">
            </div>
            <div class="fee-image two">
                <img :src="feeImage02" alt="報酬画像">
            </div>
        </div>
        <set-ranking v-if="visible" @ranking-start="rankingStart()" :p-rank="rank()" :p-time="timeCountSeconds"></set-ranking>
    </div>
</template>

<script>
import axios from 'axios'
import {Howl} from 'howler'
import TopButton from './parts/TopButton'
import SetRanking from './parts/SetRanking'

const soundUrls = {
    gameStart: require("@/assets/sound/game_start_bgm.wav"),
    button: require("@/assets/sound/button.wav")
}

export default {
    name: 'GameEndDisplay',
    components: {
        TopButton,
        SetRanking
    },
    data() {
        return {
            feeImage01: require('@/assets/takarabakohazure.png'),
            feeImage02: require('@/assets/takarabakohazure_r.png'),
            getUrl: 'http://webfantasy.stars.ne.jp/rank_api/GetRank.php',
            allRanking: [],
            visible: false,
            audio: {
                gameStart: null,
                button: null
            },
        }
    },
    mounted() {
        if (this.game === 'win') {
                this.feeImage01 = require('@/assets/takarabako.png')
                this.feeImage02 = require('@/assets/takarabako_r.png')
                axios.get(this.getUrl)
                    .then(response => {
                        if (!response.data) {
                            this.visible = true
                            return
                        }
                        this.allRanking = response.data
                        if (this.allRanking.length < 100) {
                            this.visible = true
                        } else {
                            if (this.allRanking[99].time > this.timeCountSeconds || this.rank() === 'A' || this.rank() === 'S') {
                                if (this.allRanking[99].rank === 'C' || this.allRanking[99].rank === 'B') {
                                    this.visible = true
                                } else if (this.allRanking[99].rank === 'A' || this.allRanking[99].rank === 'S') {
                                    if (this.rank() === 'S') {
                                        this.visible = true
                                    } else {
                                        if (this.allRanking[99].rank === 'A') {
                                            this.visible = true
                                        }
                                    }
                                }
                            }
                        }
                    })
                    .catch(error => alert(error))
        }
        this.keyListener = (event) => {
            if (event.key === 'Enter') {
                this.playSilent(this.audio.button)
                this.kGameStart;
                this.$refs.button.style.boxShadow = "0 0 1px 0 rgba(0, 0, 0, 0.5)";
                this.$refs.button.style.transform = "translateY(5px)";
            }
        }
        window.addEventListener('keydown', this.keyListener)
        this.audio.gameStart = new Howl({src: [soundUrls.gameStart], volume: 0.2, loop: true})
        this.audio.button = new Howl({src: [soundUrls.button], volume: 0.2})
        this.playSilent(this.audio.gameStart)
    },
    beforeUnmount() {
        window.removeEventListener('keydown', this.keyListener)
        this.unloadSilent(this.audio.gameStart);
        this.unloadSilent(this.audio.button);
    },
    computed: {
        gameStart() {
            return this.$emit('game-start')
        },
        kGameStart() {
            return this.$emit('k-game-start');
        },
        successCount() {
            return this.$store.state.successCount
        },
        missCount() {
            return this.$store.state.missCount
        },
        timeCount() {
            return this.$store.state.timeCount
        },
        timeCountSeconds() {
            return this.timeCount / 10
        },
        game() {
            return this.$store.state.game
        }
    },
    watch: {
        visible() {
            if(this.visible) {
                window.removeEventListener('keydown', this.keyListener)
            }
        }
    },
    methods: {
        rank() {
            if (this.game === 'win') {
                if (this.timeCount <= 330 && this.missCount == 0) {
                    return 'S'
                } else if (this.timeCount <= 370 && this.missCount == 0) {
                    return 'A'
                } else if (this.timeCount <= 400 && this.missCount <= 10) {
                    return 'B'
                } else {
                    return 'C'
                }
            } else {
                return '-'
            }
        },
        playSilent(audio) {
            audio.play()
        },
        unloadSilent(audio) {
            audio.unload()
        },
        startStart() {
            return this.$emit('start-start')
        },
        rankingStart() {
            return this.$emit('ranking-start');
        },
    }
}
</script>

<style scoped>
    .end {
         background-image: url('../../public/img/kosi.jpg');
    }
    .title {
        font-size: 90px;
        font-family: 'Varela Round', sans-serif;
        margin: 80px 0;
        letter-spacing: 10px;
    }
    .title.win {
        color: rgb(255,222,19);
        text-shadow: 2px 2px 0 rgb(246,170,0),-2px 2px 0 rgb(246,170,0), 2px -2px 0 rgb(246,170,0), -2px -2px 0 rgb(246,170,0);
    }
    .title.lose {
        color: rgb(204,102,204);
        text-shadow: 2px 2px 0 rgb(75,38,188),-2px 2px 0 rgb(75,38,188), 2px -2px 0 rgb(75,38,188), -2px -2px 0 rgb(75,38,188);
    }
    .grades {
        font-size: 60px;
        font-family: 'Varela Round', sans-serif;
        color: #fc5dac;
        text-shadow: 2px 2px 0 rgb(248, 208, 241),-2px 2px 0 rgb(248, 208, 241), 2px -2px 0 rgb(248, 208, 241), -2px -2px 0 rgb(248, 208, 241);
    }
    .time {
        padding-top: 20px;
        margin-bottom: 30px;
    }
    .success {
        margin-bottom: 30px;        
    }
    .button {
        position: relative;
        z-index: 1;
        width: 300px;
        height: 100px;
        line-height: 100px;
        padding: 0 20px;
        margin: 70px auto 0;
        background: linear-gradient(#88eee9,#48caeb);
        border-radius: 60px;
        box-shadow: 0 5px 2px 0 rgba(0, 0, 0, 0.5);
        cursor: pointer;
        transition: all 0.2s;
    }
    .button:hover {
        box-shadow: 0 0 1px 0 rgba(0, 0, 0, 0.5); 
        transform: translateY(5px);
    }
    .button a {
        display: block;
        font-size: 40px;
        font-family: 'M PLUS Rounded 1c', sans-serif;
        color: #f8eff4;
        width: 100%;
        height: 100%;
    }
    
    .fee-image {
        position: absolute;
        width: 300px;
    }
    .fee-image img {
        width: 100%;
        object-fit: contain;
    }
    .fee-image.one {
        bottom: 0;
        right: 20px;
    }
    .fee-image.two {
        bottom: 0;
        left: 20px;
    }
    .rank {
        position: absolute;
        top: 20px;
        right: 80px;
        font-size: 150px;
        font-family: 'Varela Round', sans-serif;
        color: #fc5dac;
        text-shadow: 2px 2px 0 rgb(248, 208, 241),-2px 2px 0 rgb(248, 208, 241), 2px -2px 0 rgb(248, 208, 241), -2px -2px 0 rgb(248, 208, 241);
    }
    .rank::after {
        position: absolute;
        bottom: -20px;
        left: -15px;
        content: 'Rank';
        font-size: 40px;
        font-style: oblique;
        width: 100%;
        letter-spacing: 10px;
    }
    .rank.s {
        color: rgb(255,222,19);
        text-shadow: 2px 2px 0 rgb(246,170,0),-2px 2px 0 rgb(246,170,0), 2px -2px 0 rgb(246,170,0), -2px -2px 0 rgb(246,170,0);
    }
    .rank.s::after {
        text-shadow: 1px 1px 0 rgb(246,170,0),-1px 1px 0 rgb(246,170,0), 1px -1px 0 rgb(246,170,0), -1px -1px 0 rgb(246,170,0);
    }
    .rank.a {
        color: #f10a0a;
        text-shadow: 2px 2px 0 rgb(200, 61, 61),-2px 2px 0 rgb(200, 61, 61), 2px -2px 0 rgb(200, 61, 61), -2px -2px 0 rgb(200, 61, 61);
    }
    .rank.a::after {
        text-shadow: 1px 1px 0 rgb(200, 61, 61),-1px 1px 0 rgb(200, 61, 61), 1px -1px 0 rgb(200, 61, 61), -1px -1px 0 rgb(200, 61, 61);
    }
    .rank.b {
        color: #2646fc;
        text-shadow: 2px 2px 0 rgb(11, 178, 255),-2px 2px 0 rgb(11, 178, 255), 2px -2px 0  rgb(11, 178, 255), -2px -2px 0 rgb(11, 178, 255);
    }
    .rank.b::after {
        text-shadow: 1px 1px 0 rgb(11, 178, 255),-1px 1px 0 rgb(11, 178, 255), 1px -1px 0  rgb(11, 178, 255), -1px -1px 0 rgb(11, 178, 255);
    }
    .rank.c {
        color: #0af31d;
        text-shadow: 2px 2px 0 rgb(9, 187, 9),-2px 2px 0 rgb(9, 187, 9), 2px -2px 0 rgb(9, 187, 9), -2px -2px 0 rgb(9, 187, 9);
    }
    .rank.c::after {
        text-shadow: 1px 1px 0 rgb(9, 187, 9),-1px 1px 0 rgb(9, 187, 9), 1px -1px 0 rgb(9, 187, 9), -1px -1px 0 rgb(9, 187, 9);
    }
    .rank.d {
        color: rgb(204,102,204);
        text-shadow: 2px 2px 0 rgb(75,38,188),-2px 2px 0 rgb(75,38,188), 2px -2px 0 rgb(75,38,188), -2px -2px 0 rgb(75,38,188);
    }
    .rank.d::after {
        text-shadow: 1px 1px 0 rgb(75,38,188),-1px 1px 0 rgb(75,38,188), 1px -1px 0 rgb(75,38,188), -1px -1px 0 rgb(75,38,188);
        left: -38px;
    }
    /* TopButtonコンポーネントのcss */
    .button.start {
        position: absolute;
        top: 0;
        left: 20px;
    }
</style>