<template>
    <div>
        <button @click.prevent="makeTeacher">Tornar Professor</button>
    </div>
</template>

<script>
export default {
    name: "BtnMakeTeacher",
    props:["id"],
    methods: {
        makeTeacher(){
            this.$store.dispatch('toogleTeacher', {id:this.id,teacher:true})
        }
    }
}
</script>