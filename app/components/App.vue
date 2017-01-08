<template>
    <div>
        <AeraMenu></AeraMenu>
        <h4>{{ message }}</h4>
        <router-view></router-view>
    </div>
    
</template>

<script>
import { mapState } from 'vuex'
import AeraMenu from './Menu.vue'
export default {
    components:{AeraMenu},
    computed : {
         ...mapState([
            'message',
        ]),
    }
}

</script>
