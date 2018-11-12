<template>
    <div>
        <GroupForm :group="group" :teachers="teachers"
            v-on:formSubmit="updateGroup"></GroupForm>
    </div>
</template>
<script>
import Datepicker from 'vuejs-datepicker'
import GroupForm from './GroupForm.vue'
export default {
        name: "GroupEdit",
        props: ['group_id'],
        components: {Datepicker,GroupForm},
        data: function(){
            return {
                errorMessage: ''
            }
        },
        computed: {
            group(){
                let group_id = this.group_id || this.$route.params.id;
                return this.$store.getters.group(group_id);
            },
            teachers() {
                return this.$store.state.teachers;
            }
        },
        mounted(){
            this.$store.dispatch("loadGroups")
        },
        methods: {
            updateGroup(group){
                this.$store.dispatch("updateGroup",group)
                    .then(() => this.$router.push('/groups/'+group.id))
                    .catch((err) => this.errorMessage = err.body.message);
            }
        }
    }
</script>