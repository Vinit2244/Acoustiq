const baseURL = "https://itunes.apple.com/search?limit=50&media=music&entity=musicTrack,album,mix,song&";

const search_body = document.querySelector(".search-results");

const duration_filter_mins = document.querySelector("#duration-filter-min");
const duration_filter_secs = document.querySelector("#duration-filter");
const explicit_filter = document.querySelector("#explicit-filter");

var results = [];

function filter_results (res) {
    var max_time = duration_filter_mins.value * 60000 + duration_filter_secs.value * 1000;
    const enable_explicit = !explicit_filter.checked;
    if (max_time == 0) max_time = 1e9;
    return res
	.filter((el) => {
	    return el['wrapperType'] != 'track' ||
		(el['wrapperType'] == 'track' && el['trackTimeMillis'] < max_time); 
	})
	.filter((el) => {
	    return (enable_explicit || el['contentAdvisoryRating'] != 'Explicit');
	})
	.slice(0, 10);
} 

function insert_into_dom (elements) {
    console.log(elements);
    search_body.textContent = '';

    const fragment = document.createDocumentFragment();

    if (elements.length == 0) {
	const error_heading = document.createElement('h1');
	error_heading.id = "error-result";
	error_heading.textContent = "Aw! Couldn't find any results.";
	fragment.append(error_heading);
    }
    
    elements.forEach((el) => {
	const div = document.createElement('div');
	div.className = "search-result";

	switch (el['wrapperType']) {
	case 'track': {
	    const artist_img = document.createElement('img');
	    artist_img.setAttribute('src', el['artworkUrl100']);
	    artist_img.className = "album-art"
	    div.appendChild(artist_img);
	    
	    const name = document.createElement('h2');
	    name.textContent = el['trackName'];
	    div.appendChild(name);
	    
	    const artist = document.createElement('h4');
	    artist.textContent = el['artistName'];
	    div.appendChild(artist);
	    
	    const preview = document.createElement('audio');
	    preview.setAttribute('controls', '');
	    const src = document.createElement('source');
	    src.setAttribute('src',  el['previewUrl']);	
	    preview.appendChild(src);
	    div.appendChild(preview);

	    div.className += " song";
	    break;
	}
	case 'collection': {
	    const artist_img = document.createElement('img');
	    artist_img.setAttribute('src', el['artworkUrl100']);
	    artist_img.className = "album-art"
	    div.appendChild(artist_img);
	    
	    const name = document.createElement('h2');
	    name.textContent = el['collectionName'];
	    div.appendChild(name);
	    
	    const artist = document.createElement('h4');
	    artist.textContent = el['artistName'];
	    div.appendChild(artist);

	    div.className += " album";
	    break;
	}
	}
	fragment.append(div);
    });

    explicit_filter.disabled = false;
    duration_filter_secs.disabled = false;
    duration_filter_mins.disabled = false;
    searchbar.disabled = false;
    
    search_body.append(fragment);
}

function search (event) {
    searchbar = document.querySelector("#search-input-textbox");
    search_term = encodeURIComponent(searchbar.value);

    var url = baseURL;
    if (explicit_filter.checked) {
	url += "explicit=No&";
    }

    explicit_filter.disabled = true;
    duration_filter_secs.disabled = true;
    duration_filter_mins.disabled = true;
    searchbar.disabled = true;
    fetch(url + "term=" + search_term)
	.then((response) => response.json())
	.then((search_results) => {
	    console.log(search_results);
	    insert_into_dom(filter_results(search_results['results']));
	});
}

document.querySelector("#search").onclick = search;

document.querySelector("#clear").onclick = function (){
    duration_filter_mins.value = "";
    duration_filter_secs.value = "";
    explicit_filter.checked = false;
};
