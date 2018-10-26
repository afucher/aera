<template>
    <modal name="confirm-unenroll">
        <div>
            <h2>Confirma a exclusão desse aluno da turma?</h2>
            <button @click="confirm()">Confirmar</button>
            <button @click="close()">Cancelar</button>
        </div>
        
    </modal>
</template>

<script>

export default {
    name:"ModalUnenroll",
    methods: {
        confirm () {
            this.$emit("confirm");
            this.$modal.hide('confirm-unenroll');
        },
        close () {
            this.$modal.hide('confirm-unenroll');
        }
    }
}
</script>