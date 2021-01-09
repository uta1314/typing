<template>
    <div class="enemy-image" :class="klass">
        <img :class="klass2" :src="currentImage" alt="敵画像">
    </div>
</template>

<script>
import {Howl} from 'howler'

const soundUrls = {
    hit: require("@/assets/sound/hit.mp3"),
    roar: require("@/assets/sound/roar.mp3")
}

export default {
    name: 'EnemyImage',
    data() {
        return {
            currentImage: require('@/assets/enemy01.png'),
            klass: [],
            klass2: ['attack'],
            audio: {
                hit: null,
                roar: null
            },
            one: true
        }
    },
    mounted() {
        this.audio.hit = new Howl({src: [soundUrls.hit], volume: 0.1})
        this.audio.roar = new Howl({src: [soundUrls.roar], volume: 0.7})
        this.playSilent(this.audio.roar)
    },
    beforeUnmount() {
        this.unloadSilent(this.audio.hit);
        this.unloadSilent(this.audio.roar);
    },
    computed: {
        successCount() {
            return this.$store.state.successCount
        },
        enemyHp() {
            return this.$store.state.enemyHp
        }
    },
    methods: {
        playSilent(audio) {
            audio.play()
        },
        unloadSilent(audio) {
            audio.unload()
        },
        volumeSilent(audio,volume) {
            audio.volume(volume)
        }
    },
    watch: {
        successCount() {
            if (this.enemyHp <= 0) {
                return
            }
            setTimeout(() => {
                this.klass = ['damaged']
                this.playSilent(this.audio.hit)
            }, 400)
            setTimeout(() => {
                this.klass = []
            }, 200)
        },
        // 敵のHPが半分を切ったら覚醒
        enemyHp() {
            if (this.enemyHp <= 50) {
                if (this.one) {
                    this.volumeSilent(this.audio.roar, 1)
                    this.playSilent(this.audio.roar)
                    setTimeout(() => {
                        this.currentImage = require('@/assets/enemy02.png')
                    }, 2500)
                    this.one = false
                }
            }
            // 0を切ったらattackアニメーションを止めてdownアニメーションを実施
            if (this.enemyHp <= 0) {
                let that = this;
                setTimeout(function() {
                    that.klass2 = ['down']
                    that.volumeSilent(that.audio.roar, 0.7)
                    that.playSilent(that.audio.roar)
                }, 800)
            }
        }
    }
}
</script>

<style scoped>
    .enemy-image {
        width: 60%;
        height: 300px;
        margin: 50px auto 50px;
    }
    .enemy-image img {
        width: 100%;
        object-fit: contain;
    }
    .damaged {
        animation: damage .2s;
    }
    .attack {
        animation: attack;
        animation-duration: 0.8s;
        animation-iteration-count: infinite;
    }
    .down {
        animation: down 4s;
    }

    @keyframes damage {
        50% {
            transform: translateY(-50px);
        }
        100% {
            transform: translateY(20px);
        }
    }

    @keyframes attack {
        30% {
            transform: rotate(30deg);
        }
        60% {
            transform: rotate(-35deg);
        }
        100% {
            transform: rotate(0);
        }
    }

    @keyframes down {
        0% {
            transform: translate(0,0);
        }
        5% {
            transform: translate(10px,2px); 
        }
        10% {
            transform: translate(-10px,4px); 
        }
        15% {
            transform: translate(10px,6px); 
        }
        20% {
            transform: translate(-10px,8px); 
        }
        25% {
            transform: translate(10px,10px); 
        }
        30% {
            transform: translate(-10px,12px); 
        }
        35% {
            transform: translate(10px,14px); 
        }
        40% {
            transform: translate(-10px,16px); 
        }
        45% {
            transform: translate(10px,18px); 
        }
        50% {
            transform: translate(-10px,20px); 
        }
        55% {
            transform: translate(10px,22px); 
        }
        60% {
            transform: translate(-10px,24px); 
        }
        65% {
            transform: translate(10px,26px); 
        }
        70% {
            transform: translate(-10px,28px); 
        }
        75% {
            transform: translate(10px,30px); 
        }
        80% {
            transform: translate(-10px,32px); 
        }
        85% {
            transform: translate(10px,34px); 
        }
        90% {
            transform: translate(-10px,36px); 
        }
        95% {
            transform: translate(10px,38px); 
        }
        100% {
            transform: translate(-10px,40px);
            opacity: 0;
        }

    }
</style>