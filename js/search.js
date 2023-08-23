"use strict";

/**
 * Imports
 */

import {ripple} from "./utils/ripple.js";
import { addEventOnElements } from "./utils/event.js";
import { segment } from "./segment_btn.js";
/**
 * Search view toggle in small devices
 */

const /**{NodeList}*/ $searchTogglers = document.querySelectorAll("[data-search-toggler]"); 
const /**{ NodeElement} */ $searchView = document.querySelector("[data-search-view]");

addEventOnElements($searchTogglers, "click", () => $searchView.classList.toggle("show"));

/**
 * Search clear
 */

const /**{NodeElement} */ $searchFeild = document.querySelector("[data-search-feild]");
const /**{NodeElement}*/ $searchClearBtn = document.querySelector("[data-search-clear-btn]"); 

$searchClearBtn.addEventListener("click", () => $searchFeild.value = "");

/**
 * Search Type
 */

const /**{NodeElement}  */ $searchSegment = document.querySelector("[data-segment='search']");
const /** {NodeElement} */ $activeSegmentBtn = $searchSegment.querySelector("[data-segment-btn].selected");

window.searchType = $activeSegmentBtn.dataset.segmentValue;
segment($searchSegment, segmentValue => window.searchType = segmentValue)

/**
 * Search Submit
 */

const /** {NodeElement} */ $searchBtn = document.querySelector("[data-search-btn]"); 
$searchBtn.addEventListener("click", function() {
    const /** {Boolean} */ searchValue = $searchFeild.value.trim();
    console.log(searchValue);
    
    if(searchValue)
   {
    updateSearchHistory(searchValue);
   }

});

/**
 * Search History
 */

// Initial search history

let /** {object} */ searchHistory = { items: [] };

if(window.localStorage.getItem("search_history")) {
    searchHistory = JSON.parse(window.localStorage.getItem("search_history"));
}

else{
    window.localStorage.setItem("search_history", JSON.stringify(searchHistory));
}

//Update search history

const updateSearchHistory = searchValue => {
    /**
     * If the searched value is already present in search list then remove
     * that one and add the search value at the begining of the search list
     * This ensures that the most recent search is at the top of the history
     */

    if(searchHistory.items.includes(searchValue)) {
        searchHistory.items.splice(searchHistory.items.indexOf(searchValue), 1);
    }
    searchHistory.items.unshift(searchValue);

    window.localStorage.setItem("search_history", JSON.stringify(searchHistory));

}






