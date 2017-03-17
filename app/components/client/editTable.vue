<template>
    <a class="fa fa-edit" :href="'#/clients/' +  data.id + '/edit'">Edit</a>
</template>
<script>
    export default {
        props:['data'],
    }
</script>