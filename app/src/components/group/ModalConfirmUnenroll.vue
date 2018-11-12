<template>
    <modal name="confirm-unenroll" @before-open="beforeOpen">
        <div>
            <h2>Confirma a exclusão desse aluno da turma?</h2>
            <h3 v-if="student">{{student.name}}</h3>
            <button @click="confirm()">Confirmar</button>
            <button @click="close()">Cancelar</button>
        </div>
        
    </modal>
</template>

<script>

export default {
    name:"ModalUnenroll",
    data: function() {
        return {
            student: {}
        }
    },
    methods: {
        confirm () {
            this.$emit("confirm",this.student);
            this.$modal.hide('confirm-unenroll');
        },
        close () {
            this.$modal.hide('confirm-unenroll');
        },
        beforeOpen(event) {
            this.student = event.params.student;
        }
    }
}
</script>