<template>
    <div v-if="group">
        <h1>Curso {{group.Course.name}}</h1>
        <h2>Informações da turma:</h2>
        <p>Professor: {{group.Teacher.name}}</p>
        <p>Data de início: {{group.start_date}} - Data de fim: {{group.end_date}}</p>
        <p>{{group.classes}} aulas</p>
        <p>Das {{group.start_hour}} às {{group.end_hour}}</p>
        <div v-if="group.Students && group.Students.length > 0">
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
            <MyErrMsg :errorMessage="errorMessage"></MyErrMsg>
        </div>
        <div>
            <DownloadList :id="groupId"></DownloadList>
        </div>
    </div>
    
</template>
<script>
import GroupService from '../../services/GroupService'
import MyErrMsg from '../util/ErrorMessage.vue'
import DownloadList from './GetGroupList.vue'
const Service = new GroupService();
export default {
        name: "Group",
        props: ['group_id'],
        components: {MyErrMsg,DownloadList},
        data : function(){
            return {
                selected_client_name: null,
                selected_client_obj: null,
                group: null,
                errorMessage: null
            }
        },
        computed: {
            groupId: function() {
                return this.group_id || this.$route.params.id
            }
        },
        mounted(){
            //this.group_id = this.group_id || this.$route.params.id;
            Service.get(this.groupId).then(g => this.group = g);
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
                this.errorMessage = '';
                this.$store.dispatch('addStudentToGroup',{
                    group: this.group,
                    student: this.selected_client_obj
                }).then(() => {
                    this.group.Students.push(this.selected_client_obj);
                    this.resetSelecteds();
                }).catch((err) => {
                    this.errorMessage = err.body.message;
                });
                
            },
            resetSelecteds() {
                this.selected_client_name = null,
                this.selected_client_obj = null
            }
        }
    }
</script>