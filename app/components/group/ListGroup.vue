<template>
    <div>
        <v-server-table url="/api/groups" :columns="columns" ></v-server-table>
        <router-view></router-view>
    </div>
</template>
 
<script>
export default {
    name: "AeraListGroup",
    data: function(){
        return {
            columns: ['name','start_date','end_date']
        }
    }
    
}
</script>