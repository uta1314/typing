<template>
    <div>
        <div class="string" :class="klass" v-for="string in strings" :key="string">{{string}}</div>
    </div>
</template>

<script>
export default {
    name: 'HaneMoji',
    props: ['value'],
    data() {
        return {
            title: this.value,
            klass: ['hane']
        }
    },
    computed: {
        strings() {
            return this.title.split('')
        }
    }
}
</script>

<style scoped>
    .string {
        display: inline-block;
    }
    .hane {
        animation: hane;
        animation-duration: 1.4s;
        animation-iteration-count: infinite;
        animation-timing-function: ease-out;
    }
    .hane:nth-of-type(2) {
        animation-delay: 0.2s;
    }
    .hane:nth-of-type(3) {
        animation-delay: 0.4s;
    }
    .hane:nth-of-type(4) {
        animation-delay: 0.6s;
    }
    .hane:nth-of-type(5) {
        animation-delay: 0.8s;
    }
    .hane:nth-of-type(6) {
        animation-delay: 1s;
    }
    .hane:nth-of-type(7) {
        animation-delay: 1.2s;
    }
    .hane:nth-of-type(8) {
        animation-delay: 1.4s;
    }
    @keyframes hane {
        0% {
            transform: translateY(0);
        }
        30% {
            transform: translateY(-80px);
        }
        100% {
            transform: translateY(0);
        }
    }
</style>