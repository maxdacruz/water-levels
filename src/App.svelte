<script lang="ts">
  import { Map, type StyleSpecification } from 'maplibre-gl';
  import { onMount } from 'svelte';
  import mapStyle from './mapstyle.json';
  import 'maplibre-gl/dist/maplibre-gl.css';

  import riversGeoJson from './age_surface_water_body.json';
  import { stations } from './project';
  import StationInfo from './components/StationInfo.svelte';

  let mapElement: HTMLDivElement;

  let selectedStation: stations.GeoJsonStationProperties | undefined;

  onMount(() => {
    const map = new Map({
      container: mapElement,
      style: mapStyle as StyleSpecification,
      center: [6.1, 49.6], // starting position [lng, lat]
      zoom: 10, // starting zoom
      maxBounds: [
        [5.7, 49.3], // Southwest coordinates
        [6.6, 50.2], // Northeast coordinates
      ],
    });

    map.on('load', async () => {
      map.addSource('waterways', {
        type: 'geojson',
        data: riversGeoJson as GeoJSON.GeoJSON,
      });

      map.addLayer({
        id: 'waterways',
        type: 'line',
        source: 'waterways',
        paint: {
          'line-color': 'blue',
          'line-width': 2,
        },
      });

      const img = await map.loadImage('/ruler-2.png');
      map.addImage('icon', img.data);

      const data = await stations.getStationsGeoJson();

      map.addSource('stations', {
        type: 'geojson',
        data: data as GeoJSON.GeoJSON,
      });

      console.log(map.getSource('stations'));

      map.addLayer({
        id: 'stations-bg',
        type: 'circle',
        source: 'stations',
        paint: {
          'circle-radius': 12,
          'circle-stroke-color': 'black',
          'circle-stroke-width': 2,
          'circle-color': [
            'match',
            ['get', 'field', ['get', 'alertLevel', ['properties']]],
            'normal',
            'green',
            'warning',
            'orange',
            'danger',
            'red',
            'green',
          ],
        },
      });
      map.addLayer({
        id: 'stations-icon',
        type: 'symbol',
        source: 'stations',
        layout: {
          'icon-image': 'icon',
          'icon-size': 0.3,
          'icon-allow-overlap': true,
        },
      });
    });

    map.on('click', 'stations-bg', (e) => {
      if (!e.features?.[0]) return;
      console.log(e.features[0]);

      const properties = e.features[0].properties as stations.GeoJsonStationProperties;
      selectedStation = stations.GeoJsonStationProperties.create(
        properties.id,
        properties.name,
        JSON.parse(properties.alert as any),
        properties.river,
        properties.currentLevel,
        properties.alertLevel,
      );
    });

    map.on('mouseenter', 'stations-bg', () => {
      map.getCanvas().style.cursor = 'pointer';
    });

    map.on('mouseleave', 'stations-bg', () => {
      map.getCanvas().style.cursor = '';
    });
  });
</script>

<main>
  <div id="map" bind:this={mapElement}></div>
  {#if selectedStation}
    <StationInfo station={selectedStation} />
  {/if}
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
