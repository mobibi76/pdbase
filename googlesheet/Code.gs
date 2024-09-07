/*Google Spread-Sheet Extention App Script Use*/

// setup the spresdsheet
function setupSheet() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('pdbops application check'); // 시트 이름 변경 필요

// setup label
  var headers = ['기록시간', '이름', '이메일', '성별', '분야/업무', '희망 내용', '희망 지역', '희망 날짜', '희망 서비스', '제안 의견', '참고 사항'];
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);

// oepn html file
function doGet() {
  return HtmlService.createHtmlOutputFromFile('pdbopsapply.html')
    .setTitle('pdbops.com 컨설팅 의뢰서')
    .setWidth(600)
    .setHeight(600);
}

// save form-data to Google spread-sheet
function submitFormData(formData) {
  // check form-data
  if (!formData) {
    return 'There was no formData.';
  }

  // check spread-sheet
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('pdbops application check');
  if (!sheet) {
    return 'There was no spreadsheet.';
  }

// Korean local time for records
const timeZone = 'Asia/Seoul';
const now = new Date();
const koreanTime = Utilities.formDate(now, timeZone, 'yyyy-MM-dd HH:mm:ss');


// Korean local time (UTC+9) applied for dateService
function toKST(dateStr) {
    const date = new Date(dateStr + 'T00:00:00+09:00');
    return date.toISOString().split('T')[0]; // Return Date Only
}

  // add data to the spread-sheet
  sheet.appendRow([
    koreanTime || '',
    formData.name || '',
    formData.email || '',
    formData.gender || '',
    formData.fieldWork || '',
    formData.hopeService || '',
    formData.areaService || '',
    toKST(formData.dateService) || '',
    formData.selectService ? formData.selectService.join(", ") : '',
    formData.moreService || '',
    formData.remarks ? formData.remarks.join(", ") : ''
  ]);

return '감사합니다. 확인 후 연락드리겠습니다.';
}