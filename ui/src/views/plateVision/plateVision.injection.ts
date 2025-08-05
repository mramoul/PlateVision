import { type InjectionKey, type Ref, ref } from 'vue'

export interface PlateVisionInjectionContext {
    chartLabels: Ref<string[], string[]>
    chartData: Ref<number[], number[]>
    chartPieLabels: Ref<string[], string[]>
    chartPieData: Ref<number[], number[]>
    classificationResult: any

    addChartLinePoint: (label: string, value: number) => void
    addChartPiePortion: (label: string) => void
}

export const plateVisionInjectionKey: InjectionKey<PlateVisionInjectionContext> = Symbol('PlateVisionInjectionContext')

export function usePlateVisionProvider(): PlateVisionInjectionContext {
    const chartLabels = ref<string[]>([])
    const chartPieLabels = ref<string[]>([])

    const chartData = ref<number[]>([])
    const chartPieData = ref<number[]>([])

    const classificationResult = ref<any | null>(null)

    const addChartLinePoint = (label: string, value: number) => {
        chartLabels.value.push(label)
        chartData.value.push(value)
    }

    const addChartPiePortion = (label: string) => {
        const index = chartPieLabels.value.indexOf(label)
        if (index !== -1) {
            chartPieData.value[index]++
        } else {
            chartPieLabels.value.push(label)
            chartPieData.value.push(1)
        }
    }

    return {
        chartLabels,
        chartData,
        chartPieLabels,
        chartPieData,
        classificationResult,
        addChartLinePoint,
        addChartPiePortion
    }
}
