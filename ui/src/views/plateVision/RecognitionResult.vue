<script setup lang="ts">
import { watch, ref, nextTick } from 'vue'
import { platVisionInjectionKey, type PlateVisionInjectionContext } from './plateVision.injection'
import useInjection from '../../helpers/injector'
import { typingAnimation } from '../../animations/textPresets'
import { type AppInjectionContext, appInjectionKey } from '../../app.injection'

// Setup
const { classificationResult } = useInjection<PlateVisionInjectionContext>(platVisionInjectionKey)
const { isAppLoading } = useInjection<AppInjectionContext>(appInjectionKey)

// Variables
const containerRef = ref<HTMLDivElement | null>(null)

const resultHistory = ref<any[]>([])

// Funcs

// Hooks
watch(() => classificationResult.value, async (newVal) => {
    await nextTick()
    if (!newVal || !containerRef.value) return


    if (resultHistory.value.length === 0)
        resultHistory.value = classificationResult.value
    else
        resultHistory.value = resultHistory.value.concat(classificationResult.value).reverse()

    await typingAnimation(containerRef, 'h2', 'keyframes')
})
</script>

<template>
    <div class="container" ref="containerRef">
        <div v-if="classificationResult !== null">
            <div class="mb-5 imgContainer" v-for="(img, index) in resultHistory" :key="index">
                <v-img :src="`data:image/jpeg;base64,${img.image}`" />
                <h2 v-if="img.text">{{ img.text ? img.text : "Unable to read" }}</h2>
                <v-alert height="50px" v-else type="warning">
                    <h2 class="mt-n2">{{ "Unable to read" }}</h2>
                </v-alert>
            </div>
        </div>
    </div>
    <v-progress-linear color="primary" :indeterminate="isAppLoading" />
</template>

<style scoped>
.container {
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100%;
    /* Default */
    height: 50vh;
    text-align: center;
    border: 2px dotted #DAA520;
    padding: 1rem;
    scrollbar-width: thin;
    overflow-y: auto;
    overflow-x: hidden;
}

.imgContainer {
    height: auto;
    width: auto;
    border: 2px solid white;
}

/* Large devices (desktops, ≥1024px) */
@media (min-width: 1024px) {
    .container {
        height: 90vh;
    }
}
</style>