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
    function doPost(e) {
        Logger.log(e.postData.contents);

        var allowedOrigin = 'https://pdbops.com';

        // Ensure POST data exists
        if (!e || !e.postData || !e.postData.contents) {
            return ContentService.createTextOutput('Invalid request: no postData')
                .setMimeType(ContentService.MimeType.TEXT);
        }

        var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('pdbops management');
        if (!sheet) {
            return ContentService.createTextOutput('No sheet found')
                .setMimeType(ContentService.MimeType.TEXT);
        }

        try {
            var formData = JSON.parse(e.postData.contents);
        } catch (error) {
            Logger.log('Error parsing JSON: ' + error);
            return ContentService.createTextOutput('Invalid JSON format')
                .setMimeType(ContentService.MimeType.TEXT);
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

        return ContentService.createTextOutput('Data saved successfully')
            .setMimeType(ContentService.MimeType.TEXT)
            .setHeaders({
                'Access-Control-Allow-Origin': allowedOrigin,
                'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            });
    }