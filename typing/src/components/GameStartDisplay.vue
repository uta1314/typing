<template>
    <div class="game-display start">
        <h1 class="mainContent-title">
            <hane-moji :value="title"></hane-moji>
        </h1>
        <div class="button" ref="button">
            <a @click.prevent="gameStart()" @mouseenter="playSilent(audio.button)">ゲームスタート</a>
        </div>
        <div class="button ranking">
            <a @click.prevent="rankingStart()" @mouseenter="playSilent(audio.button)">ランキング</a>
        </div>
        <div class="enemy-image one">
            <img :src="enemyImage01" alt="モンスター画像">
        </div>
        <div class="enemy-image two">
            <img :src="enemyImage02" alt="モンスター画像">
        </div>
        <div class="player-image">
            <img :src="playerImage" alt="プレイヤー画像">
        </div>
        <note v-if="noteOk"></note>
    </div>
</template>

<script>
    import {Howl} from 'howler'
    import HaneMoji from './parts/HaneMoji'
    import Note from './parts/Note'

    const soundUrls = {
        gameStart: require("@/assets/sound/game_start_bgm.wav"),
        button: require("@/assets/sound/button.wav")
    }
    
export default {
    name: 'GameStartDisplay',
    components: {
        HaneMoji,
        Note
    },
    data() {
        return {
            enemyImage01: require('@/assets/enemy03.png'),
            enemyImage02: require('@/assets/enemy04.png'),
            playerImage: require('@/assets/player.png'),
            title: 'タイピングゲーム',
            audio: {
                gameStart: null,
                button: null
            }
        }
    },
    mounted() {
        if (!this.noteOk) {
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
            }
    },
    beforeUnmount() {
        window.removeEventListener('keydown', this.keyListener)
        this.unloadSilent(this.audio.gameStart);
        this.unloadSilent(this.audio.button);
    },
    computed: {
        kGameStart() {
            return this.$emit('k-game-start');
        },
        noteOk() {
            return this.$store.state.note;
        }
    },
    watch: {
        noteOk() {
            if (!this.noteOk) {
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
        gameStart() {
            return this.$emit('game-start');
        },
        rankingStart() {
            return this.$emit('ranking-start');
        }
    }
}
</script>

<style scoped>
    .start {
        background-image: url('../../public/img/stage.jpg');
    }
    .mainContent-title {
        position: relative;
        z-index: 1;
        font-size: 70px;
        font-family: 'M PLUS Rounded 1c', sans-serif;
        color: #fc5dac;
        text-shadow: 2px 2px 0 rgb(248, 208, 241),-2px 2px 0 rgb(248, 208, 241), 2px -2px 0 rgb(248, 208, 241), -2px -2px 0 rgb(248, 208, 241);
        margin-top: 140px;
        margin-bottom: 100px;
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
    .button.ranking {
        margin: 50px auto 0;
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
    .enemy-image {
        position: absolute;
        width: 300px;
    }
    .enemy-image img {
        width: 100%;
        object-fit: contain;
    }
    .player-image {
        position: absolute;
        width: 300px;
    }
    .player-image img {
        width: 100%;
        object-fit: contain;
    }
    .enemy-image.one {
        top: 0;
        right: 0;
    }
    .enemy-image.two {
        top: -40px;
        left: 0;
    }
    .player-image {
        bottom: 0;
        right: 0px;
    }
</style>