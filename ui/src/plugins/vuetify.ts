import 'vuetify/_styles.scss'
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css' // MDI icons
import { VFileUpload } from 'vuetify/labs/VFileUpload'

export default createVuetify({
  components: {
    ...components,
    VFileUpload,
  },
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: { mdi },
  },
  theme: {
    defaultTheme: 'oilTheme',
    themes: {
      oilTheme: {
        dark: true,
        colors: {
          background: '#121212',
          surface: '#1E1E1E',
          primary: '#DAA520',
          secondary: '#8B4513',
          text: '#F5F5F5',
        },
      },
    },
  },
})
