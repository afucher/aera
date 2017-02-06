<template>
    <div>
        <AeraMenu></AeraMenu>
        <h4>{{ message }}</h4>
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
