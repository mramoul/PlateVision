<script setup lang="ts">
import { onMounted, provide, ref } from 'vue'
import { slideLeftMotion, slideRightMotion, expandMotion, botEnterMotion } from '../../animations/motionPresets'
import ChartLine from '../../components/charts/ChartLine.vue'
import ChartPie from '../../components/charts/ChartPie.vue'
import { motion, AnimatePresence } from 'motion-v'
import { platVisionInjectionKey, usePlateVisionProvider } from './plateVision.injection'
import RecognitionEngine from './RecognitionEngine.vue'
import RecognitionResult from './RecognitionResult.vue'
import { typingAnimation } from '../../animations/textPresets'
import AboutSection from './AboutSection.vue'

// Setup
const chartContext = usePlateVisionProvider()
provide(platVisionInjectionKey, chartContext)

// Variables
const isTryOutTrigged = ref(false)
const currentTab = ref(0)

const containerRef = ref<HTMLDivElement | null>(null)

// Funcs
const toggleTryOut = () => (isTryOutTrigged.value = !isTryOutTrigged.value)

// Hooks
onMounted(async () => {
  await typingAnimation(containerRef, 'p')
})

</script>

<template>
  <v-row>

    <!-- Intro -->
    <v-col lg="5" md="12" cols="12">
      <motion.div v-bind="slideLeftMotion">
        <v-card class="rounded-xl">
          <v-card-title>
            <h1>PlateVision</h1>
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col>
                <div ref="containerRef">
                  <p>
                    AI-powered vehicle plate detection and recognition platform. This application uses YOLO object
                    detection
                    to identify license plates in images, automatically crops the detected regions, and applies OCR
                    (Optical
                    Character Recognition) to extract readable text. Built with a FastAPI backend and Vue 3 frontend, it
                    provides real-time visual feedback with animated UI components, confidence scores, and clean image
                    output for each detection.
                  </p>
                </div>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <div class="d-flex justify-center">
                  <v-btn width="200px" height="50px" color="primary" @click="toggleTryOut">
                    <v-icon class="mr-5" size="40">mdi-card-bulleted-outline</v-icon>
                    Try out
                  </v-btn>
                </div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>

        <!-- Tabs Panel -->
        <div class="mt-2">
          <AnimatePresence :initial="false">
            <motion.div v-if="isTryOutTrigged" v-bind="expandMotion">
              <v-tabs v-model="currentTab" align-tabs="center">
                <v-tab :value="0">Recognition</v-tab>
                <v-tab :value="1">About</v-tab>
              </v-tabs>
              <v-tabs-window v-model="currentTab">
                <v-tabs-window-item :value="0">
                  <recognition-engine />
                </v-tabs-window-item>
                <v-tabs-window-item :value="1">
                  <about-section />
                </v-tabs-window-item>
              </v-tabs-window>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </v-col>

    <!-- Result Panel -->
    <v-col lg="3" md="12" cols="12">
      <motion.div v-bind="botEnterMotion">
        <recognition-result />
      </motion.div>
    </v-col>

    <!-- Chart Panel -->
    <v-col lg="4" md="12" cols="12">
      <motion.div v-bind="slideRightMotion">
        <chart-line />
      </motion.div>
      <motion.div v-bind="slideRightMotion">
        <chart-pie class="mt-4 mt-md-10 mt-lg-16" />
      </motion.div>
    </v-col>

  </v-row>
</template>

<style scoped></style>