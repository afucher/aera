<template>
    <div>
        <router-link :to="{ name: 'courses'}">X</router-link>
        <h2>Data de início das turmas</h2>
        <div v-for="group in groups">
            {{group.start_date}}
        </div>
    </div>
</template>

<script>
    export default {
        name: "CourseGroups",
        computed: {
            groups() {
                return this.$store.getters.doneTodos(this.$route.params.id)
            }
        },
        mounted(){
            this.$store.dispatch("loadGroups")
        }
    }
</script>