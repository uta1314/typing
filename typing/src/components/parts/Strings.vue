<template>
    <div class="strings-cat">
        <transition-group name="list" tag="div" class="strings">
            <span v-for="(char) in currentString" :key="char">{{char}}</span>
        </transition-group>
    </div>
</template>

<script>
import {Howl} from 'howler'

const soundUrls = {
    stringSuccess: require("@/assets/sound/string_success.wav"),
    stringMiss: require("@/assets/sound/string_miss.mp3")
}

export default {
    name: 'Strings',
    data() {
        return {
            keyListener: null,
            audio: {
                stringSuccess: null,
                stringMiss: null
            }
        }
    },
    computed: {
        // ストアから文字を受け取る
        currentString() {
            return this.$store.state.strings
        },
        // ストアから敵のHPを受け取る
        enemyHp() {
            return this.$store.state.enemyHp
        }
    },
    watch: {
        // 敵のHPが0になったら文字を飛ばないようにする
        enemyHp() {
            if (this.enemyHp <= 0) {
                window.removeEventListener('keydown', this.keyListener);
            }
        }
    },
    mounted() {
        this.keyListener = (event) => {
            this.keyDown(event.key)
        };
        window.addEventListener('keydown', this.keyListener);
        this.$store.commit('choice'),
        this.audio.stringSuccess = new Howl({src: [soundUrls.stringSuccess], volume: 0.2})
        this.audio.stringMiss = new Howl({src: [soundUrls.stringMiss], volume: 0.4})
    },
    unmounted() {
        window.removeEventListener('keydown', this.keyListener);
        this.unloadSilent(this.audio.stringSuccess);
        this.unloadSilent(this.audio.stringMiss);
    },
    methods: {
        // キーの内容を検査
        keyDown(code) {
            const string = this.currentString
            if (code !== string[0]) {
                this.$store.commit('typeMiss')
                this.playSilent(this.audio.stringMiss)
                return false;
            }
            string.shift();
            this.$store.commit('typeSuccess')
            this.$store.commit('continuationTypeSuccess')
            this.playSilent(this.audio.stringSuccess)
            // 文字を入れ替える
            if (!string[0]) {
                this.stageClear()
            }
        },
        stageClear() {
            // 次のワードを入れる
            this.$store.dispatch('textChange')
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
    .strings-cat {
        height: 50px;
        text-align: center;
    }
    
    .strings {
        display: inline-block;
        position: relative;
        color: #000;
    }

    span {
        display: inline-block;
        font-size: 45px;
        font-family: 'M PLUS Rounded 1c', sans-serif;
        top: 0;
        left: 0;
    }

    .list-leave-active {
        transition: all .5s ease-in;
        position: absolute;
    }

    .list-leave-to
    {
        top: -200px;
        left: 50%;
        transform: translateX(-50%);
    }
</style>