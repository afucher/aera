<template>
<div v-if="group">
    <form @submit.prevent="createGroup">
    <div class="form-group">
        <label>Data de início</label>
        <datepicker v-model="group.start_date"></datepicker>
    </div>
    <div class="form-group">
        <label>Data de término</label>
        <datepicker v-model="group.end_date"></datepicker>
    </div>
    <div class="form-group">
        <label>Horário de início</label>
        <el-time-select      
            :picker-options="{ start: '00:00', end: '24:00' }"
            v-model="group.start_hour">
        </el-time-select>
    </div>
    <div class="form-group">
        <label>Horário de término</label>
        <el-time-select
            :picker-options="{ start: '00:00', end: '24:00' }"
            v-model="group.end_hour">
        </el-time-select>
    </div>
    <button type="submit">Nova Turma</button>
    <div  v-if="errorMessage" class="alert alert-danger alert-dismissible" role="alert">
        <span>{{errorMessage}}</span>
    </div>
    </form>
    
</div>
</template>
<script>
import Datepicker from 'vuejs-datepicker'
export default {
        name: "GroupEdit",
        props: ['group_id'],
        components: {Datepicker},
        data: function(){
            return {
                errorMessage: ''
            }
        },
        computed: {
            group(){
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