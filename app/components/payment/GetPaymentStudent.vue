<template>
    <div>
        <modal name="select-month">
            <input type="text" v-model="month"/>
            <button @click.prevent="download">Download</button>
        </modal>
        <button @click.prevent="selectMonth">Gerar recibo</button>
    </div>
</template>

<script>
    export default {
        props:['id'],
        data: function() {
            return {
                month : 1
            }
        },
        methods: {
            selectMonth(){
                this.$modal.show('select-month');
            },
            download(){
                this.$modal.hide('select-month');
                this.$http.get(`/api/clients/${this.id}/receipt?month=${this.month}`,{responseType:'blob'}).then(a=>{
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