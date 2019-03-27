<template>
    <div v-if="group">
        <div class="row">
            <div class="col-md-6">
                <div>
                    <h1>Curso {{group.Course.name}}</h1>
                     <router-link class="small" :to="{ name: 'groupEdit', params: { id: group.id }}">Editar</router-link>
                    <h2>Informações da turma:</h2>
                    <p>Professor: {{group.Teacher.name}}</p>
                    <p>Data de início: {{group.start_date}} - Data de fim: {{group.end_date}}</p>
                    <p>{{group.classes}} aulas</p>
                    <p>Das {{group.start_hour}} às {{group.end_hour}}</p>
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
            </div>
            <div class="col-md-6">
                <div v-if="group.Students && group.Students.length > 0">
                    <h2>Alunos matriculados:</h2>
                    <div v-for="student in group.Students" :key="student.id">
                        {{student.name}} - presença: 
                        <input type="number" :max="group.classes" min=0 v-model="student.ClientGroup.attendance">
                        <button @click.prevent="updateAttendance(student.id,student.ClientGroup.attendance)">Atualizar presença</button>
                        <button @click.prevent="confirmUnenroll(student)">Desmatricular</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">

            <div>
                <DownloadList :id="groupId"></DownloadList>
            </div>
        </div>
        <div class="row">

            <div>
                <button @click="$modal.show('hello-world')">Gerar parcelas</button>
                <ModalPayment v-on:save="createInstallments"></ModalPayment>
            </div>
        </div>
        <div class="row">
            <ListPayment :groupId="groupId"></ListPayment>
        </div>
        <ModalUnenroll @confirm="unenrollStudent"/>
    </div>
    
</template>
<script>
import GroupService from '../../services/GroupService'
import MyErrMsg from '../util/ErrorMessage.vue'
import DownloadList from './GetGroupList.vue'
import ModalPayment from '../payment/ModalPayment.vue'
import ModalUnenroll from './ModalConfirmUnenroll.vue'
import ListPayment from '../payment/ListPayment.vue'
const Service = new GroupService();
export default {
        name: "Group",
        props: ['group_id'],
        components: {MyErrMsg,DownloadList,ModalPayment,ModalUnenroll,ListPayment},
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
                }).then((att) => {
                    this.selected_client_obj['ClientGroup'] = att[0];
                    this.group.Students.push(this.selected_client_obj);
                    this.resetSelecteds();
                }).catch((err) => {
                    this.errorMessage = err.body.message;
                });
                
            },
            confirmUnenroll(student) {
                this.$modal.show('confirm-unenroll',{student:student});
            },
            unenrollStudent(student) {
                this.errorMessage = '';
                this.$store.dispatch('unenrollStudent',{
                    group: this.group,
                    student: student
                }).then((att) => {
                    const index = this.group.Students.findIndex(s => s.id == student.id);
                    this.group.Students.splice(index, 1);
                }).catch((err) => {
                    this.errorMessage = err.body.message;
                });
            },
            resetSelecteds() {
                this.selected_client_name = null,
                this.selected_client_obj = null
            },
            updateAttendance(student_id, attendance) {
                let data = {
                    group_id : this.groupId,
                    student_id,
                    attendance
                };
                this.$store.dispatch('setStudentAttendance',data);
            },
            createInstallments(payment) {
                let data = {
                    group_id : this.groupId,
                    payment
                };
                this.$store.dispatch('createInstallments',data);
            }
        }
    }
</script>