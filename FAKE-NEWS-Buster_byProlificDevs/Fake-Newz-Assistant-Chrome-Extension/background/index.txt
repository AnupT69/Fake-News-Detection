// This import only work for service worker and web work. If script have dom dependency it will not work
importScripts("menus.js");
importScripts("contextMenuManager.js");

// Instantiate and initialize context menus
const menuManager = new ContextMenuManager(MENUS);

// When chrome extension installed
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ MENUS: MENUS }, function () {
    console.log("Menu saved to storage");
  });

  // Initialize menus when the extension is installed or updated
  menuManager.initializeMenus();
});

// Listen for clicks on the context menu item
chrome.contextMenus.onClicked.addListener((info, tab) => {
  menuManager.handleMenuClick(info);
});
