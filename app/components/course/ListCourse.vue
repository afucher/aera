<template>
    <div>
        <v-server-table url="/api/courses" :columns="columns" :options="options"></v-server-table>
        <router-view></router-view>
    </div>
</template>
 
<script>
import newGroup from './table-templates/newGroupAction.vue'
import listGroup from './table-templates/listGroupAction.vue'

    export default {

        name: "AeraListCourse",
        data: function(){
            return {
                columns: ['name','courseLoad','listGroup','newGroup'],
                options: {
                    templates: {
                        newGroup,
                        listGroup
                    }
                }
            }
        }
        
    }
</script>