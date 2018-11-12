<template>
    <router-link :to="{ name: 'group', 
                    params:{id: data.id}}">Ver</router-link>
</template>
<script>
    export default {
        props:['data'],
    }
</script>