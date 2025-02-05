<template>
	<section class="page-not-found-container">
		<base-card>
			<h2>The page could not be found</h2>
			<p>
				This page could not be found. Click the
				<router-link :to="{ name: 'trips-root' }">trips</router-link> to
				return to the home page.
			</p>
		</base-card>
	</section>
</template>

<style scoped lang="scss">
.page-not-found-container {
	display: inline-block;
	position: relative;
	top: 80px;
}
</style>
