<template>
    <div>
        <button @click.prevent="unsetTeacher">Remover como Professor</button>
    </div>
</template>

<script>
export default {
    name: "BtnUnsetTeacher",
    props:["id"],
    methods: {
        unsetTeacher(){
            this.$store.dispatch('toogleTeacher', {id:this.id,teacher:false})
        }
    }
}
</script>