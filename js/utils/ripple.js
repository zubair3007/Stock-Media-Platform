/**
 * Ripple Effect
 */

"use strict";

/**
 * Add ripple effect on element
 * @param {Node} $rippleElem element for ripple effect
 */

export const ripple =function ($rippleElem)
{
   $rippleElem.addEventListener("pointerdown", function (e){
    e.stopImmediatePropagation();

    const /** {NodeElement} */ $ripple = document.createElement("div");

    $ripple.classList.add("ripple");
    this.appendChild($ripple);

    const removeRipple = () =>{
        $ripple.animate({
            opacity: 0},
            { fill: "forward", duration: 200});
    

    setTimeout(()=> {
        $ripple.remove();
        },1000);

    }
    this.addEventListener("pointerUp", removeRipple);
    this.addEventListener("pointerLeave", removeRipple);

    const /** *{Boolean} */ isNotIconButton = !this.classList.contains("icon-btn");

    if(isNotIconButton)
    {
        const /**{Boolean} */ rippleSize = Math.max(this.clientWidth, this.clientHeight);

        $ripple.style.top = `${e.layerY}px`;
        $ripple.style.left = `${e.layerX}px`;
        $ripple.style.width = `${rippleSize}px`;
        $ripple.style.height = `${rippleSize}px`;
    
        }

   });

}