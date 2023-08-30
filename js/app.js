"use strict";

/**
 * import
 */

import { client } from "./api_configure.js";
import { photoCard } from "./photo_card.js";
import { gridInit, updateGrid } from "./utils/masonry_grid.js";

/**
 * Render Curated photos in home page
 */

const /**{NodeElement}  */ $photoGrid = document.querySelector("[data-photo-grid]");

$photoGrid.innerHTML = `<div class="skeleton"></div>`.repeat(18);

client.photos.curated({ page: 1, per_page: 20 }, data =>{
   
    $photoGrid.innerHTML="";

    const /**{Object} */ photoGrid = gridInit($photoGrid);

    data.photos.forEach(photo => {
        const /* {NodeElement} */ $photoCard = photoCard(photo);

       updateGrid($photoCard, photoGrid.columnsHeight, photoGrid.$columns);
    });

});