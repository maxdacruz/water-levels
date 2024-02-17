<script lang="ts">
  import { GuiChart, GuiChartSelectionEvent, core } from '@greycat/web';
  import { stations } from '../project';
  import { onMount } from 'svelte';

  import type { ChartConfig } from '@greycat/web';

  export let station: stations.GeoJsonStationProperties;

  type AlertLevel = 'warning' | 'danger' | 'none';

  let alertLevel: AlertLevel = 'none';
  $: alertLevel = station.currentLevel
    ? station.currentLevel > station.alert[1]
      ? 'danger'
      : station.currentLevel > station.alert[0]
        ? 'warning'
        : 'none'
    : 'none';
  let chart: GuiChart;

  let dialog: HTMLDivElement;

  async function fetchData(from: core.time | null, to: core.time | null) {
    const data = await stations.getStationDataById(station.id, from, to);
    return data;
  }

  async function hanlseSelection(e: GuiChartSelectionEvent) {
    const from = e.detail.from ? core.time.fromMs(e.detail.from as number) : null;
    const to = e.detail.to ? core.time.fromMs(e.detail.to as number) : null;
    const data = await fetchData(from, to);
    chart.config.table = data;
    chart.compute();
    chart.update();
  }

  async function resetSelection() {
    const data = await fetchData(null, null);
    chart.config.table = data;
    chart.compute();
    chart.update();
  }

  async function mountChart() {
    dialog.classList.toggle('hide');
    const data = await fetchData(null, null);
    const config: ChartConfig = {
      table: data,
      series: [
        {
          type: 'line',
          xCol: 0,
          yCol: 1,
          yAxis: 'left',
          title: 'Water Level (cm)',
          drawAfter(ctx, _serie, xScale, yScale) {
            ctx.ctx.beginPath();
            if (station.alert[0]) {
              ctx.ctx.strokeStyle = 'orange';
              ctx.ctx.moveTo(xScale(xScale.domain()[0]), yScale(station.alert[0]));
              ctx.ctx.lineTo(xScale(xScale.domain()[1]), yScale(station.alert[0]));
              ctx.ctx.stroke();
            }
            if (station.alert[1]) {
              ctx.ctx.strokeStyle = 'red';
              ctx.ctx.moveTo(xScale(xScale.domain()[0]), yScale(station.alert[1]));
              ctx.ctx.lineTo(xScale(xScale.domain()[1]), yScale(station.alert[1]));
              ctx.ctx.stroke();
            }
          },
        },
      ],

      xAxis: { scale: 'time' },
      yAxes: { left: {} },
    };
    chart.config = config;
  }

  $: station && mountChart();

  onMount(() => {
    mountChart();
  });
</script>

<div id="station-info" bind:this={dialog}>
  <h2>{decodeURIComponent(JSON.parse('"' + station.name + '"'))} Station</h2>
  <button
    id="close-dialog"
    on:click={() => {
      dialog.classList.toggle('hide');
    }}>✕</button
  >
  <p class={alertLevel}>Current Level {station.currentLevel}</p>
  <p>River: {station.river}</p>
  <p>
    Alerts: <span style="color: orange;"
      >{station.alert[0] ? `Vigilant: ${station.alert[0]}cm` : ''}</span
    >
    <span style="color: red;"> {station.alert[1] ? `Danger: ${station.alert[1]}cm` : ''} </span>
  </p>
  <section>
    <gui-chart bind:this={chart} on:selection={hanlseSelection} on:reset-selection={resetSelection}
    ></gui-chart>
  </section>
</div>

<style>
  .warning {
    color: orange;
  }
  .danger {
    color: red;
  }
  #station-info {
    position: absolute;
    top: 0;
    right: 0;
    width: 800px;
    height: 100%;
    background-color: var(--bg-0);
    padding: var(--spacing);
    display: flex;
    flex-direction: column;
    z-index: 1000;
  }

  :global(#station-info.hide) {
    display: none;
  }
  #close-dialog {
    position: absolute;
    top: 0;
    right: 0;
    width: 30px;
    height: 30px;
    margin: var(--spacing);
    background-color: transparent;
    border: none;
    cursor: pointer;
    border-radius: 50%;
    transition: background-color 0.2s ease;
    &:hover {
      background-color: var(--bg-2);
    }
    &:active {
      background-color: var(--bg-1);
    }
  }
  section {
    width: 100%;
    flex: 1;
  }
  p {
    margin: 0;
  }

  h2 {
    margin: 0;
  }
</style>
