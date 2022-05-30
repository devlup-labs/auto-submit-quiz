function createTab(link, endtime) {
  return new Promise((resolve) => {
    chrome.tabs.create({ url: link }, async (tab) => {
      chrome.tabs.onUpdated.addListener(function listener(tabId, info) {
        chrome.tabs.onUpdated.removeListener(listener);
        resolve(tab);
      });
    });
  });
}

function sendMessage(type, key) {
  let message = {};
  message['type'] = type;
  message['key'] = key;
  chrome.runtime.sendMessage(message);
}

export { createTab, sendMessage };
