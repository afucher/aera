<template>
    <div>
        <div v-for="group in groups">
            <p>{{group.start_date}} - <router-link :to="{ name: 'group',params:{id:group.id}}">Detalhes</router-link></p>
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