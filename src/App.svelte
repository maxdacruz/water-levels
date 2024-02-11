<script lang="ts">
  import { Map, type StyleSpecification } from 'maplibre-gl';
  import { onMount } from 'svelte';
  import mapStyle from './mapstyle.json';
  import 'maplibre-gl/dist/maplibre-gl.css';

  import a from './age_surface_water_body.json';
  import { stations } from './project';
  import StationInfo from './components/StationInfo.svelte';

  let mapElement: HTMLDivElement;

  let selectedStationId: string;

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

    map.on('load', async () => {
      map.addSource('waterways', {
        type: 'geojson',
        data: a as GeoJSON.GeoJSON,
      });

      map.addLayer({
        id: 'waterways',
        type: 'line',
        source: 'waterways',
        paint: {
          'line-color': 'blue',
          'line-width': 1,
        },
      });

      const data = await stations.getStationsGeoJson();
      map.addSource('stations', {
        type: 'geojson',
        data: data as GeoJSON.GeoJSON,
      });
      map.addLayer({
        id: 'stations',
        type: 'circle',
        source: 'stations',
        paint: {
          'circle-radius': 5,
          'circle-color': 'red',
        },
      });
    });

    map.on('click', 'stations', (e) => {
      const coordinates = e.features[0].geometry.coordinates.slice();

      selectedStationId = e.features[0].properties.id;
    });

    map.on('mouseenter', 'stations', () => {
      map.getCanvas().style.cursor = 'pointer';
    });

    map.on('mouseleave', 'stations', () => {
      map.getCanvas().style.cursor = '';
    });
  });
</script>

<main>
  <div id="map" bind:this={mapElement}></div>
  <div id="station-info">
    <StationInfo id={selectedStationId} />
  </div>
</main>

<style>
  #station-info {
    position: absolute;
    top: 0;
    right: 0;
    width: 300px;
    height: 100%;
    background-color: rgb(58, 54, 54);
  }
  main {
    width: 100%;
    height: 100%;
  }
  #map {
    width: 100%;
    height: 100%;
  }
</style>
