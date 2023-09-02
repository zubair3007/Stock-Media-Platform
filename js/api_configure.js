"use strict";

/**
 * Import
 */

import { urlEncode } from "./utils/urlEncode.js";

const /**{string} */ API_KEY = "jY6UsB5lbFU0g0w4EKTpxzfAdXDz9icitS4tWLm75NIGKxOlNyluVSrC";

const /** {Function} */ headers = new Headers();

headers.append("Authorization", API_KEY);
const /**{Object} */ requestOptions = { headers };

/**
 * Fetch data from pexels
 * @param {string} url Fetch Url
 * @param {Function} successCallback  Success callback function
 */

const fetchData = async function (url, successCallback)
{
    const /**{Object}  */  response = await fetch(url, requestOptions);

    if(response.ok){
        const /** {object} */ data = await response.json();
        successCallback(data);
    }

    else{
        console.log("The request failed");
    }
    
}


let /**{string} */ requestUrl ="";

const /**{object} */ root ={
    default: "https://api.pexels.com/v1/",
    videos: "https://api.pexels.com/videos/"
}

export const /*{object} */ client ={
    photos: {

        /**
         * 
         * @param {Object} parameters Url Object
         * @param {Function} callback Callback function
         */
        search(parameters,callback){
            requestUrl = `${root.default}search?${urlEncode(parameters)}`;
            fetchData(requestUrl,callback);
        },

        /**
         * 
         * Curated photos
         */

        curated(parameters,callback){
            fetchData(`${root.default}curated?${urlEncode(parameters)}`,callback);
        
        },


        /**
         * Get single photo detail
         * @param {String} id photo ID
         * @param {Function} callback Callback function 
         */
        detail(id, callback){
            fetchData(`${root.default}photos/${id}`,callback);
        }
    },

      Videos: {

        /**
         * 
         * @param {Object} parameters Url Object
         * @param {Function} callback Callback function
         */
        search(parameters,callback){
            requestUrl = `${root.videos}search?${urlEncode(parameters)}`;
            fetchData(requestUrl,callback);
        },

        /**
         * 
         *Get  popular photos
         */

        popular(parameters,callback){
            fetchData(`${root.videos}popular?${urlEncode(parameters)}`,callback);
        
        },


        /**
         * Get single video detail
         * @param {String} id video ID
         * @param {Function} callback Callback function 
         */
        detail(id, callback){
            fetchData(`${root.videos}videos/${id}`,callback);
        }
    },

     collections: {

       

        /**
         * 
         * Get Featured collections
         */

        featured(parameters,callback){
            requestUrl = `${root.default}collections/featured?${urlEncode(parameters)}`;
            fetchData(requestUrl,callback);
        
        },


        /**
         * Get media collections
         * @param {String} id collection ID
         * @param {Function} callback Callback function 
         * @param {Object} parameters Callback function
         */
        detail(id,parameters, callback){
            requestUrl = `${root.default}/collections/${id}?${urlEncode(parameters)}`;
            fetchData(requestUrl,callback);
        }
    },
    
        
    
}