function numberWithCommas(x) {
 return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

$(document).ready(function(){

var cityName=$("#cityName").text();
console.log(cityName);
var url= "https://api.covid19india.org/data.json"
$.getJSON(url, function(data){

var total_confirmed,total_active,total_deaths,total_rcd;
$.each(data.statewise,function(id,obj){
     var name=obj.state.toLowerCase();
     if(name===cityName){
       total_confirmed =obj.confirmed;
       total_active= obj.active;
       total_rcd= obj.recovered;
       total_deaths= obj.deaths;
     }
})

var tc =numberWithCommas(total_confirmed);
var ta= numberWithCommas(total_active);
var tr= numberWithCommas(total_rcd);
var td= numberWithCommas(total_deaths);

$("#totalConf").append("Total Confirmed :" + tc);

$("#confirmed").append(tc);
$("#active").append(ta);
$("#recovered").append(tr);
$("#deaths").append(td);

// Code for doughnut Chart

var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {

		type: 'doughnut',
    data: {

        labels: ['Active ('+ ta +') ', 'Recovered ('+ tr+')','Deaths ('+ td +')'],
        datasets: [{
            data: [total_active, total_rcd,total_deaths],
            backgroundColor: [
                'rgba(0, 255, 255, 0.6)',
                'rgba(0, 255, 0, 0.6)',
                'rgba(255, 0, 0, 0.6)',
            ],
            hoverBackgroundColor: [
              'rgba(0, 255, 255, 0.2)',
              'rgba(0, 255, 0, 0.2)',
              'rgba(255, 0, 0, 0.2)',
            ],
            borderColor: [
              'rgba(0, 255, 255, 1)',
              'rgba(0, 255, 0, 1)',
              'rgba(255, 0, 0, 1)',
            ],
            borderWidth: 1,
            hoverBorderWidth: 3,
            borderAlign: 'inner',
            weight: 3
        }]
    },
    option: {
    	animation: {
    		animateRotate: true
    	}
    }
});

});

var url2= "https://api.covid19india.org/v2/state_district_wise.json"

$.getJSON(url2, function(data){
   console.log(data);
var myArray = [["District","Confirmed","Active","Recoverd","Deaths"]];

$.each(data,function(id,obj){
  var name=obj.state.toLowerCase();
  if(name===cityName){
    $.each(obj.districtData,function(id,object){

     var each_city=[];
        each_city.push(object.district);
       each_city.push((object.confirmed));
       each_city.push((object.active));
       each_city.push((object.recovered));
       each_city.push((object.deceased));
       myArray.push(each_city);
    })
  }
})
function makeTableHTML(myArray) {
      var result = "<table border=1 class='table table-striped'>";
      for(var i=0; i<myArray.length; i++) {
          result += "<tr id='trow' class='clickable-row' data-href='#'>";
          for(var j=0; j<myArray[i].length; j++){
  					  if(i===0){
  							result += "<th>"+myArray[i][j]+"</th>";
  						}else{
  							result += "<td id='tbd'>"+myArray[i][j]+"</td>";
  						}
          }
          result += "</tr>";
      }
      result += "</table>";

      return result;
}

myArray.sort(compareSecondColumn);

function compareSecondColumn(a,b) {
    if (a[1] === b[1]) {
        return 0;
    }
    else {
        return (a[1] > b[1]) ? -1 : 1;
    }
}

$("#bye").append(makeTableHTML(myArray));

});

})
