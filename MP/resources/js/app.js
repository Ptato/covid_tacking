/* ---------------------------------------------- */
/*            CODE EXPLAINED TUTORIALS            */
/*         www.youtube.com/CodeExplained          */
/* ---------------------------------------------- */

// SELECT ALL ELEMENTS
const state_name_element = document.querySelector(".state .name");
const total_cases_element = document.querySelector(".total-cases .value");
const new_cases_element = document.querySelector(".total-cases .new-value");
const recovered_element = document.querySelector(".recovered .value");
const new_recovered_element = document.querySelector(".recovered .new-value");
const deaths_element = document.querySelector(".deaths .value");
const new_deaths_element = document.querySelector(".deaths .new-value");

const ctx = document.getElementById("axes_line_chart").getContext("2d");

// APP VARIABLES
let app_data = [],
  cases_list = [],
  recovered_list = [],
  deaths_list = [],
  deaths = [],
  formatedDates = [];

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
    cases_list=[],deaths_list=[],recovered_list=[],formatedDates=[]
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
        cases_list.push(DATA.total.confirmed)
        deaths_list.push(DATA.total.deceased)
        recovered_list.push(DATA.total.recovered)
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

  const total_cases = cases_list[cases_list.length - 1];
  const new_confirmed_cases = total_cases - cases_list[cases_list.length - 2];

  const total_recovered = recovered_list[recovered_list.length - 1];
  const new_recovered_cases = total_recovered - recovered_list[recovered_list.length - 2];

  const total_deaths = deaths_list[deaths_list.length - 1];
  const new_deaths_cases = total_deaths - deaths_list[deaths_list.length - 2];

  state_name_element.innerHTML = c_s;
  total_cases_element.innerHTML = total_cases;
  new_cases_element.innerHTML = `+${new_confirmed_cases}`;
  recovered_element.innerHTML = total_recovered;
  new_recovered_element.innerHTML = `+${new_recovered_cases}`;
  deaths_element.innerHTML = total_deaths;
  new_deaths_element.innerHTML = `+${new_deaths_cases}`;

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
          label: "Cases",
          data: cases_list,
          fill: false,
          borderColor: "#FFF",
          backgroundColor: "#FFF",
          borderWidth: 1,
        },
        {
          label: "Recovered",
          data: recovered_list,
          fill: false,
          borderColor: "#009688",
          backgroundColor: "#009688",
          borderWidth: 1,
        },
        {
          label: "Deaths",
          data: deaths_list,
          fill: false,
          borderColor: "#f44336",
          backgroundColor: "#f44336",
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
