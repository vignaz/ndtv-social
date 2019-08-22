chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.todo == "showApp") {
    chrome.webRequest.onSendHeaders.addListener(
      function(e) {
        if (
          e.method == "GET" &&
          e.url.match("social") &&
          e.url.match("taboola.com")
        ) {
          let urlParams = new URLSearchParams(e.url);
          let rData = urlParams.get("d");
          let temp = JSON.parse(rData);
          let obj = temp.data[0];
          if (obj.hdl) {
            let tempArr = [];
            chrome.storage.sync.get(["dataArr"], function(storageObj) {
              console.log(storageObj.dataArr);
              if (storageObj.dataArr) {
                tempArr = storageObj.dataArr;
              }
              tempArr.push(obj);
              chrome.storage.sync.set({ dataArr: tempArr }, function() {});
            });
          }
          var notifOptions = {
            type: "basic",
            iconUrl: "icon.png",
            title: "New Content Available!",
            message: "Get a quick peek at NDTV Social Peek for the latest News."
          };
          chrome.notifications.create("newContentNotif", notifOptions, function(
            id
          ) {
            timer = setTimeout(function() {
              chrome.notifications.clear(id);
            }, 5000);
          });
          //chrome.storage.sync.set({ data: rData }, function() {});
        }
      },
      {
        urls: ["<all_urls>"]
      },
      ["requestHeaders"]
    );
    chrome.storage.sync.clear(function() {});
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.pageAction.show(sender.tab.id);
    });
  }
});
