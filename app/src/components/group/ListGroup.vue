<template>
    <div>
        <input type="checkbox" v-model="allGroups"  @change="toggleAllGroups()">Todas as turmas</input>
        <v-server-table url="/api/groups" :columns="columns" :options="options"></v-server-table>
    </div>
</template>
 
<script>
import {Event} from 'vue-tables-2';
import view from './table-templates/ViewGroupAction.vue'

const weekDays = ['','Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];
export default {
    name: "AeraListGroup",
    props: ['course'],
    data: function(){
        let course_id = this.course;
        return {
            columns: ['name','teacher','start_date','end_date','weekDay','view'],
            options: {
                responseAdapter : function(data) {
                            data.data = data.data.map(group => {
                                group['weekDay'] = weekDays[new Date(group.start_date).getDay()];
                                return group;
                            })
                            return data;
                        },
                headings: {
                        name: 'Nome',
                        teacher: 'Professor',
                        start_date: 'Data de início',
                        end_date: 'Data de fim',
                        weekDay: 'Dia da semana',
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