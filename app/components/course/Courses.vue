<template>
    <div>
        <ListCourse></ListCourse>
        <NewCourse></NewCourse>
    </div>
</template>

<script>
import ListCourse from './ListCourse.vue';
import NewCourse from './NewCourse.vue';
    export default{
        components:{ ListCourse, NewCourse }
    }   
</script>