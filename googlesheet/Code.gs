/*Google Spread-Sheet Extention App-Script Use*/

// setup Google spresdsheet
function setupSheet() {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('pdbops application check');

    // setup the label
    var headers = ['Application', 'Name', 'Email', 'Gender', 'Field/Work', 'Request', 'Area', 'Date', 'Services', 'Opinion', 'Remarks'];
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
}

// oepn the html file
function doGet() {
    return HtmlService.createHtmlOutputFromFile('pdbopsapply.html')
        .setTitle('pdbops.com 컨설팅 의뢰서')
        .setWidth(600)
        .setHeight(600);
}

// save form-data to the Google spread-sheet
function submitFormData(formData) {
    // check the form-data
    if (!formData) {
        return 'There was no formData.';
    }

    // check the spread-sheet
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('pdbops application check');
    if (!sheet) {
        return 'There was no spreadsheet.';
    }

    // Korean local time for records
    const timeZone = 'Asia/Seoul';
    const now = new Date();
    const koreanTime = Utilities.formatDate(now, timeZone, 'yyyy-MM-dd HH:mm:ss');

    // add data(html) to the spread-sheet
    sheet.appendRow([
        koreanTime || '',
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

return '감사합니다. 확인 후 연락드리겠습니다.';
}