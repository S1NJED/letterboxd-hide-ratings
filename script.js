// ==UserScript==
// @name         Hide letterboxd ratings
// @namespace    http://tampermonkey.net/
// @version      2025-05-24
// @description  Hide the ratings from a movie in letterboxdEveryone always knew that Max had a wild imagination, but no one believed that his wildest creations – a boy raised by watchful great white sharks and a girl with the force of a volcano – were real. Now, these two pint-sized action masters will show Max that even an ordinary
// @author       S1NJED
// @match        https://letterboxd.com/film/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=letterboxd.com
// @grant        none
// ==/UserScript==

function displayChildren(parent, value)
{
    Array.from(parent.children).map((children) => {
        children.style.display = value;
    })
}

(async function() {
    'use strict';

    const ratingsDiv = await new Promise((resolve) => {
        const interval = setInterval( () => {
            const div = document.querySelector("section.ratings-histogram-chart");
            if (div)
            {
                displayChildren(div, "none");
                resolve(div);
                clearInterval(interval);
            }
        })
    }, 150);

    const p = document.createElement("p");
    p.textContent = "Click to reveal ratings";
    p.style.cursor = "pointer";
    p.style.textAlign = "center";

	p.addEventListener("click", (ev) => {
		p.style.display = "none";
		p.textContent = "";
		displayChildren(ratingsDiv, "block");
	})

	ratingsDiv.appendChild(p);
})();