<template>
    <div>
        <h2>Turmas <router-link :to="{ name: 'courses'}">[x]</router-link></h2>
        
        <ListGroup :course="course"></ListGroup>
    </div>
</template>

<script>
import ListGroup from './ListGroup.vue'
    export default {
        name: "CourseGroups",
        components: {ListGroup},
        computed: {
            course() {
                return this.$route.params.id
            }
        }
    }
</script>