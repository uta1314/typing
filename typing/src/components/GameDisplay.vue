<template>
    <div class="game-display play">
        <enemy-hp></enemy-hp>
        <enemy-image></enemy-image>
        <strings></strings>
        <display-string></display-string>
        <hp></hp>
        <div class="mask" :class="Klass"></div>
    </div>
</template>

<script>
import {Howl} from 'howler'
import EnemyHp from './parts/EnemyHp'
import EnemyImage from './parts/EnemyImage'
import Strings from './parts/Strings'
import DisplayString from './parts/DisplayString'
import Hp from './parts/Hp'

const soundUrls = {
    game: require("@/assets/sound/game_bgm.mp3"),
}

export default {
    name: 'GameDisplay',
    components: {
        EnemyHp,
        EnemyImage,
        Strings,
        DisplayString,
        Hp,
    },
    data() {
        return {
            Klass: [],
            interval: null,
            audio: {
                game: null,
            }
        }
    },
    created() {
        // 0.1秒ごとにカウント処理を実行
        let that = this;
        this.interval = setInterval(function() {
            that.$store.commit('addTime')
        }, 100);
    },
    mounted() {
        this.audio.game = new Howl({src: [soundUrls.game], volume: 0.4, loop: true})
        this.playSilent(this.audio.game)
    },
    beforeUnmount() {
        clearInterval(this.interval);
        this.unloadSilent(this.audio.game);
    },
    computed: {
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
        }
    },
    watch: {
        // 敵のHPが半分を切ったら画面が光る
        enemyHp() {
            if(this.enemyHp <= 50) {
                this.Klass = ['shine']
            }
        }
    }    
}
</script>

<style scoped>
    .play {
        background-image: url('../../public/img/stage.jpg');
    }
    .mask {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0;
        background-image: url('../../public/img/effect.jpg');
        background-repeat: no-repeat;
        background-position: center center;
        background-size: cover;
    }
    .shine {
        animation: shine 2.5s;
    }

    @keyframes shine {
        0% {
            opacity: 0.8;
        }
        20% {
            opacity: 0.2;
        }
        40% {
            opacity: 0.8;
        }
        60% {
            opacity: 0.2;
        }
        100% {
            opacity: 0.8;
        }
    }
</style>