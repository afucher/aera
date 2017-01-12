<template>
    <div>
        <div v-for="group in groups">
            {{group.start_date}}
        </div>
    </div>
</template>
 
<script>
import {SET_GROUPS} from '../../vuex/mutation-types'
import {mapState} from 'vuex'
    export default {
        name: "AeraListGroup",
        computed: {
         ...mapState([
            'groups',
        ])},
        mounted() {
            this.$store.dispatch('loadGroups')
        }
    }
</script>