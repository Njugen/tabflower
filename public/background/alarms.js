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

const removeScheduleFromGroup = (group, scheduleId) => {
  if (scheduleId) {
    console.log("BÄÄÄH");
    chrome.alarms.clear(scheduleId);
    delete queue[scheduleId];

    if (group && group.groupScheduleList) {
      group.groupScheduleList = group.groupScheduleList.filter(
        (item) => item.scheduleId !== scheduleId
      );

      saveTabsToStorage(group, () => {});
    }
  }
};

const setAlarms = () => {
  console.log("SETALARMS CALLED");
  getAllTabGroups((groups) => {
    groups.map((group) => {
      const scheduleList = group.groupScheduleList;
      const groupId = group.groupId;

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

            queue[alarmName] = group;

            chrome.alarms.create(alarmName, alarmInfo);
          }

          return null;
        });
      }

      return null;
    });
  });
};
