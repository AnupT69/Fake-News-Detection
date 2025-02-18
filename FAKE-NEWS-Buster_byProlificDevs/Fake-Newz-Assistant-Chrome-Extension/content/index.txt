// Listener that listen message from content.js
chrome.runtime.onMessage.addListener(function (message) {
  chrome.storage.local.get(["MENUS", "DATA"], (result) => {
    const promptHandler = new PromptHandler(result, message);
    promptHandler.handle();
  });
});
