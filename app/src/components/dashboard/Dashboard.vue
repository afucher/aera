<template>
  <div class="small">
    <payment-chart></payment-chart>
  </div>
</template>

<script>
  import PaymentChart from './PaymentChart.vue'

  export default {
    components: {
      PaymentChart
    }
  }
</script>


<style>
.small {
    width: 300px;
}
</style>
