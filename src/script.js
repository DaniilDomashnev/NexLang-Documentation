// ================================
// NexLang Docs – Enhanced JS
// ================================

document.addEventListener('DOMContentLoaded', () => {
	initHeaderShadow()
	initTOC()
	initScrollToTop()
	initMobileSidebar()

	// Первоначальное состояние подсветки
	updateActiveSection()
})

// ------------------------------
// 1. Header shadow on scroll
// ------------------------------
function initHeaderShadow() {
	const header = document.querySelector('.top-nav')

	const applyShadow = () => {
		if (window.scrollY > 10) {
			header.classList.add('nav-shadow')
		} else {
			header.classList.remove('nav-shadow')
		}
	}

	applyShadow()
	window.addEventListener('scroll', applyShadow)
}

// ------------------------------
// 2. TOC (sidebar) – scroll spy + smooth scroll
// ------------------------------
function initTOC() {
	const tocLinks = document.querySelectorAll('.toc-link')
	const sections = [...document.querySelectorAll('section[id]')]

	tocLinks.forEach(link => {
		link.addEventListener('click', e => {
			e.preventDefault()
			const targetID = link.getAttribute('href').slice(1)
			const target = document.getElementById(targetID)

			if (target) {
				const offset = target.offsetTop - 80 // Под фиксированный header
				window.scrollTo({ top: offset, behavior: 'smooth' })
			}

			// Закрыть меню на мобиле
			if (window.innerWidth <= 860) {
				document.getElementById('sidebar').classList.remove('open')
			}
		})
	})

	// Smart scroll spy
	window.addEventListener('scroll', () =>
		updateActiveSection(sections, tocLinks)
	)
}

function updateActiveSection(sections, tocLinks) {
	if (!sections || !tocLinks) {
		sections = [...document.querySelectorAll('section[id]')]
		tocLinks = document.querySelectorAll('.toc-link')
	}

	const scrollPos = window.scrollY + 100
	let current = sections[0].id

	sections.forEach(sec => {
		if (sec.offsetTop <= scrollPos) {
			current = sec.id
		}
	})

	tocLinks.forEach(link => {
		link.classList.toggle(
			'active',
			link.getAttribute('href').slice(1) === current
		)
	})
}

// ------------------------------
// 3. Scroll To Top
// ------------------------------
function initScrollToTop() {
	const btn = document.getElementById('scrollToTop')

	btn.addEventListener('click', () => {
		window.scrollTo({ top: 0, behavior: 'smooth' })
	})
}

// ------------------------------
// 4. Mobile Sidebar Toggle
// ------------------------------
function initMobileSidebar() {
	const toggle = document.getElementById('menuToggle')
	const sidebar = document.getElementById('sidebar')

	toggle.addEventListener('click', () => {
		sidebar.classList.toggle('open')
	})

	window.addEventListener('resize', () => {
		if (window.innerWidth > 860) {
			sidebar.classList.remove('open')
		}
	})
}
