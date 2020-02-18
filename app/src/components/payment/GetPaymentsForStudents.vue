<template>
    <div>
        <modal name="select-month">
            <div class="form-group">
                <label>Selecione o mês a ser gerado:</label>
                <select v-model="month">
                    <option value="1">Janeiro</option>
                    <option value="2">Fevereiro</option>
                    <option value="3">Março</option>
                    <option value="4">Abril</option>
                    <option value="5">Maio</option>
                    <option value="6">Junho</option>
                    <option value="7">Julho</option>
                    <option value="8">Agosto</option>
                    <option value="9">Setembro</option>
                    <option value="10">Outubro</option>
                    <option value="11">Novembro</option>
                    <option value="12">Dezembro</option>
                </select>
            </div>
            <div class="form-group">
                <label>Data de vencimento</label>
                <input name="due_date" type="text" v-model="due_date"
                    v-validate="{ rules: { regex: /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/,required:true} }" 
                    required>
                <span v-show="errors.has('due_date')" class="bg-danger">{{ errors.first('due_date') }}</span>
            </div>
            <button @click.prevent="download">Download</button>
        </modal>
        <button @click.prevent="selectMonth">Gerar pagamento da turma</button>
    </div>
</template>

<script>
    export default {
        props:['ids'],
        data: function() {
            return {
                month : 1,
                due_date: ""
            }
        },
        methods: {
            selectMonth(){
                this.$modal.show('select-month');
            },
            async download(){
                var errors = await this.$validator.validateAll();
                if(!errors) return;
                this.$modal.hide('select-month');
                this.$http.post(`/api/paymentList`,{ids:this.ids, month: this.month, due_date: this.due_date},{responseType:'blob'}).then(a=>{
                    let result = document.createElement('a');
                    document.body.appendChild(result);
                    let contentDisposition = a.headers.get('Content-Disposition') || '';
                    let filename = contentDisposition.split('filename=')[1] ;
                    filename = filename.replace(/"/g,"");
                    a.blob().then(function(data) {
                       // data = new Blob([data], {type:'application/pdf'});
                        //console.log(atob(data));
                        let url = window.URL.createObjectURL(data);
                        result.href = url;
                        result.target = '_self';
                        result.download = filename;
                        result.click();
                        return result;
                    })
                    .catch(console.log);
                })
            }
        }
    }

    var readBlobAsDataUrl = function(blob, cb) {
	var a = new FileReader();
	a.onload = function(e) {
		cb(e.target.result);
	};
	a.readAsDataURL(blob);
}
</script>