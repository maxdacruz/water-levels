<script lang="ts">
  import {
    Map,
    type StyleSpecification,
    type GeoJSONSource,
  } from "maplibre-gl";
  import { onMount } from "svelte";
  import mapStyle from "./mapstyle.json";
  import "maplibre-gl/dist/maplibre-gl.css";

  import a from "./age_surface_water_body.json";

  let mapElement: HTMLDivElement;

  onMount(() => {
    const map = new Map({
      container: mapElement,
      style: mapStyle as StyleSpecification,
      center: [6.1, 49.6], // starting position [lng, lat]
      zoom: 10, // starting zoom
      // maxBounds: [
      //   [5.7, 49.3], // Southwest coordinates
      //   [6.6, 50.2], // Northeast coordinates
      // ],
    });

    map.on("load", () => {
      map.addSource("test", {
        type: "geojson",
        data: a as GeoJSONSource,
      });

      map.addLayer({
        id: "test",
        type: "line",
        source: "test",
        paint: {
          "line-color": "blue",
          "line-width": 1,
        },
      });
    });
  });
</script>

<main>
  <div id="map" bind:this={mapElement}></div>
</main>

<style>
  main {
    width: 100%;
    height: 100%;
  }
  #map {
    width: 100%;
    height: 100%;
  }
</style>
