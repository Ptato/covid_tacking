

// SELECT ALL ELEMENTS
const state_name_element = document.querySelector(".state .name");
const first_dose_element = document.querySelector(".first_dose .value");
const new_first_dose_element = document.querySelector(".first_dose .new-value");
const second_dose_element = document.querySelector(".second_dose .value");
const new_second_dose_element = document.querySelector(".second_dose .new-value");

const ctx = document.getElementById("axes_line_chart").getContext("2d");

// APP VARIABLES
let app_data = [],
  cases_list = [],
  recovered_list = [],
  deaths_list = [],
  deaths = [],
  formatedDates = [];
  one_dose = [];
  two_dose=[];

// GET USERS state CODE
let state_code = geoplugin_regionCode()
let user_state
var c_s
state_list.forEach(state=>{
  if(state.code==state_code){
    user_state=state.name
    s_code=state.code
  }
});
console.log(user_state);



  function fetchData(s_code){
    cases_list=[],deaths_list=[],recovered_list=[],formatedDates=[],one_dose=[],two_dose=[]
    fetch(`https://data.covid19bharat.org/v4/min/timeseries.min.json`
    ).then(response =>{
      return response.json();
    }).then(data=>{
      state_list.forEach(state=>{
        if(state.code==s_code){
          c_s=state.name
        }
      });
      
      dates = Object.keys(data[s_code].dates)
      dates.forEach(date=>{
        let DATA = data[s_code].dates[date]

        app_data.push(DATA)
        one_dose.push(DATA.total.vaccinated1)
        two_dose.push(DATA.total.vaccinated2)
        
        
      })
    }).then( () =>{
      updateUI()
    })
  }

  
  fetchData(s_code);
  
function updateUI() {
  updateStats();
  axesLinearChart();
}

function updateStats() {

  
  const first_dose = one_dose[one_dose.length - 1];
  const new_first_dose = first_dose - one_dose[one_dose.length - 2];


  const second_dose = two_dose[two_dose.length - 1];
  const new_second_dose = second_dose - two_dose[two_dose.length - 2];

  state_name_element.innerHTML = c_s;
  first_dose_element.innerHTML = first_dose;
  new_first_dose_element.innerHTML = `+${new_first_dose}`;
  second_dose_element.innerHTML = second_dose;
  new_second_dose_element.innerHTML = `+${new_second_dose}`;

  dates.forEach((date) => {
    formatedDates.push(formatDate(date));
  });
}

// UPDATE CHART
let my_chart;
function axesLinearChart() {
  if (my_chart) {
    my_chart.destroy();
  }

  my_chart = new Chart(ctx, {
    type: "line",
    data: {
      datasets: [
        {
          label: "One dose",
          data: one_dose,
          fill: false,
          borderColor: "#FFF",
          backgroundColor: "#FFF",
          borderWidth: 1,
        },
        {
          label: "Two dose",
          data: two_dose,
          fill: false,
          borderColor: "#009688",
          backgroundColor: "#009688",
          borderWidth: 1,
        },
       
      ],
      labels: formatedDates,
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
    },
  });
}

// FORMAT DATES
const monthsNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function formatDate(dateString) {
  let date = new Date(dateString);

   return `${date.getDate()} ${monthsNames[date.getMonth()]}`;
 }
