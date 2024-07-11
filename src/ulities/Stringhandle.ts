/**
 * Hàm để giới hạn số ký tự của một chuỗi.
 * @param input - Chuỗi cần được giới hạn ký tự.
 * @param maxLength - Độ dài tối đa của chuỗi.
 * @param suffix - Chuỗi ký tự thêm vào cuối chuỗi nếu nó bị cắt ngắn (mặc định là '...').
 * @returns Chuỗi đã bị giới hạn ký tự.
 */
export function truncateString(input: string, maxLength: number, suffix: string = '...'): string {
    if (input.length <= maxLength) {
      return input;
    }
    return input.slice(0, maxLength) + suffix;
  }
export function formatNumber(number:number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
  // Ví dụ sử dụng
//   const originalString = "This is a long string that needs to be truncated.";
//   const truncated = truncateString(originalString, 20);
//   console.log(truncated); // Output: "This is a long str..."
  