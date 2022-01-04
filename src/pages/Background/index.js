
import { v4 as uuidv4 } from 'uuid';

let flink = "https://docs.google.com/forms/"
let start_time=""
let end_time=""
let throughextension=false
let DiffBtwStartAndCurrent=-1
let AutoSumitButton=false
let AutoFinalValuesAdded=false
let AlarmNameToBeDisplayed=''
chrome.runtime.onInstalled.addListener(()=>{
    chrome.storage.sync.set({ flink });
    chrome.storage.sync.set({ start_time });
    chrome.storage.sync.set({ throughextension });
    chrome.storage.sync.set({ end_time });
    chrome.storage.sync.set({ DiffBtwStartAndCurrent });
    chrome.storage.sync.set({ AutoSumitButton });
    chrome.storage.sync.set({ AutoFinalValuesAdded });
    chrome.storage.sync.set({ AlarmNameToBeDisplayed});

    console.log("defaul values set");
})

function CreateUniqueAlarmId()
{
  return  uuidv4();

}


async function onAlarm(alarm) {
  chrome.storage.sync.set({ throughextension: true });
  console.log("i will work for sure")
  chrome.tabs.create({ url: link, active: true })

}

var link=""
var Alarmname=''
var AlarmTime;
chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'sync' && changes.DiffBtwStartAndCurrent?.newValue) {
    chrome.storage.sync.get("DiffBtwStartAndCurrent", function (items){
      if(items.DiffBtwStartAndCurrent>=0)
      {
        chrome.storage.sync.set({"DiffBtwStartAndCurrent":-1});
        console.log('enable debug mode?');
        chrome.storage.sync.get("flink", function (items){        
           link=items.flink
        });
        AlarmTime=Date.now()+items.DiffBtwStartAndCurrent

       //var AlramName=CreateUniqueAlarmId();
      chrome.storage.sync.get("AlarmNameToBeDisplayed", function (items){
        Alarmname=items.AlarmNameToBeDisplayed
        console.log(Alarmname)
        chrome.alarms.create(
          Alarmname,
            {when:AlarmTime,periodInMinutes:null},
          )
          console.log(AlarmTime)
        chrome.alarms.onAlarm.addListener(onAlarm);
      });

        return;
    
      }
    });
    
  }
});



// chrome.storage.onChanged.addListener((changes, area) => {
//     if (area === 'sync' && changes.DiffBtwStartAndCurrent?.newValue) {
      
//       console.log('enable debug mode?');
//       chrome.storage.sync.get("flink", function (items){        
//          link=items.flink
//       });
      
//       chrome.storage.sync.get("DiffBtwStartAndCurrent", function (items){        
//           AlarmTime=Date.now()+items.DiffBtwStartAndCurrent
//           var AlramName=CreateUniqueAlarmId();
//           console.log(AlramName)
//           chrome.alarms.create(
//               AlramName,
//               {when:AlarmTime,periodInMinutes:null},
//             )
//             console.log(AlarmTime)
//           chrome.alarms.onAlarm.addListener(onAlarm);

//           return;
//         });
//     }
//   });



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


