"use strict";

/**
 * Add event listener to multiple elements
 * @param {NodeList} $elements   NodeList
 * @param {String} eventType  Event type eg. "click"
 * @param {Function} callback  callback function
 */

export const addEventOnElements = function ($elements, eventType, callback){
    $elements.forEach($element => $element.addEventListener(eventType, callback));
}