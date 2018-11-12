<template>
     <router-link :to="{ name: 'editClient', params: { id: data.id }  }">Edit</router-link>
</template>
<script>
    export default {
        props:['data'],
    }
</script>