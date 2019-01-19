<template>
    <div>
        <GroupForm :group="group" :teachers="teachers"
            v-on:formSubmit="updateGroup"></GroupForm>
    </div>
</template>
<script>
import GroupService from '../../services/GroupService'
import Datepicker from 'vuejs-datepicker'
import GroupForm from './GroupForm.vue'
const groupSrv = new GroupService();
export default {
        name: "GroupEdit",
        props: ['group_id'],
        components: {Datepicker,GroupForm},
        data: function(){
            return {
                group: {},
                errorMessage: ''
            }
        },
        computed: {
            teachers() {
                return this.$store.state.teachers;
            }
        },
        mounted(){
            groupSrv.get(this.$route.params.id).then(g => {
                this.group = g;
            });
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