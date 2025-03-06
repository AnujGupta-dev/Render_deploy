const countryName = new URLSearchParams(location.search).get('name')
const flagImage = document.querySelector('.country-details img')
const countryNameH1 = document.querySelector('.country-details h1')
const nativeName = document.querySelector('.native-name')
const population = document.querySelector('.population')
const region = document.querySelector('.region')
const subRegion = document.querySelector('.sub-region')
const capital = document.querySelector('.capital')
const topLevelDomain = document.querySelector('.top-level-domain')
const currencies = document.querySelector('.currencies')
const languages = document.querySelector('.languages')
const borderCountries = document.querySelector('.border-countries')
const togglebtn = document.querySelector('.toggle')
const switchhere = document.querySelector('.switch')




fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
  .then((res) => res.json())
  .then(([country]) => {
    flagImage.src = country.flags.svg;
    countryName.innerText = country.name.common
    countryNameH1.innerText = country.name.common
    population.innerText = country.population.toLocaleString('en-IN')
    region.innerText = country.region
    topLevelDomain.innerText = country.tld.join(', ')
    console.log(country)
    const lat = country.latlng[0];
    const lng = country.latlng[1];
    console.log(lat);
    console.log(lng);
    const map = L.map('map'); 
    map.setView([51.505, -0.09], 6); 

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap'
    }).addTo(map); 
  // Sets map data source and associates with map
  
    let marker;
    marker = L.marker([lat, lng]).addTo(map);
    
    map.setView([lat, lng]);

    if (country.capital) {
      capital.innerText = country.capital?.[0]
    }

    if (country.subregion) {
      subRegion.innerText = country.subregion
    }

    if (country.name.nativeName) {
      nativeName.innerText = Object.values(country.name.nativeName)[0].common
    } else {
      nativeName.innerText = country.name.common
    }

    if (country.currencies) {
      currencies.innerText = Object.values(country.currencies)
        .map((currency) => currency.name)
        .join(', ')
    }
    console.log(country);
    

      
    

    if (country.languages) {
      languages.innerText = Object.values(country.languages).join(', ')

    }
    if (country.borders) {
      
      country.borders.forEach((border) => {
        fetch(`https://restcountries.com/v3.1/alpha/${border}`)
          .then((res) => res.json())
          .then(([borderCountry]) => {
            // console.log(borderCountry)
            const borderCountryTag = document.createElement('a')
            borderCountryTag.innerText = borderCountry.name.common
            borderCountryTag.href = `country.html?name=${borderCountry.name.common}`
            borderCountries.append(borderCountryTag)
          })
      })
    }


  

    



  
    

})


togglebtn.addEventListener('click', () => {
  document.body.classList.toggle('dark')
})

togglebtn.addEventListener("click",()=>{
  switchhere.classList.toggle('switch-click')
  switchhere.classList.toggle('white')
  switchhere.classList.toggle('white-click')
  togglebtn.classList.toggle('white')
  switchhere.innerHTML=('<i class="fa-regular fa-moon "></i>')
  
})


/*

if(country.border){
country.border.forEach((border)=>{

  fetch(api-bordercounters{border})
  .then((res)=>res.json()) parse data json format
  .then((data)=>{
      createelemnet a tag document.createElemenr(a)
      .innertext == border.common.name
      countrytag.innerhtml == 'country.html?name={}'
      bordercountries.append anchor tag


    })
  
  }


}



















*/