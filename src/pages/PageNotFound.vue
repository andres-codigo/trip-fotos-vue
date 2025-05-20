<template>
	<section class="page-section page-not-found-container">
		<base-card>
			<h2>This page isn&apos;t available. Sorry about that.</h2>
			<p>
				Best return to the
				<router-link :to="{ name: 'trips-root' }">
					Trip Fotos
				</router-link>
				home page to get back on track.
			</p>
		</base-card>
	</section>
</template>

<style scoped lang="scss">
.page-not-found-container {
	text-align: center;
}
</style>
