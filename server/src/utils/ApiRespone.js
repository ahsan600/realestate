class ApiResponse {
  constructor(statsCode, message, data = null) {
    this.statsCode = statsCode;
    this.data = data;
    this.message = message;
    this.success = statsCode < 400;
  }
}
export { ApiResponse };
