<template>
    <div>
        <router-link :to="{ name: 'newCourse'}">Novo</router-link>
        <ListCourse></ListCourse>
    </div>
</template>

<script>
import ListCourse from './ListCourse.vue';
import NewCourse from './NewCourse.vue';
    export default{
        components:{ ListCourse, NewCourse }
    }   
</script>