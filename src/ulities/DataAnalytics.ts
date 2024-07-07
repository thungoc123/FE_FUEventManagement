// Hàm tách từng ngày trong khoảng thời gian
function getDatesInRange(startDate: Date, endDate: Date): Date[] {
  const dateArray: Date[] = [];
  let currentDate = new Date(startDate);
  // Thêm ngày hiện tại vào mảng và sau đó tăng thêm một ngày cho đến khi đạt đến ngày kết thúc
  while (currentDate <= endDate) {
      dateArray.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
  }
  return dateArray;
}

// Ngày bắt đầu và ngày kết thúc
const startDate = new Date('2024-05-05');
const endDate = new Date('2024-06-06');

// Gọi hàm và nhận kết quả
const dates = getDatesInRange(startDate, endDate);

// In ra các ngày
dates.forEach(date => console.log(date.toDateString()));