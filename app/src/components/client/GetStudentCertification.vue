<template>
    <button @click.prevent="download">Gerar certificado</button>
</template>

<script>
    export default {
        props:['id'],
        methods: {
            download(){
               
                this.$http.get(`/api/clients/${this.id}/certification?`,{responseType:'blob'}).then(a=>{
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