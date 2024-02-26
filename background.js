// Ensure the initial value is set.
chrome.storage.local.get("isEnabled", ({ isEnabled }) => {
  if (isEnabled === undefined) chrome.storage.local.set({ isEnabled: true });
});

chrome.action.onClicked.addListener((tab) => {
  chrome.storage.local.get("isEnabled", ({ isEnabled }) => {
    chrome.storage.local.set({ isEnabled: !isEnabled }, () => {
      updateIcon(!isEnabled, tab.id);
    });
  });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && tab.active) {
    chrome.storage.local.get("isEnabled", ({ isEnabled }) => {
      updateIcon(isEnabled, tab.id);
      if (isEnabled === true) {
        chrome.scripting.executeScript(
          {
            target: { tabId: tabId },
            function: detectTailwindCSS,
          },
          (results) => {
            if (results && results[0].result) {
              // Tailwind CSS is detected, inject the content script to show a notification
              chrome.scripting.executeScript({
                target: { tabId: tabId },
                files: ["content-script.js"],
              });
            }
          }
        );
      }
    });
  }
});

function updateIcon(isEnabled, tabId) {
  if (isEnabled) {
    // The extension is enabled, set the active icon
    chrome.action.setIcon({
      path: {
        16: "icons/icon_16.png",
        48: "icons/icon_48.png",
        128: "icons/icon_128.png",
        256: "icons/icon_256.png",
      },
      tabId: tabId,
    });
  } else {
    // The extension is disabled, set the inactive icon
    chrome.action.setIcon({
      path: {
        16: "icons/icon_inactive_16.png",
        48: "icons/icon_inactive_48.png",
        128: "icons/icon_inactive_128.png",
        256: "icons/icon_inactive_256.png",
      },
      tabId: tabId,
    });
  }
}

/**
 * This function checks if Tailwind CSS is being used on a webpage.
 *
 * Rules:
 * 1. Look for commonly used TW class names.
 * 2. Look for stylesheet names that reference Tailwind
 * 3. Parse all css rules and look for tailwind.
 *
 * @returns {boolean} - Returns true if Tailwind CSS is detected, otherwise false.
 */
function detectTailwindCSS() {
  const areTwClassDefined = () => {
    const stylesheets = [...document.styleSheets];
    const tailwindClasses = [
      ".text-base",
      ".font-normal",
      ".text-lg",
      ".mx-auto",
      ".text-center",
      ".px-0",
      ".justify-between",
      ".items-center",
    ];
    return stylesheets.some((sheet) => {
      const rules = [...sheet.cssRules];
      return rules.some((rule) => tailwindClasses.includes(rule.selectorText));
    });
  };

  const stylesheets = [...document.styleSheets];
  const styleSheetClassesFound = stylesheets.some((sheet) => {
    if (sheet.href && sheet.href.includes("tailwind")) {
      return true;
    }
  });

  if (styleSheetClassesFound) {
    return true;
  }
  if (areTwClassDefined()) {
    return true;
  }
  try {
    const rules = [...sheet.cssRules];
    return rules.some((rule) => rule.cssText.includes("tailwind"));
  } catch (e) {
    return false;
  }
}
