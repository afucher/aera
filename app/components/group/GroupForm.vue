<template>
    <form @submit.prevent="formSubmit">
        <div class="form-group">
            <label>Data de início</label>
            <input type="text" v-model="group.start_date"/>
        </div>
        <div class="form-group">
            <label>Data de término</label>
            <input type="text" v-model="group.end_date"/>
        </div>
        <div class="form-group">
            <label>Horário de início</label>
            <input name="start_hour" type="text" v-model="group.start_hour"
                 v-validate="{ rules: { regex: /^([0-1][0-9]|2[0-3]):([0-5][0-9])$/,required:true} }" 
                 required>
            <span v-show="errors.has('start_hour')" class="bg-danger">{{ errors.first('start_hour') }}</span>
        </div>
        <div class="form-group">
            <label>Horário de término</label>
            <input name="end_hour" type="text" v-model="group.end_hour"
                v-validate="{ rules: { regex: /^([0-1][0-9]|2[0-3]):([0-5][0-9])$/,required:true} }"
                required>
            <span v-show="errors.has('end_hour')" class="bg-danger">{{ errors.first('end_hour') }}</span>
        </div>
        <div class="form-group">
            <label for="teacher">Professor</label>
            <select name="teacher" v-model="group.teacher_id" v-validate data-vv-rules="required">
                <option v-for="teacher in teachers" v-bind:value="teacher.id">
                    {{ teacher.name }}
                </option>
            </select>
            <span v-show="errors.has('teacher')" class="bg-danger">Favor selecionar um professor</span>
        </div>
        <div class="form-group">
            <label for="classes">Nº de aulas</label>
            <input type="number" name="classes" v-model="group.classes">
        </div>
        <div  v-if="errorMessage" class="alert alert-danger alert-dismissible" role="alert">
            <span>{{errorMessage}}</span>
        </div>
        <button type="submit" class="btn btn-default">Salvar</button>
        <button @click.prevent="cancel" class="btn btn-default">Cancelar</button>
    </form>
</template>
<script>
export default {
    props: ['group','teachers'],
    data: function(){
        return {
            errorMessage: ''
        }
    },
    methods: {
        formSubmit(){
            this.$validator.validateAll()
                .then(()=>{
                    this.$emit("formSubmit", this.group);
                })
                .catch(()=>{});
        },
        cancel(){
            this.$emit("formCancel");
        }
    }
}
</script>