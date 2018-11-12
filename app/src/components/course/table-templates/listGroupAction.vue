<template>
    <router-link :to="{ name: 'courseGroups', 
                    params:{id: data.id}}">Turmas</router-link>
</template>
<script>
    export default {
        props:['data'],
    }
</script>