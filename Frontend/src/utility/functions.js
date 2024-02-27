export const calculateTimeDifference = (startTime, endTime) => {
    const startTimeStamp = new Date(startTime).getTime();
    const endTimeStamp = new Date(endTime).getTime();

    const timeDifference = (endTimeStamp - startTimeStamp) / (1000 * 60);
    const hours = Math.floor(timeDifference / 60);
    const minutes = Math.round(timeDifference % 60);

    const formattedTimeDifference = `${hours}:${
      minutes < 10 ? "0" : ""
    }${minutes}`;

    return formattedTimeDifference;
  };

  export const calculateTotalMilage = (work_location) => {
    const hunt_to_wick = 1.1;
    const ghsBing_to_wick = 59.1;
    const ghsNorwich_to_wick = 31.5;
    const lauren_to_wick = 7.0;
    const tabernacle_to_wick = 57.5;
    const charlotte_to_wick = 13.5;
    let total_milage;

    if (work_location === "huntington-library") {
      total_milage = hunt_to_wick * 2;
    } else if (work_location === "ghs-binghamton") {
      total_milage = ghsBing_to_wick * 2;
    } else if (work_location === "ghs-norwich") {
      total_milage = ghsNorwich_to_wick * 2;
    } else if (work_location === "laurens-central-school") {
      total_milage = lauren_to_wick * 2;
    } else if (work_location === "tabernacle-baptist-church") {
      total_milage = tabernacle_to_wick * 2;
    } else if (work_location === "charlotte-valley-central-school") {
      total_milage = charlotte_to_wick * 2;
    } else {
      total_milage = 0;
    }

    return total_milage + " " + "miles";
  };

  export const calculateDayWorked = (clock_in_time) => {
    let dateString = clock_in_time;
    let newDateStringArr = dateString.split("T");
    let date = newDateStringArr[0];
    let splitDate = date.split("-");
    let newDate = `${splitDate[1]}-${splitDate[2]}-${splitDate[0]}`;
    return newDate;
  };
  export const calculateTimePunch = (timestamp) => {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const time = `${hours}:${minutes < 10 ? "0" : ""}${minutes}`;

    return time;
  };


 