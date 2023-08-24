"use strict";
/**
 * Import 
 */
import { urlEncode } from "./urlEncode.js";

/**
 * Update url
 * @param {Object} filterObj  Filter object
 * @param {*} searchType  search type eg. 'videos' or 'Photos';
 */

export const updateUrl = (filterObj, searchType) => {
    setTimeout(() => {
        const /**{String} */ root = window.location.origin;
        console.log(filterObj);
        console.log(searchType);

        const /**{String} */ searchQuery = urlEncode(filterObj);

        window.location = `${root}/pages/${searchType}/${searchType}.html?${searchQuery}`;
        
    },500);
}