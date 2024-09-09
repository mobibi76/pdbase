/*Google Sheet Extension AppScript Use*/

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

// open html: doGet(e) function
    function doGet(e) {
        // from external site url
        const url = 'https://pdbops.com/source/form.html';

        try {
            const response = UrlFetchApp.fetch(url);
            const htmlContent = response.getContentText();

            return ContentService.createTextOutput(htmlContent).setMimeType(ContentService.MimeType.HTML);
        } catch (error) {
            return ContentService.createTextOutput('Error fetching HTML: ' + error).setMimeType(ContentService.MimeType.TEXT);
        }
    }

// send formData to Google sheet using internal AppScript runtime
    /*function submitFormData(formData) {
        // check formData
        if (!formData) {
            return 'There is no formData.';
        }
        // check sheet
        const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('pdbops management');
        if (!sheet) {
            return 'There is no sheet tab.';
        }
        // get Korean local time to record
        const timeZone = 'Asia/Seoul';
        const now = new Date();
        const koreanTime = Utilities.formatDate(now, timeZone, 'yyyy-MM-dd HH:mm:ss');
        // append formData to Google sheet
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
        return 'Data saved successfully';
    }*/

// send formData to Google sheet using fetch
    /*function doPost(e) {
        // get active sheet
        var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('pdbops management');
        if (!sheet) {
            return ContentService.createTextOutput('No sheet found');
        }
        try {
            // parse formData from POST request
            var formData = JSON.parse(e.postData.contents);
            // get Korean local time to record
            const timeZone = 'Asia/Seoul';
            const now = new Date();
            const koreanTime = Utilities.formatDate(now, timeZone, 'yyyy-MM-dd HH:mm:ss');
            // append formData to Google sheet
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
    }*/

// send formData to Google sheet using fetch: try to solve CROS header origin issue
    function doPost(e) {
        Logger.log(e.postData.contents);
    
        if (!e || !e.postData || !e.postData.contents) {
            return ContentService.createTextOutput('Invalid request: no postData')
                .setMimeType(ContentService.MimeType.TEXT)
                .setHeader('Access-Control-Allow-Origin', 'https://pdbops.com/source/form.html');
        }
    
        var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('pdbops management');
        if (!sheet) {
            return ContentService.createTextOutput('No sheet found')
                .setMimeType(ContentService.MimeType.TEXT)
                .setHeader('Access-Control-Allow-Origin', 'https://pdbops.com/source/form.html');
        }
    
        try {
            var formData = JSON.parse(e.postData.contents);
        } catch (error) {
            Logger.log('Error parsing JSON: ' + error);
            return ContentService.createTextOutput('Invalid JSON format')
                .setMimeType(ContentService.MimeType.TEXT)
                .setHeader('Access-Control-Allow-Origin', 'https://pdbops.com/source/form.html');
        }
    
        const timeZone = 'Asia/Seoul';
        const now = new Date();
        const koreanTime = Utilities.formatDate(now, timeZone, 'yyyy-MM-dd HH:mm:ss');
    
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
    
        return ContentService.createTextOutput('Data saved successfully')
            .setMimeType(ContentService.MimeType.TEXT)
            .setHeader('Access-Control-Allow-Origin', 'https://pdbops.com/source/form.html');
    }