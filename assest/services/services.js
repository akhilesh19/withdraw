//var baseurl = 'http://:8000';
var baseurl = 'http://199.188.204.100:5001/exchanges/api/v1/user';
var baseurlLocal = 'http://localhost:6000'
var baseurlWithdraw = 'http://199.188.204.100:5001/exchanges/api/v1/transection'


app.service('userServices',function($http){

	return{ 
		login : function(data){
			return $http.post(baseurl+'/login', data);
		},
		getUserDetails : function(data){
			console.log("data===>>",data)
			return $http.get(baseurlWithdraw+'/getWithdrawReq?status='+data);
		},
		// getCurrencyList : function(){
		// 	return $http.get(baseurlLocal+'/getCurrencyList');
		// },
		sendBalance : function(data){
			console.log("data===>>",data)
			return $http.post(baseurlWithdraw+'/sendBalance',data);
		},
		// scrape : function(data){
			
		// 	//var datas = JSON.stringify(data)
		// 	console.log("datafgfh======>>",baseurl+'/scrape', data)
		// 	return $http.post(baseurl+'/scrape', data);
		// 	},

		// uploadImage : function(data){
  //           return $http.post(baseurl+'/uploadimage', data);
		// },
		// searchlist: function(data){
  //           return $http.get(baseurl+'/searchlist');
		// },
		// viewImages: function(data){
  //           return $http.post(baseurl+'/showImages',data);
		// }
    }
})
