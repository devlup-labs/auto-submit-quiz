
let flink = "https://docs.google.com/forms/"
let start_time=""
let end_time=""
let throughextension=false
let DiffBtwStartAndCurrent=0
chrome.runtime.onInstalled.addListener(()=>{
    chrome.storage.sync.set({ flink });
    chrome.storage.sync.set({ start_time });
    chrome.storage.sync.set({ throughextension });
    chrome.storage.sync.set({ end_time });
    chrome.storage.sync.set({ DiffBtwStartAndCurrent });

    console.log("defaul values set");
})

var link=""
chrome.storage.onChanged.addListener((changes, area) => {
    if (area === 'sync' && changes.DiffBtwStartAndCurrent?.newValue) {
      
      console.log('enable debug mode?');
      chrome.storage.sync.get("flink", function (items){        
        console.log(items.flink)
         link=items.flink
      });
      
      chrome.storage.sync.get("DiffBtwStartAndCurrent", function (items){        
          console.log("helloo")
          chrome.alarms.create(
              "Open the form",
              {when:Date.now()+items.DiffBtwStartAndCurrent},
            )
        });
      chrome.alarms.onAlarm.addListener( function(alarm){
          console.log("i will work for sure")
          chrome.tabs.create({ url: link, active: true })
      })

      
    }
  });




    
