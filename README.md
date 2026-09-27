# Earthquakes, live from USGS

The last thirty days of earthquakes from the USGS feed, refreshed every five
minutes while the page is open: a grid of events, a marker map sized and
coloured by magnitude, a bar chart of magnitude bands, KPI tiles and a strip
showing the strongest event. The map's viewport is a filter: drag it and the
grid, the bands and the KPIs narrow to the events in view.

**[See it running](https://toclocoinc.github.io/lattice-grid-demo-geo-quakes/)**

| | |
| --- | --- |
| Grid on npm | [@toclocoinc/lattice-grid](https://www.npmjs.com/package/@toclocoinc/lattice-grid) |
| Grid repository | [toclocoinc/latticegrid](https://github.com/toclocoinc/latticegrid) |
| Product site | [latticegrid.dev](https://www.latticegrid.dev) |

## What it shows

- **Events** — time, magnitude, depth, place, band and location for every
  event in the feed, keyed by the USGS event id so a refresh updates rows in
  place rather than repainting the grid.
- **Marker map** — each event at its epicentre, sized and coloured by
  magnitude. Drag to pan, double-click or press `0` to reset.
- **Events by magnitude band** — a bar chart of `< M2`, `M2-4`, `M4-6` and
  `M6+` for the events in view.
- **Live** — KPI tiles: events in view, events in the last hour, one per band.
- **Strongest event** — the largest magnitude currently in view.

## Data

The page fetches
[`all_month.geojson`](https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson)
from the USGS Earthquake Hazards Program directly from the browser, on load
and every five minutes after that. It is a US Government work in the public
domain. Nothing is stored in this repository. Country outlines come from
[Natural Earth](https://www.naturalearthdata.com/), public domain, via the
grid's `geo-world-110m` pack.

## Grid features used

`createUrlSource` with a `rowKey` and a refresh interval, `createGrid` with
`timestamp`, `number` and `geometry` column types, `createChart` with the
`markermap` and `bar` types, `viewportFilter` on the map, the
`geo-world-110m` outline pack, and the layout and KPI modules. Modules
loaded: `layout`, `charts`, `kpi`, `geometry`, `chart-markermap`,
`geo-world-110m`.

## Run it locally

Any static file server will do, for example:

```
npx serve .
```

or Python's built-in server:

```
python3 -m http.server
```

Open the page it prints. No licence key is needed on localhost; a key is
only required once the page is published on a real address, which is why
one appears in `index.html` for this demo's own published address.

## Licence

The code in this repository is available under the MIT licence. See
[LICENSE](LICENSE). The data is public domain, as above.

Lattice Grid itself is a separate commercial product with its own terms. It
is free to use on localhost, with no key and no watermark, so a copy of
this repository runs unrestricted on your own machine. This demo carries a
key for its own published address only, which is why you will find one in
the source. Keys for your own sites come from
[latticegrid.dev](https://www.latticegrid.dev).

This demo is built on Lattice Grid 1.73.0.
