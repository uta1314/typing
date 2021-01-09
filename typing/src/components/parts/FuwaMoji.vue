<template>
    <div :class="Klass" class="display-value">+ {{value}}</div>
</template>

<script>
export default {
    name: 'FuwaMoji',
    props: ['value'],
    data() {
        return {
            Klass: ['fuwa'],
        }
    },
}
</script>

<style scoped>
    .display-value {
        position: absolute;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        font-size: 25px;
        opacity: 0;
    }
    .display-value::after {
        content: '';
        display: inline-block;
        width: 30px;
        height: 30px;
        background-image: url('../../../public/img/heal.png');
        background-repeat: no-repeat;
        background-size: contain;
    }
    @keyframes fuwa {
        0% {
            opacity: 1;
        }
        100% {
            top: 0;
            opacity: 0;
        }
    }
    .fuwa {
        animation: fuwa 1s ease-out;
    }
</style>