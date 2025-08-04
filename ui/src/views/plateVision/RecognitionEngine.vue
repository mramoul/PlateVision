<script setup lang="ts">
import { computed, ref } from 'vue'
import axios from 'axios'
import { motion } from 'motion-v'
import { hoverScaleMotion, botEnterMotion } from '../../animations/motionPresets'
import { useDisplay } from 'vuetify'
import useInjection from '../../helpers/injector'
import { appInjectionKey, type AppInjectionContext } from '../../app.injection'
import { platVisionInjectionKey, type PlateVisionInjectionContext } from './plateVision.injection'

// Setup
const { classificationResult, addChartLinePoint, addChartPiePortion } = useInjection<PlateVisionInjectionContext>(platVisionInjectionKey)
const { isAppLoading } = useInjection<AppInjectionContext>(appInjectionKey)

//Variables
const noneResut = 'Unable to read'
const positiveResut = 'Readable'
const apiUrl = import.meta.env.VITE_API_URL;

const { mdAndDown } = useDisplay()
const fileInputDensity = computed(() => (mdAndDown.value ? 'compact' : 'default'))
const fileInputHeight = computed(() => (mdAndDown.value ? '50px' : '300px'))

const form = ref({
    file: undefined as File | undefined,
})

// Funcs
function updateCharts(classificationResult: any) {
    classificationResult.forEach((element: { confidence: number, text: string }) => {
        if (element.text.trim() === "") {
            addChartLinePoint(noneResut, element.confidence)
            addChartPiePortion(noneResut)
        }
        else {
            addChartLinePoint(element.text, element.confidence)
            addChartPiePortion(positiveResut)
        }
    })
}

//Hooks
const submit = async () => {
    isAppLoading.value = true

    try {
        if (!form.value.file) {
            alert('Please upload a file first.')
            return
        }

        const formData = new FormData()
        formData.append('file', form.value.file)

        console.log(apiUrl)
        const { data } = await axios.post(`${apiUrl}/api/v1/detect-plate`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })

        classificationResult.value = data.detections
        updateCharts(classificationResult.value)

    } catch (error) {
        alert('Prediction failed. Check server or input.')
    } finally {
        isAppLoading.value = false
    }
}
</script>

<template>
    <v-card elevation="0" class="pa-6 rounded-xl">
        <motion.div v-bind="botEnterMotion">
            <v-file-upload :height="fileInputHeight" title="Upload Photo" :density="fileInputDensity" clearable
                v-model="form.file" />
        </motion.div>

        <div class="d-flex justify-center">
            <motion.button v-bind="hoverScaleMotion">
                <v-btn :disabled="isAppLoading" class="mt-5 mt-lg-5" width="200px" height="50px" type="submit"
                    color="primary" :loading="isAppLoading" @click="submit()">
                    Detecte Plate
                </v-btn>
            </motion.button>
        </div>
    </v-card>
</template>

<style scoped></style>