/**
 * 252. 会议室
 * 给定一个会议时间安排的数组 intervals ，每个会议时间都会包括开始和结束的时间 intervals[i] = [starti, endi] ，请你判断一个人是否能够参加这里面的全部会议。
 *
 * 示例 1：
 *
 * 输入：intervals = [[0,30],[5,10],[15,20]]
 * 输出：false
 *
 * 示例 2：
 *
 * 输入：intervals = [[7,10],[2,4]]
 * 输出：true
 *
 * 提示：
 *
 * 0 <= intervals.length <= 104
 * intervals[i].length == 2
 * 0 <= starti < endi <= 106
 */
export function canAttendMeetings(intervals: number[][]): boolean {
  if (intervals.length <= 1) {
    return true;
  }
  // 先排序
  intervals.sort((p1, p2) => p1[0] - p2[0]);

  for (let i = 0; i < intervals.length - 1; i++) {
    const end = intervals[i][1];
    const start = intervals[i + 1][0];
    if (end > start) {
      return false;
    }
  }

  return true;
}
