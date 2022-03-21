# Auto-Submit-Quiz

The extension enables you to set an alarm for the google form which you might want to fill in the future before their respective deadlines. It also enables you to Auto-submit a google form that is assigned to you on the google classroom.
So you dont ever have any late submissions and penalties associated :)

## Tech Stack

Frontend made with React Js along with various chrome Apis

## Description

<img src="assets\popup.jpeg" alt="Popup Page" title="Popup Page" />

### Manual Submit

<ul>
  <li> To add alarm enter a name for the alarm with the form link and a starting time and ending time</li>
  <li>At the time when the alarm has to be fired,form link will open in a new active tab with a timer (difference between ending and starting time ) on the top right of the page</li>
  <li>Google form will get auto-submitted when the time runs out  </li>
  <li>All the upcoming alarms can be seen in the Alarms </li>

<img src="assets\alarms.jpeg" alt="Alarms" title="Alarms" />

<img src="assets\noalarm.jpeg" alt="No alarms" title="No alarms" /> 
</ul>

### Auto Submit

<ul>
  <li>Find Form button will be disabled if any webpage except the assignments page of the classroom is opened</li>

<img src="assets\NOASSIGNMENT.jpeg" alt="noassignment" title="noassignment" />
<img src="assets\yesassgnment.jpeg" alt="yesassign" title="yesassign" />

  <li> Find form button the extension will auto fetch the ending time and form link from the page and will open the form on a new tab with a timer of the time difference between the starting and ending time
</li>
  <li>If the assignment doesn't contain any form link attached extension will show an error message </li>
  <li>Google form will get auto-submitted when the time runs out</li>
</ul>

#### If you want to contribute to this project:

## Steps to run locally

1. Make sure you have [Node.js](https://nodejs.org/en/download/) (v14.x) installed on your machine
1. Clone this repository `git clone` `https://github.com/devlup-labs/auto-submit-quiz`
1. Run `npm install` to install the dependencies
1. Run `npm start`
1. Load your extension on Chrome:
   1. Go to `chrome://extensions/`
   1. Turn on `Developer mode`
   1. Click on `Load unpacked extension`
   1. Select the `build` folder and upload it
