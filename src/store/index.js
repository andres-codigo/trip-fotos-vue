import { createStore } from 'vuex'

import travellersModule from '@/store/modules/travellers/index.js'
import messagesModule from '@/store/modules/messages/index.js'
import authModule from '@/store/modules/auth/index.js'

const store = createStore({
	modules: {
		travellers: travellersModule,
		messages: messagesModule,
		auth: authModule,
	},
})

export default store
