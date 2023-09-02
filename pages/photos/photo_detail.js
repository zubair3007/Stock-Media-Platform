"use strict";

import { client } from "../../js/api_configure.js";
import { ripple } from "../../js/utils/ripple.js";
import {gridInit, updateGrid} from "../../js/utils/masonry_grid.js";
import { photoCard } from "../../js/photo_card.js";
import { menu } from "../../js/menu.js";
import { favorite } from "../../js/favorite.js";

/**
 * Add ripple effect
 */

const /** {NodeList} */ $rippleElems = document.querySelectorAll("[data-ripple]"); 
$rippleElems.forEach($rippleElem => ripple($rippleElem));


/**
 * Page Transition
 */

window.addEventListener("LoadStart", function () {
    document.body.style.opacity ="0";

});

window.addEventListener("DOMContentLoaded", function () {
    document.body.style.opacity ="1";

});

/**
 * Menu Toggle
 */


const /**{NodeList} */  $menuWrappers = document.querySelectorAll("[data-menu-wrapper]");

$menuWrappers.forEach($menuWrapper =>{
    menu($menuWrapper);
});

/**
 * Add to favorite
 */

const /**{Object} */ favoritePhotos = JSON.parse(window.localStorage.getItem
("favorite")).photos;

const /**{Nodeelement} */ $favoriteBtn = document.querySelector("[data-add-favorite]");

const /**{String} */ photoId = window.location.search.split("=")[1];
console.log(photoId);

$favoriteBtn.classList[favoritePhotos[photoId] ? "add" : "remove"]("active"); 

favorite($favoriteBtn, "photos", photoId);


/**
 * Render detail data
 */

const /**{NodeElement} */ $detailWrapper = document.querySelector("[data-detail-wrapper]");
const /**{NodeElement } */ $downloadLink = document.querySelector("[data-download-link]");
const /**{NodeElement} */ $downloadMenu = document.querySelector("[data-download-menu]");

client.photos.detail(photoId, data =>{
    console.log(data);

    const {
        avg_color,
        height,
        width,
        photographer,
        alt,
        src } = data;

        $downloadLink.href = src.original;

        Object.entries(src).forEach(item => {
            const [key, value] = item;

            $downloadMenu.innerHTML += `
             <a href="${value}" download class="menu-item" data-ripple data-menu-item>
                <span class="label-large text">${key}</span>

                <div class="state-layer"></div>
            </a>
            `;

            $detailWrapper.innerHTML = `
             <figure class="detail-banner" style="aspect-ratio: ${width} / ${height};
             background-color: ${avg_color}">
                <img src="${src.large2x}" width="${width}" height="${height}" alt="${alt}" class="img-cover">
            </figure>
            
            <p class="title-small">Photograph by <span class="color-primary">${photographer}</span></p>
                   
            `;

            const /**{NodeElement} */ $detailImg = $detailWrapper.querySelector("img");

            $detailImg.style.opacity = 0;

            $detailImg.addEventListener("load", function () {
                this.animate({
                    opacity: 1

                }, {duration: 400 ,fill: "forwards"});

                if(alt) {
                    client.photos.search({query: alt, page:1, per_page: 30} , data =>{
                        loadSimilar(data);
                    });
                    }

                 else{
                        $loader.style.display = "none";
                        $photoGrid.innerHTML = "<p>No Similar Photo found</p>";
                    }
            });
           
        })
});


/**
 * Load similar photos
 * @param {Object} data photo data
 */

const /**{NodElement} */ $photoGrid = document.querySelector("[data-photo-grid]");
const /**{object} */ photoGrid=  gridInit($photoGrid);

const /**{NodEElement} */ $loader = document.querySelector("[data-loader]");

const loadSimilar  = function(data) {

    data.photos.forEach(photo => {
        const /**{NodeElement} */ $card = photoCard(photo);

        updateGrid($card, photoGrid.columnsHeight, photoGrid.$columns);
        $loader.style.display = "none";
    })

}





