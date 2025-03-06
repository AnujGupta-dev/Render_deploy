const countriesContainer = document.querySelector('.countries-container')
const filterByRegion = document.querySelector('.filter')
const searchInput = document.querySelector('.search input')
const themeChanger = document.querySelector('.theme-changer')
const togglebtn = document.querySelector('.toggle')
const switchhere = document.querySelector('.switch')




let allCountriesData

fetch('https://restcountries.com/v3.1/all')
  .then((res) => res.json())
  .then((data) => {
    renderCountries(data)
    allCountriesData = data
  })

  filterByRegion.addEventListener('change', (e) => {
    fetch(`https://restcountries.com/v3.1/region/${filterByRegion.value}`)
      .then((res) => res.json())
      .then(renderCountries)
  })


function renderCountries(data) {
  countriesContainer.innerHTML = ''
  data.forEach((country) => {
    const countryCard = document.createElement('a')
    countryCard.classList.add('country-card')
    countryCard.href = `/country.html?name=${country.name.common}`
    countryCard.innerHTML = `
          <img src="${country.flags.svg}" alt="${country.name.common} flag" />
          <div class="card-text">
              <h3 class="card-title">${country.name.common}</h3>
              <p><b>Population: </b>${country.population.toLocaleString(
                'en-IN'
              )}</p>
              <p><b>Region: </b>${country.region}</p>
              <p><b>Capital: </b>${country.capital?.[0]}</p>
          </div>
  `
    countriesContainer.append(countryCard)
  })
}

searchInput.addEventListener('input',  (e) => {
  const filteredCountries = allCountriesData.filter((country) => country.name.common.toLowerCase().includes(e.target.value.toLowerCase()))
  renderCountries(filteredCountries)
})



togglebtn.addEventListener('click', () => {
  //document.body.classList.toggle('dark')
  
var theme;
var SetTheme = document.body;
    SetTheme.classList.toggle("dark")
if(SetTheme.classList.contains("dark")){
  theme = "DARK";
}else{
  theme = "LIGHT";
}
})






  togglebtn.addEventListener("click",()=>{
    switchhere.classList.toggle('switch-click')
    switchhere.classList.toggle('white')
    switchhere.classList.toggle('white-click')
    togglebtn.classList.toggle('white')
    switchhere.innerHTML=('<i class="fa-regular fa-moon "></i>')

    
  })





/*
//borders coutries
//-- search input-- 
filter by region --
curruncies map filter 
*/







