/* google App Script */

// open HTML document
function doGet() {
  return HtmlService.createHtmlOutputFromFile('pdbopsapply.html')
    .setTitle('컨설팅 서비스 신청')
    .setWidth(600)
    .setHeight(400);
}

// save the input data into the google spreadsheet
function submitFormData(formData) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('pdbops application check');
  sheet.appendRow([
    formData.name,
    formData.email,
    formData.gender,
    formData.field_work,
    formData.hope_service,
    formData.area_service,
    formData.date_service,
    formData.select_service.join(", "),
    formData.more_service,
    formData.remarks.join(", ")
  ]);
  
  return '감사합니다. 확인후 연락드리겠습니다.';
}