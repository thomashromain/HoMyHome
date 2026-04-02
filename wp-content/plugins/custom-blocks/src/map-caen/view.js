/**
 * Use this file for JavaScript code that you want to run in the front-end 
 * on posts/pages that contain this block.
 *
 * When this file is defined as the value of the `viewScript` property
 * in `block.json` it will be enqueued on the front end of the site.
 *
 * Example:
 *
 * ```js
 * {
 *   "viewScript": "file:./view.js"
 * }
 * ```
 *
 * If you're not making any changes to this file because your project doesn't need any 
 * JavaScript running in the front-end, then you should delete this file and remove 
 * the `viewScript` property from `block.json`. 
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-metadata/#view-script
 */
 
import L from 'leaflet';

window.addEventListener('DOMContentLoaded', () => {
    const el = document.querySelector('.caen-map-container');
    if (!el) return;

    const markersData = JSON.parse(el.dataset.markers || '[]');

    // Setup Map restricted to Caen
    const map = L.map(el, {
        maxBounds: [[49.147, -0.428], [49.215, -0.315]],
        maxBoundsViscosity: 1.0,
        minZoom: 12
    }).setView([49.1828, -0.3707], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

    markersData.forEach(m => {
        const popupContent = `
            <div>
                <h3>${m.title}</h3>
                <p>${m.desc}</p>
                <a href="${window.location.origin}/${m.slug}" class="button">Visit Page</a>
            </div>
        `;

        L.marker([m.lat, m.lng])
            .addTo(map)
            .bindPopup(popupContent);
    });
});