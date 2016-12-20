<template>
    <div>
    <h1>Aera</h1>
    {{ message }}
    <button v-on:click="teste2">Teste</button>
    </div>
    
</template>
<script>
import MyService from '../services/CourseService';
    export default{
        data : () => {
            return {message: 'Seja bem-vindo'}
        },
        created : function() {
            this.service = new MyService();
        },
        methods: {
            teste2 : function(){
                this.service.getCourses().then(r => console.log(r));
            }
        }
    }   
</script>