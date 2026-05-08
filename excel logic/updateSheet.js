const ExcelJS = require('exceljs');
const path = require('path');
const fs = require('fs');

const resultsJson = path.join(__dirname, '..', 'reports','test-results.json');
const tests_sheet = path.join(__dirname, '..', 'reports','Testing Report.xlsx');


async function updateSheet() {
    try {
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.readFile(tests_sheet);
        const worksheet = workbook.getWorksheet(1);

        const jsonData = await fs.promises.readFile(resultsJson, 'utf8');
        const tests_output_data = JSON.parse(jsonData);

        const headerRow = worksheet.getRow(8);
        headerRow.eachCell((headerCell, colNumber) => {
            if(headerCell.value && headerCell.value in tests_output_data[0]) {
                worksheet.getColumn(colNumber).eachCell({ includeEmpty: true }, (cell, rowNumber) => {
                    if(rowNumber > 9) {
                        const match = tests_output_data.find(entry => parseInt(entry.id, 10) + 9 === rowNumber);
                        if (match) {
                            cell.value = match[headerCell.value];
                        }
                    }
                });
            }
                
        })
        
        await workbook.xlsx.writeFile(tests_sheet);
        console.log("Updated the spreadsheet with the latest test results successfully !")

    } catch(err) {
        console.log("Error: ", err);
    }
}

updateSheet();