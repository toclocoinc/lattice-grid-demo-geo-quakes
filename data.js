/**
 * Earthquakes, live: one USGS GeoJSON feed, refetched every 5 minutes, kept
 * in memory. One feature = one row; `rowKey` is the USGS event id, so a
 * later fetch upserts in place through the grid's own keyed diff rather than
 * flashing the whole table.
 */

const FEED = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson';
const POLL_MS = 5 * 60 * 1000;

/** @param {number|null} mag the magnitude @returns {string} its band label */
function magBand(mag) {
    if (mag === null || mag === undefined || Number.isNaN(mag)) return 'Unknown';
    if (mag < 1) return '< M1';
    if (mag < 2) return 'M1-2';
    if (mag < 3) return 'M2-3';
    if (mag < 4) return 'M3-4';
    if (mag < 5) return 'M4-5';
    return 'M5+';
}

/** @returns {object} the URL source over the USGS feed */
function quakeSource() {
    return LatticeGrid.createUrlSource(FEED, {
        rowsPath: 'features',
        map: (features) => features.map((f) => ({
            id: f.id,
            mag: f.properties.mag,
            band: magBand(f.properties.mag),
            place: f.properties.place,
            time: f.properties.time,
            depth: Array.isArray(f.geometry && f.geometry.coordinates) ? f.geometry.coordinates[2] : null,
            geometry: f.geometry,
        })),
        poll: POLL_MS,
    });
}
