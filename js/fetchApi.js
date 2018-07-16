(function(){
	 const FetchApi = function(plus) {
         return  new FetchApi.fn.init(plus);
     }
     FetchApi.prototype = FetchApi.fn = {
         constructor: FetchApi,
         init: function (window){
						let xhr = new plus.net.XMLHttpRequest();
						this.xhr = xhr;
						this.xhr.withCredentials = true;
						return this;
				 },
				 fetch:function(options){
					 const that = this;
					 this.xhr.open( options.method,options.url,true);
					 this.xhr.setRequestHeader('Content-Type',(options&&options.contentType)?'application/json':options.contentType);
					 this.xhr.overrideMimeType((options&&options.accept)?options.accept:"application/json;utf-8");	
					 if(options.method.toUpperCase()=="POST"){
						this.xhr.send(options.data);
					 }else{
						this.xhr.send()
					 }
					 this.xhr.onreadystatechange=function(){
							if( that.xhr.readyState === 4) {
								console.log("readyState==="+that.xhr.readyState)
								console.log("status==="+that.xhr.status)
								console.log("statusText===="+that.xhr.statusText)
								console.log("responseType==="+that.xhr.responseType)
								console.log("response==="+that.xhr.response)
								console.log("responseText===="+that.xhr.responseText)
								if(that.xhr.status == 200 ) {
									options.success(that.xhr.response)
								} else {
									options.fail(that.xhr.response)
								}
							}
					 }
				 }
     }
     FetchApi.fn.init.prototype = FetchApi.fn;
     window.FetchApi  = FetchApi;
})()


