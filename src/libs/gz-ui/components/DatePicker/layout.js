export default function layout(Year, Month) {
	// 获取当前日期
	let currentDate = new Date().getDate();
	// 获取当前月第一天是星期几
	let currentMonthFirstDayWeek = new Date(Year, Month - 1, 1).getDay();
	if (currentMonthFirstDayWeek === 0) {
		currentMonthFirstDayWeek = 7;
	}
	// 获取当前月最后一天天数
	let currentMonthLastDay = new Date(new Date(Year, Month, 1) - 86400 * 1000).getDate();
	// 获取上个月最后一天天数
	let prevMonthLastDay = new Date(new Date(Year, Month - 1, 1) - 86400 * 1000).getDate();

	let timeData = [];
	for (let i = prevMonthLastDay - (currentMonthFirstDayWeek - 1) + 1; i <= prevMonthLastDay; i++) {
		timeData.push(`${Month == 1 ? Year - 1 : Year}-${Month == 1 ? 12 : Month - 1}-${i}`);
	}
	for (let i = 1; i <= currentMonthLastDay; i++) {
		timeData.push(`${Year}-${Month}-${i}`);
	}
	let suppleDate = 42 - currentMonthLastDay - (currentMonthFirstDayWeek - 1);

	for (let i = 1; i <= suppleDate; i++) {
		timeData.push(`${Month == 12 ? Year + 1 : Year}-${Month == 12 ? 1 : Month + 1}-${i}`);
	}
	return timeData;
}
