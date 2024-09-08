/*Google Sheet Extention App-Script Use*/

// setup Google sheet
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

// oepn html: doGet() function
function doGet(e) {
    // from external site url
    const url = 'https://pdbops.com/source/form.html'

    try {
        const response = UrlFetchApp.fetch(url);
        const htmlContent = response.getContentText();

        return ContentService.createTextOutput(htmlContent).setMimeType(ContentService.MimeType.HTML);
    } catch (error) {
        return ContentService.createTextOutput('Error fetching HTML: ' + error).setMimeType(ContentService.MimeType.TEXT);
    }
}
    // from internal App-Script runtime
    /*return HtmlService.createHtmlOutputFromFile('pdbopsmgt.html')
        .setTitle('pdbops.com 컨설팅 서비스 신청폼')
        .setWidth(1000)
        .setHeight(1000);
}*/

// send form-data to Google sheet: using internal App-Script runtime
/*function submitFormData(formData) {
    // check form-data
    if (!formData) {
        return 'There is no formData.';
    }
    // check sheet tab's name
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('pdbops management');
    if (!sheet) {
        return 'There is no sheet tab.';
    }
    // get Korean local time to record
    const timeZone = 'Asia/Seoul';
    const now = new Date();
    const koreanTime = Utilities.formatDate(now, timeZone, 'yyyy-MM-dd HH:mm:ss');
    // append form-data to Google sheet
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
}*/

// send form-data to Google sheet: from other sites
function doPost(e) {
    // get active sheet
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('pdbops management');
    if (!sheet) {
        return ContentService.createTextOutput('No sheet found');
    }
    try {
        // parse form-data from POST request
        var formData = JSON.parse(e.postData.contents);
        // get Korean local time to record
        const timeZone = 'Asia/Seoul';
        const now = new Date();
        const koreanTime = Utilities.formatDate(now, timeZone, 'yyyy-MM-dd HH:mm:ss');
        // append form-data to Google sheet
        sheet.appendRow([
            koreanTime || '',
            formData.customerName || '',
            formData.customerEmail || '',
            formData.customerGender || '',
            formData.fieldWork || '',
            formData.requirements || '',
            formData.serviceZone || '',
            formData.serviceDate || '',
            formData.wantedServices ? formData.wantedServices.join(", ") : '',
            formData.anotherOpinion || '',
            formData.remarks ? formData.remarks.join(", ") : ''
        ]);
        // return success message
        return ContentService.createTextOutput('Data saved successfully').setMimeType(ContentService.MimeType.TEXT);

    } catch (error) {
        Logger.log('Error processing POST data: ' + error);
        return ContentService.createTextOutput('Error processing data').setMimeType(ContentService.MimeType.TEXT);
    }
}