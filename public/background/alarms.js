// Queue of tabgroups to be launched when the alarm ticks.
let queue = {};

chrome.alarms.onAlarm.addListener(function (alarm) {
  const localQueue = queue;

  console.log("BUH", localQueue, alarm);

  if (localQueue[alarm.name]) {
    launchTabGroup(localQueue[alarm.name], () => {
      // Remove the schedule with this alarm name

      if (Array.isArray(localQueue[alarm.name].groupScheduleList)) {
        localQueue[alarm.name].groupScheduleList.filter((item) =>
          item.scheduleId === alarm.name &&
          item.currentRegularLaunchValue !== true
            ? removeScheduleFromGroup(localQueue[alarm.name], alarm.name)
            : null
        );
      }
    });
  }
});

const loadScheduleQueueFromStorage = () => {
  chrome.storage.local.get(["scheduleQueue"], (response) => {
    queue = response.scheduleQueue || {};
  });
};

const saveScheduleQueueToStorage = (group, alarmName) => {
  let updatedQueue = queue;

  updatedQueue[alarmName] = group;

  chrome.storage.local.set(
    {
      scheduleQueue: updatedQueue,
    },
    loadScheduleQueueFromStorage
  );
};

const deleteScheduleQueueFromStorage = (alarmName) => {
  let updatedQueue = queue;

  delete updatedQueue[alarmName];

  chrome.storage.local.set(
    {
      scheduleQueue: updatedQueue,
    },
    loadScheduleQueueFromStorage
  );
};

const deleteAllSchedulesFromStorage = (callback) => {
  chrome.storage.local.remove(["scheduleQueue"], loadScheduleQueueFromStorage);
};

const removeScheduleFromGroup = (group, scheduleId) => {
  if (scheduleId) {
    chrome.alarms.clear(scheduleId);
    //delete queue[scheduleId];
    deleteScheduleQueueFromStorage(scheduleId);

    if (group && group.groupScheduleList) {
      group.groupScheduleList = group.groupScheduleList.filter(
        (item) => item.scheduleId !== scheduleId
      );

      saveTabsToStorage(group, () => {});
    }
  }
};

const removeAllSchedulesAndAlarms = () => {
  //queue = {};
  deleteAllSchedulesFromStorage();

  chrome.alarms.clearAll();
};

const setAlarm = (group, alarmName, alarmInfo) => {
  // group: the tabgroup to be executed by the listener triggered by this alarm.abs
  // alarmName: the name of the new alarm
  // alarmInfo: a property object configuring the new alarm.

  chrome.alarms.get(alarmName, (storedAlarm) => {
    if (!queue[alarmName]) {
      //queue[alarmName] = group;
      saveScheduleQueueToStorage(group, alarmName);
    }

    if (
      !storedAlarm ||
      (typeof storedAlarm === "object" && storedAlarm.name !== alarmName)
    ) {
      chrome.alarms.create(alarmName, alarmInfo);
    }
  });
};

const refreshAlarms = () => {
  console.log("SETALARMS CALLED");

  removeAllSchedulesAndAlarms();

  getAllTabGroups((groups) => {
    groups.map((group) => {
      const scheduleList = group.groupScheduleList;

      if (Array.isArray(scheduleList) && scheduleList.length > 0) {
        // This group does have an schedule list

        scheduleList.map((schedule, scheduleIndex) => {
          if (schedule.launchAtTimestamp) {
            const alarmName = schedule.scheduleId;

            let alarmInfo = {
              when: schedule.launchAtTimestamp,
            };

            if (schedule.currentRegularLaunchValue === true) {
              alarmInfo.periodInMinutes = 1;
            }

            setAlarm(group, alarmName, alarmInfo);
          }
          return null;
        });
      }

      return null;
    });
  });
};

refreshAlarms();
