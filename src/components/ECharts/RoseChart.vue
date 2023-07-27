<template>
  <v-chart class="chart" :option="option" autoresize />
</template>

<script setup>
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { PieChart } from 'echarts/charts'
import { TooltipComponent, LegendComponent } from 'echarts/components'
import { LabelLayout } from 'echarts/features'
import VChart, { THEME_KEY } from 'vue-echarts'
import { ref, provide } from 'vue'

use([LegendComponent, PieChart, CanvasRenderer, LabelLayout])

provide(THEME_KEY, 'dark')

const option = ref({
  backgroundColor: '',
  legend: {
    orient: 'vertical',
    left: 'right',
    type: 'scroll',
  },
  tooltip: {
    trigger: 'item',
  },
  series: [
    {
      type: 'pie',
      radius: ['20%', '100%'],
      center: ['30%', '60%'],
      roseType: 'radius',
      itemStyle: {
        borderRadius: 3,
      },
      label: {
        show: false,
      },
      emphasis: {},
      data: [
        { name: '余杭区', value: 7 },
        { name: '西湖区', value: 6 },
        { name: '萧山区', value: 5 },
        { name: '上城区', value: 4 },
        { name: '建德市', value: 4 },
        { name: '临安区', value: 4 },
        { name: '富阳区', value: 4 },
        { name: '淳安县', value: 3 },
      ],
    },
  ],
})
</script>

<style scoped>
.chart {
  height: 180px;
  width: 280px;
}
</style>
