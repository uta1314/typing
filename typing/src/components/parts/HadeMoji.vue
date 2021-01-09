<template>
    <div class="shock" :class="Klass">
        <div class="shock-image">
            <img :src="shockImage" alt="衝撃画像">
            <div class="display-value">{{value}}</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'HadeMoji',
    props: ['value'],
    data() {
        return {
            shockImage: require('@/assets/shock.png'),
            Klass: ['hade'],
        }
    },
}
</script>

<style scoped>
    .shock {
        position: absolute;
        right: 290px;
        bottom: -40px;
    }
    .shock-image {
        position: absolute;
        width: 150px;
    }
    .shock-image img {
        width: 100%;
        height: 100%;
    }
    .display-value {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        font-size: 40px;
        font-family: 'Varela Round', sans-serif;
    }
    @keyframes hade {
        100% { bottom: -30px;}
    }
    .hade {
        animation: hade 0.1s;
    }
</style>