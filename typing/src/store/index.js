import { createStore } from 'vuex'
import inputStrings from '../inputStrings'
import {_} from 'vue-underscore'

const shuffleStrings = _.shuffle(inputStrings)

export default createStore({
  state: {
    interval: 50,                 // Hpの減少速度
    successCount: 0,              // タイピング正解数
    continuationSuccessCount: 0,  // 連続正解数
    beforeMissCount: 0,           // ひとつ前の失敗数
    missCount: 0,                 // タイピング失敗数
    timeCount: 0,                 // クリアまでの時間
    strings: [],                  // 問題の単語を一文字ずつに区切ったもの
    displayString: '',            // 問題の日本語
    inputStrings: shuffleStrings, // 問題の英語
    inputStringsBase: shuffleStrings.concat(),  // 問題の英語のコピーを作成
    enemyHp: 100,                 // 敵のHP
    isDied: false,                // ゲーム終了を検知してGameEndDisplayに行くための値
    game: 'lose',                 // ゲームの勝敗を記録
    note: true                    // 注意画面を非表示にするための値
  },
  mutations: {
    // 問題を選択
    choice(state) {
      // 配列inputStrings.jsの一つのオブジェクトを取得
      let mondai = state.inputStrings.pop()
      // 問題がなくなった場合作成していたコピーをコピーしてinputStringsに追加
      if (!mondai) {
        state.inputStrings = state.inputStringsBase.concat()
        mondai = state.inputStrings.pop()
      }
      state.displayString = mondai.displayString
      state.strings = mondai.inputString.split('')
    },
    // 失敗数のカウント処理
    typeMiss(state) {
      state.missCount++
      state.beforeMissCount = state.missCount - 1
    },
    // 成功数のカウント処理
    typeSuccess(state) {
      state.successCount++
    },
    // 連続正解数のカウント処理
    continuationTypeSuccess(state) {
      if (state.missCount > state.beforeMissCount) {
        state.continuationSuccessCount = 0
        state.beforeMissCount++;
      }
      state.continuationSuccessCount++
    },
    // クリアまでの時間のカウント処理
    addTime(state) {
      state.timeCount++
    },
    // 敵のHPの反映
    enemyHpDown(state, hp) {
      state.enemyHp = hp
    },
    // ダメージの加算速度変更
    decrementInterval(state) {
      state.interval = 40
    },
    // ゲーム終了時
    die(state) {
      state.isDied = true
    },
    // ゲーム勝利
    gameWin(state) {
      state.game = 'win'
    },
    // 初期化
    resetAll(state) {
      state.interval = 50                 // Hpの減少速度
      state.successCount = 0              // タイピング正解数
      state.continuationSuccessCount = 0  // 連続正解数
      state.beforeMissCount = 0           // ひとつ前の失敗数
      state.missCount = 0                 // タイピング失敗数
      state.timeCount = 0                 // クリアまでの時間
      state.strings = []                  // 問題の単語を一文字ずつに区切ったもの
      state.enemyHp = 100                 // 敵のHP
      state.isDied = false                // ゲーム終了を検知してGameEndDisplayに行くための値
      state.game = 'lose'                 // ゲームの勝敗を記録
    },
    // 注意画面削除処理
    noteOk(state) {
      state.note = false
    }
  },
  actions: {
    // 新しい問題の生成を遅らせる
    textChange(context) {
      setTimeout(function() {
        context.commit('choice')
      }, 500)
    },
    // GameEndDisplayへの移動を遅らせる
    gameEnd(context) {
      setTimeout(function() {
        context.commit('die')
      }, 4000)
    },
    // キーボードからのゲームスタート操作
    kGameStart(context) {
      setTimeout(function() {
        context.commit('resetAll')
      }, 200)
    }
  },
})
