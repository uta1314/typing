<template>
    <div class="note-bg">
      <div class="note-cat">
        <h2 class="note-title">ゲームのルール</h2>
        <div class="note-description">
          <p>画面に表示される文字を入力していきモンスターをたおそう</p>
          <p>モンスターより先に自分のHPがなくなってしまえばゲームオーバーだ</p>
          <p class="notice">※ ボタンをクリックするとBGMが流れ出すから注意してね</p>
        </div>
        <div class="button">
            <a @click.prevent="noteOk()">わかった</a>
        </div>
      </div>
    </div>
</template>

<script>
export default {
    name: 'Note',
    data() {
        return {

        }
    },
    methods: {
        noteOk() {
            this.$store.commit('noteOk');
        },
    }
}
</script>

<style scoped>
.note-bg {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.5);
}
.note-cat {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  z-index: 1000;
  width: 650px;
  height: 550px;
  font-family: 'M PLUS Rounded 1c', sans-serif;
  color: #000;
  background: linear-gradient(#88eee9,#48caeb);
  border: 3px solid #000;
  border-radius: 30px;
}
.note-title {
  font-size: 40px;
  margin-top: 50px;
}
.note-description {
  font-size: 30px;
  line-height: 1.5;
  padding: 50px 60px 20px 60px;
  text-align: left;
}
.note-description p {
  margin-bottom: 20px;
}
.note-description p:nth-of-type(3) {
  margin-bottom: 0;
}
.note-description .notice {
  font-size: 20px;
  color: rgb(233, 3, 3);
}
.note-cat .button {
  width: 300px;
  height: 100px;
  line-height: 100px;
  padding: 0 20px;
  margin: 0 auto;
  background: linear-gradient(#6aff97,#69eb48);
  border-radius: 60px;
  box-shadow: 0 5px 2px 0 rgba(0, 0, 0, 0.5);
  cursor: pointer;
  transition: all 0.2s;
}
.note-cat .button:hover {
  box-shadow: 0 0 1px 0 rgba(0, 0, 0, 0.5); 
  transform: translateY(5px);
}
.note-cat .button a {
  font-size: 40px;
}
</style>