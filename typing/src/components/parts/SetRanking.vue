<template>
    <div class="entry">
            <h2 class="entry-title">ランクイン！</h2>
            <p class="entry-description">名前を入力してランキングに登録しよう！</p>
            <label for="name">Name</label>
            <input id="name" type="text" v-model="name" required maxlength="7" placeholder="7文字以内だよ">
            <div class="entry-button">
                <a @click.prevent="createNewRanking()" @mouseenter="playSilent(audio.button)">登録</a>
            </div>
        </div>
</template>

<script>
import axios from 'axios'
import {Howl} from 'howler'

const soundUrls = {
    button: require("@/assets/sound/button.wav")
}

export default {
    name: 'SetRanking',
    props: {
        pRank: {
            type: String,
            required: true,
        },
        pTime: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            setUrl: 'http://webfantasy.stars.ne.jp/rank_api/SetRank.php',
            name: '',
            rank: this.pRank,
            time: this.pTime,
            audio: {
                button: null
            },
            once: true
        }
    },
    mounted() {
        this.audio.button = new Howl({src: [soundUrls.button], volume: 0.2})
    },
    beforeUnmount() {
        this.unloadSilent(this.audio.button);
    },
    methods: {
        playSilent(audio) {
            audio.play()
        },
        unloadSilent(audio) {
            audio.unload()
        },
        rankingStart() {
            let that = this
            setTimeout(function() {
                return that.$emit('ranking-start')
            }, 200)
        },
        createNewRanking() {
            if (this.once) {
                let param = new URLSearchParams()
                param.append("name", this.name)
                param.append("rank", this.rank)
                param.append("time", this.time)
                axios.post(this.setUrl, param)
                .then(response => {
                    if (response.data !== '書き込み失敗') {
                        this.rankingStart()
                        this.once = false
                    }
                })
                .catch(error => alert(error))
            }
        },
    }
}
</script>

<style scoped>
    .entry {
        position: absolute;
        left: 50%;
        bottom: 30px;
        z-index: 1;
        transform: translateX(-50%);
        width: 500px;
        height: 220px;
        background: linear-gradient(#88eee9,#48caeb);
        border-radius: 10px;
        box-shadow: 5px 5px 2px 0 rgba(0, 0, 0, 0.5);
        font-family: 'M PLUS Rounded 1c', sans-serif;
    }
    .entry-title {
        font-size: 40px;
        color: rgb(255,222,19);
        text-shadow: 2px 2px 0 rgb(246,170,0),-2px 2px 0 rgb(246,170,0), 2px -2px 0 rgb(246,170,0), -2px -2px 0 rgb(246,170,0);
        margin-top: 20px;
    }
    .entry-description {
        font-size: 20px;
        margin: 20px 0 10px;
    }
    .entry label {
        vertical-align: -4px;
        font-size: 30px;
        padding-right: 10px;
    }
    .entry input {
        font-size: 20px;
        font-weight: bold;
        padding: 5px;
    }
    .entry-button {
        position: relative;
        z-index: 1;
        width: 100px;
        height: 35px;
        line-height: 35px;
        padding: 0 20px;
        margin: 15px auto 0;
        background: linear-gradient(#88eee9,#48caeb);
        border-radius: 60px;
        box-shadow: 0 5px 2px 0 rgba(0, 0, 0, 0.5);
        cursor: pointer;
        transition: all 0.2s;
    }
    .entry-button:hover {
        box-shadow: 0 0 1px 0 rgba(0, 0, 0, 0.5); 
        transform: translateY(5px);
    }
    .entry-button a{
        display: block;
        font-size: 20px;
        font-family: 'M PLUS Rounded 1c', sans-serif;
        color: #000;
        width: 100%;
        height: 100%;
    }
</style>>