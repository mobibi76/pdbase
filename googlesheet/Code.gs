/*google spreadsheet app script*/
// open HTML document
function doGet() {
  return HtmlService.createHtmlOutputFromFile('pdbopsapply.html')
    .setTitle('pdbops.com 컨설팅 의뢰서')
    .setWidth(600)
    .setHeight(600);
}

// save the input data into the google spreadsheet
function submitFormData(formData) {
  if (!formData) {
    return '폼 데이터가 정의되지 않았습니다.';
  }

  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('pdbops application check');
  if (!sheet) {
    return '스프레드시트를 찾을 수 없습니다.';
  }

  sheet.appendRow([
    formData.name || '',
    formData.email || '',
    formData.gender || '',
    formData.fieldWork || '',
    formData.hopeService || '',
    formData.areaService || '',
    formData.dateService || '',
    formData.selectService ? formData.selectService.join(", ") : '',
    formData.moreService || '',
    formData.remarks ? formData.remarks.join(", ") : ''
  ]);
  
  return '감사합니다. 확인후 연락드리겠습니다.';
}