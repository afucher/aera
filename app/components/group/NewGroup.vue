<template>
<div>
    <form @submit.prevent="createGroup">
    <div class="form-group">
        <label>Data de início</label>
        <datepicker v-model="course.start_date"></datepicker>
    </div>
    <div class="form-group">
        <label>Data de término</label>
        <datepicker v-model="course.end_date"></datepicker>
    </div>
    <div class="form-group">
        <label>Horário de início</label>
        <el-time-select      
            :picker-options="{ start: '00:00', end: '24:00' }"
            v-model="course.start_hour">
        </el-time-select>
    </div>
    <div class="form-group">
        <label>Horário de término</label>
        <el-time-select
            :picker-options="{ start: '00:00', end: '24:00' }"
            v-model="course.end_hour">
        </el-time-select>
    </div>
    <input type="text" v-model="course.start_hour">
        <button type="submit">Nova Turma</button>
        <MyErrMsg :errorMessage="errorMessage"></MyErrMsg>
    </form>
    
</div>
</template>

<script>
import { mapActions } from 'vuex'
import moment from 'moment'
import Datepicker from 'vuejs-datepicker'
import MyErrMsg from '../util/ErrorMessage.vue'

export default {
    components: {Datepicker, MyErrMsg},
    data: function(){
        return {
            course : {
                start_date: '',
                end_date: '',
                start_hour: '',
                end_hour: '',
                course_id: this.$route.params.id
            },
            errorMessage:''
        }
    },
    methods: {
        createGroup(e) {
            this.$store.dispatch('createGroup', this.course)
                .then((a)=>console.log(a))
                .catch((err) => this.errorMessage = err);
        }
    }
}
</script>