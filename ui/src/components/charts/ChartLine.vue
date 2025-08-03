<script setup lang="ts">
import { computed } from 'vue'
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { LineChart } from 'echarts/charts'
import { GridComponent, TooltipComponent } from 'echarts/components'
import useInjection from '../../helpers/injector'
import { type PlateVisionInjectionContext, platVisionInjectionKey } from '../../views/plateVision/plateVision.injection'

// Setup
use([CanvasRenderer, LineChart, GridComponent, TooltipComponent])

const { chartLabels, chartData } = useInjection<PlateVisionInjectionContext>(platVisionInjectionKey)

// Variables

// Funcs

//Hooks
const chartOptions = computed(() => ({
  color: ['#DAA520'],
  tooltip: {
    trigger: 'axis'
  },
  xAxis: {
    type: 'category',
    name: 'Plate text',
    nameLocation: 'center',
    nameGap: 40,
    data: chartLabels.value
  },
  yAxis: {
    type: 'value',
    name: 'Prediction Confidence',
    nameTextStyle: {
      padding: [0, 0, 20, 120]
    }
  },
  series: [
    {
      name: 'Confidence',
      type: 'line',
      smooth: true,
      data: chartData.value
    }
  ]
}))

</script>

<template>
  <div class="chart-container">
    <VChart :option="chartOptions" autoresize />
  </div>
</template>

<style scoped>
.chart-container {
  width: 100%;
  height: 400px;
}
</style>
