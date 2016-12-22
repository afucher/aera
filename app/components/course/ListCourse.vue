<template>
    <div>
        <div v-for="course in courses">
            {{course.description}}
        </div>
    </div>
</template>
 
<script>
    export default {
        name: "AeraListCourse",
        props: ['courses'] 
    }
</script>