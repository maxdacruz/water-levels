<script lang="ts">
  import { GuiChart } from '@greycat/web';
  import { stations } from '../project';
  import { onMount } from 'svelte';

  import type { BoxPlotCanvas, BoxPlotOptions, ChartConfig, core, util } from '@greycat/web';

  export let station: stations.GeoJsonStationProperties;

  let chart: GuiChart;

  async function fetchData() {
    const data = (await stations.getStationProfileById(station.id)) as core.Table;
    return data;
  }

  async function mountChart() {
    const data = await fetchData();
    const config: ChartConfig = {
      table: data,
      series: [
        {
          type: 'custom',
          yAxis: 'left',
          yCol: 1,
          xCol: 0,
          draw(ctx, serie, xScale, yScale) {
            for (let index = 0; index < data.cols[0].length; index++) {
              const b = data.cols[1][index] as util.BoxPlotFloat;
              if (!b) {
                continue;
              }
              console.log(b);

              const a: BoxPlotCanvas = {
                crossValue: xScale(data.cols[0][index].epochMs),
                max: yScale(b.max),
                min: yScale(b.min),
                median: yScale(b.percentile50),
                q1: yScale(b.percentile25),
                q3: yScale(b.percentile75),
              };
              const opts: BoxPlotOptions = {
                iqrColor: 'red',
                medianColor: 'red',
                whiskerColor: 'red',
                orientation: 'vertical',
                width: 10,
              };
              ctx.boxPlot(a, opts);
            }
          },
        },
      ],

      xAxis: { scale: 'time' },
      yAxes: { left: { min: 0, max: 500 } },
    };
    chart.config = config;
  }

  $: station && mountChart();

  onMount(() => {
    mountChart();
  });
</script>

<div>
  <gui-chart bind:this={chart}></gui-chart>
</div>

<style>
  div {
    width: 100%;
    height: 100%;
  }
</style>
