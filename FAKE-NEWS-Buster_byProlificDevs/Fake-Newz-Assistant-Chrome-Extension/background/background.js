chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "checkFakeNews",
    title: "Check Fake News",
    contexts: ["selection"],
  });
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === "checkFakeNews") {
    const text = info.selectionText;

    const response = await fetch(
      "https://anup069-fake-news-detection-api.hf.space/verify/",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      }
    );

    const data = await response.json();

    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: showFakeNewsResult,
      args: [data.label, data.confidence],
    });
  }
});

function showFakeNewsResult(label, confidence) {
  alert(`Fake News Check: ${label} (Confidence: ${confidence.toFixed(2)})`);
}
