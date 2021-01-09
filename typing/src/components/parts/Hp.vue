<template>
    <div class="hp-cat">
        <div class="remaining-hp">HP:{{remainingHp}}</div>
        <fuwa-moji :value="healPoint" v-show="visible"></fuwa-moji>
        <div class="hp-box">
            <div class="hp" :style="style"></div>
        </div>
    </div>  
</template>

<script>
import {Howl} from 'howler'
import FuwaMoji from './FuwaMoji'

const soundUrls = {
    heal: require("@/assets/sound/heal.wav"),
}

export default {
    name: 'Hp',
    components: {
        FuwaMoji
    },
    data() {
        return {
            width: 100,
            healPoint: 0,
            interval: null,
            visible: false,
            audio: {
                heal: null
            },
            one: true
        }
    },
    mounted() {
        this.start()
        this.audio.heal = new Howl({src: [soundUrls.heal], volume: 0.2})
    },
    beforeUnmount() {
        this.unloadSilent(this.audio.heal);
    },
    computed: {
        style() {
            if (this.width <= 20) {
                return {
                    backgroundColor: '#FF3333',
                    width: this.width + '%'
                }
            }else if (this.width <= 50) {
                return {
                    backgroundColor: '#FFFF66',
                    width: this.width + '%'
                }
            }else {
                return {
                    width: this.width + '%'
                }
            }
        },
        missCount() {
            return this.$store.state.missCount
        },
        successCount() {
            return this.$store.state.successCount
        },
        continuationSuccessCount() {
            return this.$store.state.continuationSuccessCount
        },
        enemyHp() {
            return this.$store.state.enemyHp
        },
        timeInterval() {
            return this.$store.state.interval
        },
        remainingHp() {
            return Math.floor(this.width)
        },
    },
    watch: {
        // 失敗しながらでも10の倍数になるとHP20回復
        successCount() {
            if (this.successCount % 10 == 0) {
                this.healPoint = 20
                this.healVisible()
                if (99 < this.width + this.healPoint) {
                this.width = 100
                return
                }
                this.width += this.healPoint;
            }
        },
        // 30回連続で成功したらHP100回復
        continuationSuccessCount() {
            if (this.continuationSuccessCount % 30 == 0) {
                this.healPoint = 100
                this.healVisible()
                if (99 < this.width + this.healPoint) {
                    this.width = 100
                }
            }
        },
        // 敵のHPが半分を切ったらダメージ加算速度を1.5倍にする
        enemyHp() {
            if (this.enemyHp <= 50) {
                if (this.one) {
                    this.$store.commit('decrementInterval');
                    this.restart()
                    this.one = false
                }
            }
            // 0を切ったらゲーム終了
            if (this.enemyHp <= 0) {
                this.enemyHp = 0
                clearInterval(this.interval)
                this.$store.commit('gameWin')
                this.$store.dispatch('gameEnd')   
            }
        }
    },
    methods: {
        checkTimeOver() {
            if (this.width > 0) {
                return
            }
            this.width = 0
            clearInterval(this.interval)
            this.$store.commit('die')
        },
        start() {
            this.interval = setInterval(() => {
                this.width -= 0.5
                this.checkTimeOver()
            }, this.timeInterval)
        },
        restart() {
            clearInterval(this.interval)
            this.start()
        },
        // fuwa-mojiを表示
        healVisible() {
            this.visible = true;
            this.playSilent(this.audio.heal)
            let that = this;
            setTimeout(function() {
                that.visible = false;
            }, 1000);
        },
        playSilent(audio) {
            audio.play()
        },
        unloadSilent(audio) {
            audio.unload()
        }
    }
}
</script>

<style scoped>
    .hp-cat {
        position: relative;
    }
    .remaining-hp {
        font-size: 20px;
        font-weight: bold;
        text-align: left;
        padding: 10px 30px;
    }
    .hp-box {
        width: 100%;
        height: 25px;
        border: 2px solid #000;
        border-radius: 10px;
        overflow: hidden;
    }
    .hp {
        height: 25px;
        background-color: #33FF66;
    }
</style>