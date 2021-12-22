'use strict';
const tabs = document.querySelectorAll('[role="tab"]');
const tabList = document.querySelector('[role="tablist"]');

tabs.forEach((tab) => {
	tab.addEventListener('click', changeTabs);
});

function changeTabs(e) {
	const tabs = document.querySelectorAll('[role="tab"]');
	const selectedTab = e.target;
	tabs.forEach((target) => target.setAttribute('aria-selected', false));
	selectedTab.setAttribute('aria-selected', true);

	const tabPanels = document.querySelectorAll('[role="tabpanel"]');
	tabPanels.forEach((tabpanel) => tabpanel.setAttribute('aria-hidden', true));
	const getSelectedTadID = selectedTab.getAttribute('aria-controls');
	const selectedPanel = document.getElementById(getSelectedTadID);
	selectedPanel.setAttribute('aria-hidden', false);
}
let tabFocus = 0;
tabList.addEventListener('keydown', (e) => {
	if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
		tabs[tabFocus].setAttribute('tabindex', -1);
		if (e.key === 'ArrowRight') {
			tabFocus++;
			if (tabFocus >= tabs.length) {
				tabFocus = 0;
			}
		} else if (e.key === 'ArrowLeft') {
			tabFocus--;
			if (tabFocus < 0) {
				tabFocus = tabs.length - 1;
			}
		}

		tabs[tabFocus].setAttribute('tabindex', 0);
		tabs[tabFocus].focus();
	}
});
