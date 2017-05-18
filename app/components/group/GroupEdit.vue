<template>
    <div>
        <GroupForm :group="group" :teachers="teachers"></GroupForm>
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
            getData(obj){
                this.selected_client = obj;
            },
            querySearch(queryString, cb) {
                this.$http.get('/api/autocomplete/client?q=' + queryString)
                .then(r => r.json())
                .then(r => r.map(item => {
                    item.value = item.name;
                    return item
                })).then(cb);
            },
            handleSelect(item) {
                this.selected_client_obj = item;
            },
            matriculaAluno(aluno) {
                this.$store.dispatch('addStudentToGroup',{
                    group: this.group,
                    student: this.selected_client_obj
                }).then(this.resetSelecteds);
                
            },
            resetSelecteds() {
                this.selected_client_name = null,
                this.selected_client_obj = null
            }
        }
    }
</script>