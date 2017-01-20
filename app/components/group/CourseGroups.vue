<template>
    <div>
        <router-link :to="{ name: 'courses'}">X</router-link>
        <h2>Data de início das turmas</h2>
        <div v-for="group in groups">
            <p>Início em: {{group.start_date}} - <router-link :to="{ name: 'group',params:{id:group.id}}">Detalhes</router-link></p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "CourseGroups",
        computed: {
            groups() {
                return this.$store.getters.groupsFromCourse(this.$route.params.id)
            }
        },
        mounted(){
            this.$store.dispatch("loadGroups")
        }
    }
</script>