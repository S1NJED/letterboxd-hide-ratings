// ==UserScript==
// @name         Hide letterboxd ratings
// @namespace    http://tampermonkey.net/
// @version      2025-05-24
// @description  try to take over the world!
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
                resolve(div);
                clearInterval(interval);
            }
        })
    }, 300);

    // ratingsDiv.style.display = 'none';
	displayChildren(ratingsDiv, "none");

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