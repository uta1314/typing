<template>
    <div class="button start">
      <a @click.prevent="startStart()" @mouseenter="playSilent(audio.button)">TOPへ戻る</a>
    </div>
</template>

<script>
import {Howl} from 'howler'

const soundUrls = {
  button: require("@/assets/sound/button.wav")
}

export default {
    data() {
        return {
            audio: {
                button: null
            }
        }
    },
    mounted() {
        this.audio.button = new Howl({src: [soundUrls.button], volume: 0.2})
     this.playSilent(this.audio.button)
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
        startStart() {
            return this.$emit('start-start')
        }
    }
}
</script>

<style scoped>
.button.start {
  position: relative;
  z-index: 1;
  width: 150px;
  height: 50px;
  line-height: 50px;
  padding: 0 20px;
  margin: 20px auto 0;
  background: linear-gradient(#88eee9,#48caeb);
  border-radius: 60px;
  box-shadow: 0 5px 2px 0 rgba(0, 0, 0, 0.5);
  cursor: pointer;
  transition: all 0.2s;
}
.button.start:hover {
  box-shadow: 0 0 1px 0 rgba(0, 0, 0, 0.5); 
  transform: translateY(5px);
}
.button.start a{
  display: block;
  font-size: 20px;
  font-family: 'M PLUS Rounded 1c', sans-serif;
  color: #f8eff4;
  width: 100%;
  height: 100%;
}
</style>