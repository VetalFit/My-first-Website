const tabs = (headerSelector, tabsSelector, contentSelector, activeClass) => {

	const tabs = document.querySelectorAll(tabsSelector),
		content = document.querySelectorAll(contentSelector),
		header = document.querySelector(headerSelector);

	function hideTabContent() {
		content.forEach(item => {
			item.style.display = 'none';
		});

		tabs.forEach(tab => {
			tab.classList.remove(activeClass);
		});
	}

	function showTabContent(i = 0) {
		content[i].style.display = 'block';
		tabs[i].classList.add(activeClass);
	}

	hideTabContent();
	showTabContent();

	header.addEventListener('click', (e) => {
		const target = e.target;

		if (target && target.classList.contains(tabsSelector.slice(1)) ||
			(target.parentNode.classList.contains(tabsSelector.slice(1)))) {
			tabs.forEach((item, i) => {
				if (target == item || target.parentNode == item) {
					hideTabContent();
					showTabContent(i);
				}
			});
		}
	});
};

export default tabs;