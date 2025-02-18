// Menu handler
class ContextMenuManager {
  constructor(menus) {
    this.menus = menus; // Store menu configuration
  }

  // Initialize context menus
  initializeMenus() {
    Object.keys(this.menus).forEach((parentKey) => {
      const parentMenu = this.menus[parentKey];

      // Create the top-level context menu item
      chrome.contextMenus.create({
        id: parentMenu.key,
        title: parentMenu.title,
        contexts: ["all"],
      });

      // Create nested menu items (if any)
      if (parentMenu.subMenus) {
        parentMenu.subMenus.forEach((subMenu) => {
          chrome.contextMenus.create({
            id: subMenu.key,
            title: subMenu.title,
            parentId: parentMenu.key,
            contexts: ["all"],
          });
        });
      }
    });
  }

  handleMenuClick(info) {
    const handleSubMenus = (menuItem, menu) => {
      // Check if the clicked item matches the current menu
      if (menuItem === menu.key) {
        this.sendMessageToActiveTab({ ...menu });
        return true; // Return true to stop further recursion if the item is found
      }

      // If the menu has submenus, iterate through them recursively
      if (menu.subMenus) {
        for (const subMenu of menu.subMenus) {
          if (handleSubMenus(menuItem, subMenu)) {
            return true; // Return true once the action is taken for any submenu
          }
        }
      }

      return false; // Return false if the item is not found in this level
    };

    Object.keys(this.menus).forEach((parentKey) => {
      const parentMenu = this.menus[parentKey];

      // Start the recursive search from the main menu or submenus
      handleSubMenus(info.menuItemId, parentMenu);
    });
  }

  // Send message to active tab
  sendMessageToActiveTab(message) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      if (tabs.length > 0) {
        chrome.tabs.sendMessage(tabs[0].id, message, function (response) {
          if (chrome.runtime.lastError) {
            // console.error("Error sending message:", chrome.runtime.lastError.message);
          } else {
            // console.log("Message sent to content script:", response);
          }
        });
      } else {
        // console.error("No active tab found.");
      }
    });
  }
}
