<template>
    <div>
        <AeraMenu></AeraMenu>
        <div class="container">
            <router-view></router-view>
        </div>
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
