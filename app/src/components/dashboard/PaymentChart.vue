<script>
import { Bar } from 'vue-chartjs'
import PaymentService from '../../services/PaymentService'
let service = new PaymentService();
const monthStr = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

export default {
  extends: Bar,
  props: ['options'],
  data () {
      return {
          chartData: {}
      }
  },
  mounted () {
    const month = new Date().getMonth()
    this.chartData = {
        labels: [monthStr[month],monthStr[month+1],monthStr[month+2]],
        datasets: [
        {
            label: 'Realizado',
            backgroundColor: '#00FF00',
            data: [600, 490, 830]
        }, {
            label: 'Planejado',
            backgroundColor: '#0000FF',
            data: [600, 700, 900]
        }
        ]
    }
    this.renderChart(this.chartData, this.options)
    this.fetchData();
  },
  methods:{
    fetchData () {
        const month = new Date().getMonth();
        let realizado = [];
        let planejado = [];
        let dataMonth3 = [];
        service.getTotals(month).then(({body}) => {
            realizado.push(body[0].paid);
            realizado.push(body[1].paid);
            realizado.push(body[2].paid);
            planejado.push(body[0].paid + body[0].unpaid);
            planejado.push(body[1].paid + body[1].unpaid);
            planejado.push(body[2].paid + body[2].unpaid);
            this.chartData = {
                labels: [monthStr[month],monthStr[month+1],monthStr[month+2]],
                datasets: [
                {
                    label: 'Realizado',
                    backgroundColor: '#00FF00',
                    data: realizado
                }, {
                    label: 'Planejado',
                    backgroundColor: '#0000FF',
                    data: planejado
                }
                ]
            };
            this.renderChart(this.chartData, this.options);
        });
    }
  }
}
</script>