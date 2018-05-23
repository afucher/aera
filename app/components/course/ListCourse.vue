<template>
    <div>
        <v-server-table url="/api/courses" :columns="columns" :options="options"></v-server-table>
        <router-view></router-view>
    </div>
</template>
 
<script>
import newGroup from './table-templates/newGroupAction.vue'
    export default {
        name: "AeraListCourse",
        data: function(){
            return {
                columns: ['name','courseLoad','newGroup'],
                options: {
                    templates: {
                        newGroup
                    }
                }
            }
        }
        
    }
</script>