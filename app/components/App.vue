<template>
    <div>
    <h1>Aera</h1>
    <h4>{{ message }}</h4>
    <router-view></router-view>
    </div>
    
</template>

<script>
import { mapState } from 'vuex'
export default {
    computed : {
         ...mapState([
            'message',
        ]),
    }
}

</script>
