
import { extendLibConfig } from '@altipla/vite-config'


export default extendLibConfig({
  build: {
    rollupOptions: {
      external: [
        'vue',
        '@fortawesome/fontawesome-svg-core',
        '@altipla-consulting/ui-v1',
      ],
    },
  },
})
