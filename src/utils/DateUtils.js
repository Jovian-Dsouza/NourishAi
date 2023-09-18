class DateUtils {
  static getDateFromTimestamp(timestamp) {
    return new Date(timestamp).toISOString().split("T")[0];
  }
}

export default DateUtils;
