<script lang="ts">
  import { GuiChart } from '@greycat/web';
  import { stations } from '../project';
  import { onMount } from 'svelte';

  import type { ChartConfig } from '@greycat/web';

  export let id: string | undefined;
  let chart: GuiChart;

  async function fetchData() {
    const data = await stations.getStationDataById(Number(id));
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
        },
      ],
      xAxis: {},
      yAxes: { left: {} },
    };
    chart.config = config;
  }

  $: id && mountChart();

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
    height: 500px;
  }
</style>
