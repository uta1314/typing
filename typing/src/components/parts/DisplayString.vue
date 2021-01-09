<template>
    <div>
        {{displayString}}
    </div>
</template>

<script>
export default {
    name: 'DisplayString',
    data() {
        return {
            
        }
    },
    computed: {
        displayString() {
            return this.$store.state.displayString
        }
    }
}
</script>

<style scoped>
    div {
        font-size: 30px;
        font-family: 'M PLUS Rounded 1c', sans-serif;
        margin: 10px auto 0;
    }
</style>