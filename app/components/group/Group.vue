<template>
    <div v-if="group">
        <h1>Informações da turma:</h1>
        <p>Data de início: {{group.start_date}}</p>
        <p>Data de fim: {{group.end_date}}</p>
        <p>Das {{group.start_hour}} às {{group.end_hour}}</p>
        <div v-if="group.Students.length > 0">
            <h2>Alunos matriculados:</h2>
            <div v-for="student in group.Students">
                <p>{{student.name}}</p>
            </div>
        </div>
    </div>
    
</template>
<script>
export default {
        name: "CourseGroups",
        props: ['group_id'],
        computed: {
            group() {
                let group_id = this.group_id || this.$route.params.id;
                return this.$store.getters.group(group_id);
            }
        },
        mounted(){
            this.$store.dispatch("loadGroups")
        }
    }
</script>