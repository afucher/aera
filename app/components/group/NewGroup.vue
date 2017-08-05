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
            <input name="start_hour" type="text" v-model="course.start_hour"
                 v-validate="{ rules: { regex: /^([0-1][0-9]|2[0-3]):([0-5][0-9])$/,required:true} }" 
                 required>
            <span v-show="errors.has('start_hour')" class="bg-danger">{{ errors.first('start_hour') }}</span>
        </div>
        <div class="form-group">
            <label>Horário de término</label>
            <input name="end_hour" type="text" v-model="course.end_hour"
                v-validate="{ rules: { regex: /^([0-1][0-9]|2[0-3]):([0-5][0-9])$/,required:true} }"
                required>
            <span v-show="errors.has('end_hour')" class="bg-danger">{{ errors.first('end_hour') }}</span>
        </div>
        <div class="form-group">
            <label for="teacher">Professor</label>
            <select name="teacher" v-model="course.teacher_id" v-validate data-vv-rules="required">
                <option v-for="teacher in teachers" v-bind:value="teacher.id">
                    {{ teacher.name }}
                </option>
            </select>
            <span v-show="errors.has('teacher')" class="bg-danger">Favor selecionar um professor</span>
        </div>
        <div class="form-group">
            <label for="classes">Nº de aulas</label>
            <input type="number" name="classes" v-model="course.classes">
        </div>
        <button type="submit">Nova Turma</button>
        <MyErrMsg :errorMessage="errorMessage"></MyErrMsg>
    </form>
</div>
</template>

<script>
// 
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
                course_id: this.$route.params.id,
                teacher_id:'',
                classes:0
            },
            errorMessage:''
        }
    },
    computed: {
        teachers() {
            return this.$store.state.teachers;
        }
    },
    mounted(){
        this.$store.dispatch('loadTeachers');
    },
    methods: {
        createGroup(e) {
            this.$validator.validateAll();
            if(this.errors.any()) return;
            const that = this;
            this.$store.dispatch('createGroup', this.course)
                .then((c)=>{
                    that.$router.push({name:'group',params:{id:c.id}})
                })
                .catch((err) => {
                    this.errorMessage = err;
                });
        }
    }
}


</script>