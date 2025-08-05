<script setup lang="ts">
import { computed } from 'vue'
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { PieChart } from 'echarts/charts'
import { TooltipComponent, LegendComponent } from 'echarts/components'
import useInjection from '../../helpers/injector'
import { type PlateVisionInjectionContext, plateVisionInjectionKey } from '../../views/plateVision/plateVision.injection'

// Setup
use([CanvasRenderer, PieChart, TooltipComponent, LegendComponent])

const { chartPieLabels, chartPieData } = useInjection<PlateVisionInjectionContext>(plateVisionInjectionKey)

// Variables

// Funcs

// Hooks
const samples = computed(() => {
  return (chartPieData.value[0] || 0) + (chartPieData.value[1] || 0)
})

const chartOptions = computed(() => ({
  tooltip: {
    trigger: 'item',
    formatter: '{b}: {d}%'
  },
  legend: {
    orient: 'vertical',
    left: 'left',
    textStyle: {
      color: '#F8F8FF'
    },
  },
  color: ['#DAA520', '#F8F8FF'],
  series: [
    {
      type: 'pie',
      radius: '80%',
      data: chartPieLabels.value.map((label, i) => ({
        name: label,
        value: chartPieData.value[i]
      })),
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      },
      label: {
        formatter: '{d}%',
        fontSize: 14,
        color: '#F8F8FF',
      }
    }
  ]
}))

</script>

<template>
  <div class="pie-container">
    <VChart :option="chartOptions" autoresize />
    <p class="mt-n5">
      Sample(s): {{ samples }}
    </p>
  </div>
</template>

<style scoped>
.pie-container {
  width: 100%;
  height: calc(40vh - 20px);
}
</style>