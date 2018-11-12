<template>
    <div>
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
                customFilters: ['course'],
                initFilters: {course:course_id},
                templates: {view}
            }
        }
    },
    watch: {
        course: function(){
            Event.$emit('vue-tables.filter::course', this.course);
        }
    } 
    
}
</script>