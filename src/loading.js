// === PAGE LOADING HANDLER ===

;(function () {
	const loader = document.getElementById('app-loading')

	if (!loader) return

	// Блокируем скролл
	document.documentElement.style.overflow = 'hidden'

	function hideLoader() {
		loader.classList.add('hidden')

		setTimeout(() => {
			loader.remove()
			document.documentElement.style.overflow = ''
		}, 700)
	}

	// После полной загрузки
	window.addEventListener('load', () => {
		// небольшая задержка для "премиум" ощущения
		setTimeout(hideLoader, 500)
	})
})()
