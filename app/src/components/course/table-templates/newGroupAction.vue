<template>
    <router-link :to="{ name: 'newGroup', 
                    params:{id: data.id}}">Nova Turma</router-link>
</template>
<script>
    export default {
        props:['data'],
    }
</script>