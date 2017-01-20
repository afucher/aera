<template>
    <div v-if="group">
        <p>Data de início: {{group.start_date}}</p>
        <p>Data de fim: {{group.end_date}}</p>
        <p>Das {{group.start_hour}} às {{group.end_hour}}</p>
    </div>
    
</template>
<script>
export default {
        name: "CourseGroups",
        props: ['group_id'],
        computed: {
            group() {
                let group_id = this.group_id || this.$route.params.id;
                return this.$store.getters.group(group_id);
            }
        },
        mounted(){
            this.$store.dispatch("loadGroups")
        }
    }
</script>