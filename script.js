let card = document.getElementById("root")
let searchButton = document.getElementById("search-button")
let searchInput= document.getElementById("search-for-episode")
let allepisodes;
function gameOfThronesEpisodes(){
searchButton.addEventListener("click",doSearch)
fetch("https://api.tvmaze.com/shows/82/episodes")
  .then((response) => { console.log(response)
    if (response.status >= 200 && response.status <= 299) {
      return response.json();
    } else {
      throw new Error(
        `Encountered something unexpected: ${response.status} ${response.statusText}`
      );
    }
  })
  .then((jsonResponse) => {
    console.log(jsonResponse);
    allepisodes = jsonResponse;
    render(jsonResponse);
  })
  .catch((error) => {
    console.log(error);
  });
};

function render(elemnets){
  elemnets.forEach((obj)=> {
    let episode = document.createElement("div");
    episode.classList = "col-lg-4 p-2 justify-content-center";
    episode.innerHTML = `
      <div class="card w-100 h-100">
        <img class="card-img-top rounded"
        src="${obj.image.original}"
        alt="image of episode ${obj.name}"/>
        <div class="card-body text-center d-flex flex-column">
          <h5 class="card-title">${obj.name} | S${obj.season}E${obj.number}</h5>
          <p class="card-text">${obj.summary}</p>
          <a href="${obj.url}" target="_blank" class="btn btn-info mt-auto">More info</a>
        </div>
      </div>`;
      card.appendChild(episode);
console.log(episode);
  });

}
function doSearch(){
  console.log(searchInput.value)
  let resultOfSearch= allepisodes.filter((iteam)=>{
    if (iteam.name.toLowerCase().includes(searchInput.value.toLowerCase())
    || iteam.summary.toLowerCase().includes(searchInput.value.toLowerCase())){
      return true;
    }
  })
  card.innerHTML="";
  render(resultOfSearch)
}
  window.onload = gameOfThronesEpisodes;
