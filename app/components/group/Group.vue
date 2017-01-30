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
        <div>
            <h2>Matricular aluno:</h2>
            <el-autocomplete
                class="inline-input"
                v-model="selected_client_name"
                :fetch-suggestions="querySearch"
                placeholder="Please Input"
                :trigger-on-focus="false"
                @select="handleSelect"
                ></el-autocomplete>
            <button @click.prevent="matriculaAluno">Matricular</button>
        </div>
    </div>
    
</template>
<script>

export default {
        name: "Group",
        props: ['group_id'],
        data : function(){
            return {
                selected_client_name: null,
                selected_client_obj: null
            }
        },
        computed: {
            group() {
                let group_id = this.group_id || this.$route.params.id;
                return this.$store.getters.group(group_id);
            }
        },
        mounted(){
            this.$store.dispatch("loadGroups")
        },
        methods: {
            getData(obj){
                this.selected_client = obj;
            },
            querySearch(queryString, cb) {
                this.$http.get('/api/autocomplete/client?q=' + queryString)
                .then(r => r.json())
                .then(r => r.map(item => {
                    item.value = item.name;
                    return item
                })).then(cb);
            },
            handleSelect(item) {
                this.selected_client_obj = item;
            },
            matriculaAluno(aluno) {
                this.$store.dispatch('addStudentToGroup',{
                    group: this.group,
                    student: this.selected_client_obj
                }).then(this.resetSelecteds);
                
            },
            resetSelecteds() {
                this.selected_client_name = null,
                this.selected_client_obj = null
            }
        }
    }
</script>