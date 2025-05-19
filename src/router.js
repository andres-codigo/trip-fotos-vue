import { createRouter, createWebHistory } from 'vue-router'

import { PATHS } from '@/constants/paths.js'

import store from '@/store/index.js'

const TripsList = () => import('@/pages/trips/TripsList.vue')

const TravellerDetail = () => import('@/pages/trips/TravellerDetail.vue')

const TravellerRegistration = () =>
	import('@/pages/trips/TravellerRegistration.vue')

const ContactTraveller = () => import('@/pages/messages/ContactTraveller.vue')

const MessagesReceived = () => import('@/pages/messages/MessagesReceived.vue')

const UserAuth = () => import('@/pages/auth/UserAuth.vue')

const PageNotFound = () => import('@/pages/PageNotFound.vue')

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: PATHS.HOME,
			redirect: PATHS.TRIPS,
			name: 'trips-root',
			meta: { requiresAuth: true },
		},
		{
			path: PATHS.TRIPS,
			name: 'trips-list',
			component: TripsList,
			meta: { requiresAuth: true },
		},
		{
			path: PATHS.TRIPS + '/:id',
			name: 'traveller-detail',
			component: TravellerDetail,
			props: true,
			meta: { requiresAuth: true },
			children: [
				{
					path: PATHS.CHILDREN_ROUTE_CONTACT,
					name: 'contact-traveller',
					component: ContactTraveller,
					meta: { requiresAuth: true },
				}, // /trips/c1/contact
			],
		},
		{
			path: PATHS.REGISTER,
			name: 'register',
			component: TravellerRegistration,
			meta: { requiresAuth: true },
		},
		{
			path: PATHS.MESSAGES,
			name: 'messages',
			component: MessagesReceived,
			meta: { requiresAuth: true },
		},
		{
			path: PATHS.AUTHENTICATION,
			name: 'auth',
			component: UserAuth,
			meta: { requiresUnauth: true },
		},
		{
			path: '/:notFound(.*)',
			name: 'page-not-found',
			component: PageNotFound,
		}, // catch all/invalid url
	],
})

// Global Navigation Guard
router.beforeEach(function (to, _, next) {
	if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
		next(PATHS.AUTHENTICATION)
	} else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
		next(PATHS.TRIPS)
	} else {
		next()
	}
})

export default router
