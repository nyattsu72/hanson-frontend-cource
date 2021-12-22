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
