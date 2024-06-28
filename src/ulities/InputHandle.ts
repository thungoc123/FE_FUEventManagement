import { Time } from "../Types/global.type";

export const parseTime = (timeString: string): Time => {
    const [hourStr, minuteStr] = timeString.split(':');
    const hour = parseInt(hourStr, 10);
    const minute = parseInt(minuteStr, 10);
  
    // Kiểm tra giá trị hợp lệ
    if (isNaN(hour) || hour < 0 || hour > 23) {
      throw new Error("Invalid hour value");
    }
  
    if (isNaN(minute) || minute < 0 || minute > 59) {
      throw new Error("Invalid minute value");
    }
  
    return {
      hour,
      minute,
      second: 0,
      nano: 0
    };
  };