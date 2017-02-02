<template>
    <div  v-if="errorMessage" class="alert alert-danger alert-dismissible" role="alert">
        <span>{{errorMessage}}</span>
    </div>
</template>
<script>
export default {
    props: ['errorMessage']
}
</script>