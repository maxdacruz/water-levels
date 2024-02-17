<script lang="ts">
  import { GuiChart } from '@greycat/web';
  import { stations } from '../project';
  import { onMount } from 'svelte';

  import type { ChartConfig } from '@greycat/web';

  export let station: stations.GeoJsonStationProperties;

  let chart: GuiChart;

  async function fetchData() {
    const data = await stations.getStationDataById(Number(station.id));
    return data;
  }

  async function mountChart() {
    const data = await fetchData();
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

<article>
  <h1>{decodeURIComponent(JSON.parse('"' + station.name + '"'))} Station</h1>
  <gui-chart bind:this={chart}></gui-chart>
</article>

<style>
  article {
    width: 100%;
    height: 500px;
    padding: var(--spacing);
  }
</style>
