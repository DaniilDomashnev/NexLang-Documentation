window.addEventListener('DOMContentLoaded', () => {
	// Быстрая инициализация видимых элементов
	updateActiveToc()

	// Показываем контент после небольшой задержки
	setTimeout(() => {
		document.body.classList.add('loaded')

		// Полная инициализация после отображения
		initAll()
	}, 300)
})

function initAll() {
	// Ваш существующий код инициализации
	const tocLinks = document.querySelectorAll('.toc-link')
	const menuToggle = document.getElementById('menuToggle')
	const sidebar = document.getElementById('sidebar')
	const scrollToTopBtn = document.getElementById('scrollToTop')

	tocLinks.forEach(link => {
		link.addEventListener('click', e => {
			e.preventDefault()
			const targetId = link.getAttribute('href').slice(1)
			const target = document.getElementById(targetId)
			if (target) {
				const rect = target.getBoundingClientRect()
				const offset = window.scrollY + rect.top - 76
				window.scrollTo({ top: offset, behavior: 'smooth' })
			}

			if (window.innerWidth <= 860) {
				sidebar.classList.remove('open')
			}
		})
	})

	window.addEventListener('scroll', updateActiveToc)
	window.addEventListener('resize', () => {
		if (window.innerWidth > 860) {
			sidebar.classList.remove('open')
		}
	})

	menuToggle.addEventListener('click', () => {
		sidebar.classList.toggle('open')
	})

	scrollToTopBtn.addEventListener('click', () => {
		window.scrollTo({ top: 0, behavior: 'smooth' })
	})
}

// Плавный скролл по ссылкам TOC
const tocLinks = document.querySelectorAll('.toc-link')
const menuToggle = document.getElementById('menuToggle')
const sidebar = document.getElementById('sidebar')
const scrollToTopBtn = document.getElementById('scrollToTop')

tocLinks.forEach(link => {
	link.addEventListener('click', e => {
		e.preventDefault()
		const targetId = link.getAttribute('href').slice(1)
		const target = document.getElementById(targetId)
		if (target) {
			const rect = target.getBoundingClientRect()
			const offset = window.scrollY + rect.top - 76 // чуть ниже навигации
			window.scrollTo({ top: offset, behavior: 'smooth' })
		}

		// Закрываем сайдбар на мобильных
		if (window.innerWidth <= 860) {
			sidebar.classList.remove('open')
		}
	})
})

// Подсветка активной секции при скролле
const sections = Array.from(document.querySelectorAll('section[id]'))
const sectionById = {}
sections.forEach(sec => (sectionById[sec.id] = sec))

function updateActiveToc() {
	let currentId = 'intro'
	const scrollPos = window.scrollY

	sections.forEach(sec => {
		const top = sec.offsetTop - 100
		if (scrollPos >= top) {
			currentId = sec.id
		}
	})

	tocLinks.forEach(link => {
		const id = link.getAttribute('href').slice(1)
		if (id === currentId) {
			link.classList.add('active')
		} else {
			link.classList.remove('active')
		}
	})
}

window.addEventListener('scroll', updateActiveToc)
window.addEventListener('resize', () => {
	if (window.innerWidth > 860) {
		sidebar.classList.remove('open')
	}
})

// Переключение сайдбара на мобильных
menuToggle.addEventListener('click', () => {
	sidebar.classList.toggle('open')
})

// Кнопка "Наверх"
scrollToTopBtn.addEventListener('click', () => {
	window.scrollTo({ top: 0, behavior: 'smooth' })
})

// Первичная инициализация
updateActiveToc()
