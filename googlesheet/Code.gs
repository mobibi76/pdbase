/*Google Spread-Sheet Extention App-Script Use*/

// setup Google spresdsheet
function setupSheet() {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('pdbops management');

    // setup label
    var headers = ['applicationDate',
                  'customerName',
                  'customerEmail',
                  'customerGender',
                  'field/work',
                  'requirements',
                  'serviceZone',
                  'serviceDate',
                  'wantedServices',
                  'anotherOpinion',
                  'remarks'
                  ];
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
}

// oepn the html file: doGet() function
function doGet() {

    // from external site url
    const url = 'https://pdbops.com/Management'

    return HtmlService.createHtmlOutputFromFile('pdbopsapply.html')
        .setTitle('pdbops.com 컨설팅 의뢰서')
        .setWidth(1000)
        .setHeight(1000);
}

// save form-data to the Google spread-sheet: using internal App-Script Runtime
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

return 'Data saved successfully';
}

// save form-data to the Google spread-sheet: using Fetch API Runtime
function doPost(e) {
    Logger.log(JSON.stringify(e));
    Logger.log(e.postData.contents);

    if (!e || !e.postData || !e.postData.contents) {
        return ContentService.createTextOutput('Invalid request: no postData');
    }

    Logger.log(e.postData.contents);

    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('pdbops application check');
    if (!sheet) {
        return ContentService.createTextOutput('No sheet found');
    }

    try {
        var formData = JSON.parse(e.postData.contents);
    } catch (error) {
        Logger.log('Error parsing JSON: ' + error);
        return ContentService.createTextOutput('Invalid JSON format');
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

    return ContentService.createTextOutput('Data saved successfully');
}