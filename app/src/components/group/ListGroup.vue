<template>
    <div>
        <input type="checkbox" v-model="allGroups"  @change="toggleAllGroups()">Todas as turmas</input>
        <v-server-table url="/api/groups" :columns="columns" :options="options"></v-server-table>
    </div>
</template>
 
<script>
import {Event} from 'vue-tables-2';
import view from './table-templates/ViewGroupAction.vue'
export default {
    name: "AeraListGroup",
    props: ['course'],
    data: function(){
        let course_id = this.course;
        return {
            columns: ['name','start_date','end_date','view'],
            options: {
                headings: {
                        name: 'Nome',
                        start_date: 'Data de início',
                        end_date: 'Data de fim',
                        view: 'Ação'
                    },
                customFilters: ['course','allGroups'],
                initFilters: {course:course_id, allGroups:false},
                templates: {view}
            },
            allGroups: false
        }
    },
    watch: {
        course: function(){
            Event.$emit('vue-tables.filter::course', this.course);
        }
    } ,
    methods: {
        toggleAllGroups(){
            Event.$emit('vue-tables.filter::allGroups', this.allGroups);
        }
    }

}
</script>