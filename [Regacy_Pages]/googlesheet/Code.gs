/*Google Sheet AppScript CORS issue, payload(JSON) from Javascript Local*/

// setup Google sheet
function setupSheet() {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('pdbops management');
    var headers = [
        'applicationDate',
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

// doPost(e) function
function doPost(e) {
    Logger.log(e.postData.contents);

    // Ensure POST data exists
    if (!e || !e.postData || !e.postData.contents) {
        return createCorsResponse('Invalid request: no postData');
    }

    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('pdbops management');
    if (!sheet) {
        return createCorsResponse('No sheet found');
    }

    try {
        var formData = JSON.parse(e.postData.contents);
    } catch (error) {
        Logger.log('Error parsing JSON: ' + error);
        return createCorsResponse('Invalid JSON format');
    }

    const timeZone = 'Asia/Seoul';
    const now = new Date();
    const koreanTime = Utilities.formatDate(now, timeZone, 'yyyy-MM-dd HH:mm:ss');

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

    return createCorsResponse('Data saved successfully');
}

// allow CORS response
function createCorsResponse(message) {
    return ContentService.createTextOutput(message)
        .setMimeType(ContentService.MimeType.TEXT)
        .setHeader('Access-Control-Allow-Origin', '*')
        .setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
        .setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');
}

// repond OPTIONS request
function doGet(e) {
    return createCorsResponse('GET request handled');
}

function doOptions(e) {
    return createCorsResponse('OPTIONS request handled');
}