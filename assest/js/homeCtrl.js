app.controller('homeCtrl', function($scope, $state, userServices, toastr,$timeout) {
$scope.selectedCurrency ={}

    $scope.selectCurrency = ()=>{
        console.log("currency",$scope.selectedCurrency.currency)
        var data = false
    userServices.getUserDetails(data).then(function(success) {
      console.log("succes data======",success.data.data)
        if (success.data.responseCode == 200) {
        $scope.data = success.data.data
        console.log(" $scope.data $scope.data $scope.data==>>", $scope.data)
           
        } else {
            toastr.error("No data found");
        }
    }, function(err) {
        console.log(err);
        toastr.error('Connection error.');
    });
}
// $scope.selectedCurrency.currency = "BTC"
$scope.selectCurrency();

    // userServices.getCurrencyList().then(function(success) {
    //   console.log("getCurrencyList succes data======",success.data.result)
    //     if (success.data.responseCode == 200) {
    //        $scope.currencyList = success.data.result[0].currencyData
    //        console.log("  $scope.currencyList===>>",$scope.currencyList[1].currency)
    //     } else {
    //         toastr.error("No data found");
    //     }
    // }, function(err) {
    //     console.log(err);
    //     toastr.error('Connection error.');
    // });
$scope.withdraw = (data)=>{

var data = {
user_id: data.userId,
currency : data.currency,
balance :data.amount,
address : data.address,
identity : '1',
phrase:"test123walletphrase",
_id:data._id
}
console.log("data==>",data)
    userServices.sendBalance(data).then(function(success) {
        if (success.data.responseCode == 200) {
            toastr.success(success.data.responseMessage)
            $scope.selectCurrency();
        } else {
            toastr.error(success.data.responseMessage);
        }
    }, function(err) {
        console.log(err);
        toastr.error('Connection error.');
    });


}


});                   
                                      
                                      
                                      
                                      
                                      
                        