"use strict"

/***
 * 
 * Import
 */

import { addEventOnElements } from "../js/utils/event.js";


/***
 * Add menu functionality
 * @param{Node} $menuWrapper Menu parent node
 * @param {function} callback Callback function
 */

export const menu = function($menuWrapper, callback)

{
    const /**{node element} */ $menu = $menuWrapper.querySelector("[data-menu]");   
    const /**{NodeList} */ $menuTogglers = $menuWrapper.querySelectorAll("[data-menu-toggler]");
    const /**{NodeList} */ $menuItems = $menuWrapper.querySelectorAll("[data-menu-item]"); 

    addEventOnElements($menuTogglers, "click", () =>{
        $menu.classList.toggle("expanded");
    })
    addEventOnElements($menuItems, "click", function() {
        $menu.classList.remove("expanded");
       
        if(callback) callback(this.dataset.menuItem);
    
    })
}