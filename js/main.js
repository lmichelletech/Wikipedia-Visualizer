// let api_url = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=${searchTerm.value}&format=json&callback=?'

//Grab Elements
const wiki_link = 'https://en.wikipedia.org/wiki'
const randomEndpoint = '/Special:Random'
const searchButton = document.querySelector('.search')
const randomButton = document.querySelector('.random')
let searchTerm = document.querySelector('.searchTerm')
const output = document.querySelector('.output')
const imgContainer = document.querySelector('.imageContainer')
const img = imgContainer.querySelector('img')
const suggest = document.querySelector('.suggestions')
const giphy_endpoint = 'http://api.giphy.com/v1' // query key is 'q'
const giphy_api_key = 'dc6zaTOxFJmzC' // query key is 'api_key'
const results = document.querySelector('.results')

//Define Functions
function ajaxSearch() {
    clear()
    const api_url = `https://en.wikipedia.org/w/api.php?action=opensearch&search=${searchTerm.value}&format=json&callback=?`
    if (searchTerm.value != '' || searchTerm.value != searchTerm.getAttribute('placeholder') || searchTerm.value != null) {
        $.ajax({
            url: api_url,
            dataType: 'json',
            success: (data) => {
                console.log(data)
                // img.src = "img/wikipedia-logo.png"
                //data[1] is the title
                //data[2] is the description
                //data[3] is the links

                for (var i = 0; i < data[1].length; i++) {
                    if (i % 2 == 0) {
                        output.innerHTML += `
                        <li class="even">
                            <a href="${data[3][i]}">${data[1][i]}</a>
                            <p>${data[2][i]}</p>
                        </li>
                    `
                    }
                    else{
                        output.innerHTML += `
                        <li class="odd">
                            <a href="${data[3][i]}">${data[1][i]}</a>
                            <p>${data[2][i]}</p>
                        </li>
                    `
                    }
                }

            },
            error: (error) => {
                console.log('There was an error')
            }
        })
        getGifs(searchTerm.value, "search")
    }

}

function clear() {
    document.getElementById("output").innerHTML = "";
}

function getGifs(term, path) {
    $.ajax({
        //http://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=${API_Key}&limit=1
        url: `${giphy_endpoint}/gifs/${path}?api_key=${giphy_api_key}&q=${term}`,
        dataType: "json",
        success: function (data) {
            //console.log(data.data[0].images.preview_gif.url)
            $('.imagecontainer img').hide();
            imgContainer.innerHTML = `
            <img src="${data.data[1].images.preview_gif.url}">`
        },
        error: function (error) {
            console.log(error)
        }
    })
}

function suggestions(){
    ideas=["Year 10,000 problem.", "Dusty the klepto kitty.", "List of common misconceptions.", "List of inventors killed by their own inventions.", "Nix v. Hedden.", "Lawsuits against God.", "Toilet paper orientation.", "Modern flat Earth societies.", "Products produced from The Simpsons.", "Mike the Headless Chicken."]
    let z = Math.floor((Math.random() * ideas.length-1) + 1)
    console.log(ideas[z])
    suggest.innerHTML = `
        <p>Recommended Searches: ${ideas[z]}</p>`
}
//Call Function / Add Event Listeners

searchButton.addEventListener('click', ajaxSearch)
randomButton.addEventListener('click', function () {
    window.open(`${wiki_link}${randomEndpoint}`)
})

// Execute a function when the user releases a key on the keyboard
searchTerm.addEventListener("keyup", function(event) {
    // Cancel the default action, if needed
    event.preventDefault();
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
      // Trigger the button element with a click
      document.getElementById("search").click();
    }
  })

suggestions()