import { inject } from '@vercel/analytics'

import { createApp, defineAsyncComponent } from 'vue'
import { VueFire } from 'vuefire'

import App from '@/App.vue'

import { firebaseApp } from '@/firebase.js'

import router from '@/router.js'
import store from '@/store/index.js'

import loadImage from '@/assets/loading-spinner.svg'

import VueLazyload from 'vue-lazyload'

import ClickOutside from '@/directives/click-outside-directive.js'

import BaseCard from '@/components/ui/BaseCard.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseBadge from '@/components/ui/BaseBadge.vue'
import BaseImage from '@/components/ui/BaseImage.vue'
import BaseSpinner from '@/components/ui/BaseSpinner.vue'

const BaseDialog = defineAsyncComponent(
	() => import('@/components/ui/BaseDialog.vue'),
)

window.$store = store

import '@/styles/base.scss'

const app = createApp(App)

app.use(VueFire, {
	firebaseApp,
})
app.use(router)
app.use(store)

app.use(VueLazyload, {
	preLoad: 1.3,
	loading: loadImage,
	attempt: 3,
})

app.directive('click-outside', ClickOutside)

app.component('BaseCard', BaseCard)
app.component('BaseButton', BaseButton)
app.component('BaseBadge', BaseBadge)
app.component('BaseImage', BaseImage)
app.component('BaseSpinner', BaseSpinner)
app.component('BaseDialog', BaseDialog)

app.mount('#app')

inject()
