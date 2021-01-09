<template>
  <div id="app">
    <component :is="currentComponent" v-on:game-start="gameStart()" v-on:k-game-start="kGameStart()" v-on:ranking-start="rankingStart()" v-on:start-start="startStart()"></component>
    <div class="copyright">
      <p>利用している音楽素材: (C)PANICPUMPKIN,Music-Note.jp</p>
      <p>利用しているイラスト素材: illustAC</p>
    </div>
    <div class="main-bg"></div>
  </div>
</template>

<script>
import GameStartDisplay from './components/GameStartDisplay'
import GameDisplay from './components/GameDisplay'
import GameEndDisplay from './components/GameEndDisplay'
import GameRankingDisplay from './components/GameRankingDisplay'

export default {
  name: 'App',
  components: {
    GameStartDisplay,
    GameDisplay,
    GameEndDisplay,
    GameRankingDisplay,
  },
  data() {
    return {
      currentComponent: GameStartDisplay,
    }
  },
  computed: {
    isDied() {
      return this.$store.state.isDied
    },
    noteOk() {
      return this.$store.state.note
    }
  },
  watch: {
    // ゲーム終了時にGameEndDisplayを表示させる
    isDied() {
      if (!this.isDied) {
        return
      }
      this.currentComponent = GameEndDisplay
    },
  },
  methods: {
    // GameStartDisplayを表示
    gameStart() {
      this.$store.commit('resetAll')
      this.currentComponent = GameDisplay
    },
    // キーボードからゲームスタート操作
    kGameStart() {
      this.$store.dispatch('kGameStart')
      let that = this
      setTimeout(function() {
        that.currentComponent = GameDisplay
      }, 200)
    },
    rankingStart() {
      this.currentComponent = GameRankingDisplay
    },
    startStart() {
      this.currentComponent = GameStartDisplay
    },
  }
}
</script>

<style>
@import url('../public/rcss/reset.css');
@import url('https://fonts.googleapis.com/css2?family=Rubik:ital,wght@1,600&family=Varela+Round&display=swap');
@import url('https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c:wght@700&display=swap');
.game-display {
  position: relative;
  width: 800px;
  height: 700px;
  padding: 0 40px;
  margin: 70px auto 0;
  border: 3px solid #000;
  border-radius: 20px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  overflow: hidden;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #000;
}
.copyright {
  margin: 12px auto 0;
  font-size: 15px;
  font-weight: bold;
}
.copyright p {
  margin-bottom: 5px;
}
.copyright p:nth-of-type(2) {
  margin-bottom: 0;
}
/*全体の背景*/
.main-bg {
  position: fixed;
  top: 0;
  left: 0;
  z-index: -999;
  width: 100%;
  height: 100%;
  background-image: url('../public/img/stage.jpg');
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
}
</style>
