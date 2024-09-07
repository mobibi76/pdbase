/*구글 스프레드시트 App Script 확장 활용*/
// HTML 문서를 열어주는 함수
function doGet() {
  return HtmlService.createHtmlOutputFromFile('pdbopsapply.html')
    .setTitle('pdbops.com 컨설팅 의뢰서')
    .setWidth(600)
    .setHeight(600);
}

// 폼 데이터를 구글 시트에 저장하는 함수
function submitFormData(formData) {
  // 폼 데이터가 없는 경우 처리
  if (!formData) {
    return '폼 데이터가 정의되지 않았습니다.';
  }

  // 스프레드시트와 시트를 가져오기
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('pdbops application check');
  if (!sheet) {
    return '스프레드시트를 찾을 수 없습니다.';
  }

  // 시트에 데이터 추가
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
  
  // 성공 메시지 반환
  return '감사합니다. 확인 후 연락드리겠습니다.';
}