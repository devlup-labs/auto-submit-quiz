let flink = "https://docs.google.com/forms/"
let start_time=""
let end_time=""
let throughextension=false
let DiffBtwStartAndCurrent=0
let AutoSumitButton=false
let AutoFinalValuesAdded=false
chrome.runtime.onInstalled.addListener(()=>{
    chrome.storage.sync.set({ flink });
    chrome.storage.sync.set({ start_time });
    chrome.storage.sync.set({ throughextension });
    chrome.storage.sync.set({ end_time });
    chrome.storage.sync.set({ DiffBtwStartAndCurrent });
    chrome.storage.sync.set({ AutoSumitButton });
    chrome.storage.sync.set({ AutoFinalValuesAdded });

    console.log("defaul values set");
})

async function onAlarm(alarm) {
  console.log("i will work for sure")
  chrome.tabs.create({ url: link, active: true })

}

var link=""
var AlarmTime;
chrome.storage.onChanged.addListener((changes, area) => {
    if (area === 'sync' && changes.DiffBtwStartAndCurrent?.newValue) {
      
      console.log('enable debug mode?');
      chrome.storage.sync.get("flink", function (items){        
        console.log(items.flink)
         link=items.flink
      });
      
      chrome.storage.sync.get("DiffBtwStartAndCurrent", function (items){        
          console.log("helloo")
          AlarmTime=Date.now()+items.DiffBtwStartAndCurrent
          chrome.alarms.create(
              "Open the form",
              {when:AlarmTime,periodInMinutes:null},
            )
            console.log(AlarmTime)
          chrome.alarms.onAlarm.addListener(onAlarm);

          return;
        });
    
      

      
    }
  });
  var link2=''
  chrome.storage.onChanged.addListener((changes, area) => {
    if (area === 'sync' && changes.AutoFinalValuesAdded?.newValue) {
      
      chrome.storage.sync.set({ "AutoFinalValuesAdded":false });
      console.log('enable debug mode?');
      chrome.storage.sync.get("flink", function (items){        
        console.log(items.flink)
         link2=items.flink
         chrome.tabs.create({ url: link2, active: true })
      });
      console.log(link2)
      console.log("2worked")
    }
  });



    
