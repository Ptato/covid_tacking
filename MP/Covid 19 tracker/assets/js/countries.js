// ALL state NAMES WITH THEIR ISO CODE
let state_list = [
    { name: 'Andaman and Nicobar Islands', code: 'AN' },
    { name: 'Andhra Pradesh', code: 'AP' },
    { name: 'Arunachal Pradesh', code: 'AR' },
    { name: 'Assam', code: 'AS' },
    { name: 'Bihar', code: 'BR' },
    { name: 'Chandigarh', code: 'CH' },
    { name: 'Chhattisgarh', code: 'CT' },
    { name: 'Dadra and Nagar Haveli', code: 'DN' },
    { name: 'Daman and Diu', code: 'DD' },
    { name: 'Delhi', code: 'DL' },
    { name: 'Goa', code: 'GA' },
    { name: 'Gujarat', code: 'GJ' },
    { name: 'Haryana', code: 'HR' },
    { name: 'Himachal Pradesh', code: 'HP' },
    { name: 'Jammu and Kashmir', code: 'JK' },
    { name: 'Jharkhand', code: 'JH' },
    { name: 'Karnataka', code: 'KA' },
    { name: 'Kerala', code: 'KL' },
    { name: 'Lakshadweep', code: 'LD' },
    { name: 'Madhya Pradesh', code: 'MP' },
    { name: 'Maharashtra', code: 'MH' },
    { name: 'Manipur', code: 'MN' },
    { name: 'Meghalaya', code: 'ML' },
    { name: 'Mizoram', code: 'MZ' },
    { name: 'Nagaland', code: 'NL' },
    { name: 'Odisha', code: 'OR' },
    { name: 'Puducherry', code: 'PY' },
    { name: 'Punjab', code: 'PB' },
    { name: 'Rajasthan', code: 'RJ' },
    { name: 'Sikkim', code: 'SK' },
    { name: 'Tamil Nadu', code: 'TN' },
    { name: 'Telangana', code: 'TG' },
    { name: 'Tripura', code: 'TR' },
    { name: 'Uttar Pradesh', code: 'UP' },
    { name: 'Uttarakhand', code: 'UT' },
    { name: 'West Bengal', code: 'WB' }
];

// SELECT SEARCH state ELEMENTS
const search_state_element = document.querySelector(".search-state");
const state_list_element = document.querySelector(".state-list");
const change_state_btn = document.querySelector(".change-state");
const close_list_btn = document.querySelector(".close");
const input = document.getElementById('search-input')

// CREATE TE state LIST
function createstateList(){
    const num_state = state_list.length;

    let i = 0, ul_list_id;

    state_list.forEach( (state, index) => {
        if( index % Math.ceil(num_state/num_of_ul_lists) == 0){
            ul_list_id = `list-${i}`;
            state_list_element.innerHTML += `<ul id='${ul_list_id}'></ul>`;
            i++;
        }

        document.getElementById(`${ul_list_id}`).innerHTML += `
            <li onclick="fetchData('${state.code}')" id="${state.name}">
            ${state.name}
            </li>
        `;
    })
}

let num_of_ul_lists = 3;
createstateList();

// SHOW/HIDE THE COUTRY LIST ON CLICK EVENT
change_state_btn.addEventListener("click", function(){
    input.value = "";
    resetstateList();
    search_state_element.classList.toggle("hide");
    search_state_element.classList.add("fadeIn");
});

close_list_btn.addEventListener("click", function(){
    search_state_element.classList.toggle("hide");
});

state_list_element.addEventListener("click", function(){
    search_state_element.classList.toggle("hide");
});

// state FILTER
/* input event fires up whenever the value of the input changes */
input.addEventListener("input", function(){
    let value = input.value.toUpperCase();

    state_list.forEach( state => {
        if( state.name.toUpperCase().startsWith(value)){
            document.getElementById(state.name).classList.remove("hide");
        }else{
            document.getElementById(state.name).classList.add("hide");
        }
    })
})

// RESET state LIST (SHOW ALL THE COUNTRIES )
function resetstateList(){
    state_list.forEach( state => {
        document.getElementById(state.name).classList.remove("hide");
    })
}