function numberWithCommas(x) {
 return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


$(document).ready(function(){

var url= "https://api.covid19india.org/data.json"

$.getJSON(url, function(data){
	 console.log(data);

   const TotalCases= data.statewise[0];

const total_confirmed =numberWithCommas(TotalCases.confirmed);
const total_active= numberWithCommas(TotalCases.active);
const total_rcd= numberWithCommas(TotalCases.recovered);
const total_deaths= numberWithCommas(TotalCases.deaths);

$("#totalConf").append("Total Confirmed :" + total_confirmed);


$("#confirmed").append(total_confirmed);
$("#active").append(total_active);
$("#recovered").append(total_rcd);
$("#deaths").append(total_deaths);

// Code for doughnut Chart

var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
		type: 'doughnut',
    data: {
        labels: ['Active ('+ total_active +') ', 'Recovered ('+ total_rcd+')','Deaths ('+ total_deaths +')'],
        datasets: [{
            data: [TotalCases.active, TotalCases.recovered,TotalCases.deaths],
            backgroundColor: [
                'rgba(0, 255, 255, 0.3)',
                'rgba(0, 255, 0, 0.3)',
                'rgba(255, 0, 0, 0.3)',
            ],
            hoverBackgroundColor: [
              'rgba(0, 255, 255, 0.1)',
              'rgba(0, 255, 0, 0.1)',
              'rgba(255, 0, 0, 0.1)',
            ],
            borderColor: [
              'rgba(0, 255, 255, 1)',
              'rgba(0, 255, 0, 1)',
              'rgba(255, 0, 0, 1)',
            ],
            borderWidth: 3,
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


function makeTableHTML(myArray) {
    var result = "<table border=1 class='table table-striped'>";
    for(var i=0; i<myArray.length; i++) {
        result += "<tr id='trow'>";
        for(var j=0; j<myArray[i].length; j++){
					  if(i===0){
              if(j===0){
							result += '<th id="tbds">'+myArray[i][j]+"</th>";
            }else{
              result += '<th id="tbdd">'+myArray[i][j]+"</th>";

            }
						}else{
              if(j===0){
                var newState=myArray[i][0].split(" ").join("");
                var link="/"+newState;
                var newl="<a href="+link+">";
                console.log(newl);
							result += '<td id="tbds">'+ newl +myArray[i][j]+"</a></td>";
            }else{
              result += "<td id='tbdd'>"+myArray[i][j]+"</td>";

            }
						}
        }
        result += "</tr>";
    }
    result += "</table>";

    return result;
}

var myArray = [["State/UT","Confirmed","Active","Recoverd","Deaths"]];
var n=0;
$.each(data.statewise,function(id,obj){
  if(n===0){
		n=1;
	}else{
	var each_state=[];
    each_state.push(obj.state);
		each_state.push(numberWithCommas(obj.confirmed));
		each_state.push(numberWithCommas(obj.active));
		each_state.push(numberWithCommas(obj.recovered));
		each_state.push(numberWithCommas(obj.deaths));
		myArray.push(each_state);
  }

})
// console.log(myArray);
$("#bye").append(makeTableHTML(myArray));


})

})
