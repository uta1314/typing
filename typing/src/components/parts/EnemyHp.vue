<template>
    <div class="hp-cat">
        <div class="remaining-hp">敵HP</div>
        <div class="hp-box">
            <div class="hp" :style="style"></div>
        </div>
        <hade-moji :value="attack" v-show="visible"></hade-moji>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import HadeMoji from './HadeMoji'

export default {
    name: 'EnemyHp',
    components: {
        HadeMoji
    },
    data() {
        return {
            width: 100,
            damagePoint: 0.5,
            visible: false,
        }
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
        attack() {
            return Math.floor(this.damagePoint * 200)
        },
        ...mapState(['successCount','continuationSuccessCount'])
    },
    watch: {
        // 成功時ダメージ加算
        successCount() {
            this.width -= this.damagePoint;
            if (this.width < 0) {
                this.width = 0
            }
            let that = this;
            setTimeout(function() {
                that.attackVisible();
            }, 600)      
        },
        // 連続正解で敵へのダメージ加算
        continuationSuccessCount() {
            const dDamage = 0.5
            if (this.continuationSuccessCount >= 40) {
                this.damagePoint = dDamage * 1.5;
            } else if (this.continuationSuccessCount >= 30) {
                this.damagePoint = dDamage * 1.4;
            } else if (this.continuationSuccessCount >= 20) {
                this.damagePoint = dDamage * 1.3;
            } else if (this.continuationSuccessCount >= 10) {
                this.damagePoint = dDamage * 1.2;
            } else {
                this.damagePoint = 0.5
            }
        },
        // 敵のHP監視
        width() {
            this.$store.commit('enemyHpDown',this.width);
        }
    },
    methods: {
        // hade-mojiを表示
        attackVisible() {
            this.visible = true;
            let that = this;
            setTimeout(function() {
                that.visible = false;
            }, 100);
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
        padding: 10px 30px 0;
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