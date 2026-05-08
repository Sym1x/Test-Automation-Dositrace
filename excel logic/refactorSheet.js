const ExcelJS = require('exceljs');
const path = require('path');
const fs = require('fs');

const resultsJson = path.join(__dirname, '..', 'reports','test-results.json');
const original = path.join(__dirname, 'Tests unitaires Dositrace.xlsx');

const report = path.join(__dirname, '..', 'reports','Testing Report.xlsx');

async function refactorSheet() {
    try{
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.readFile(original);
        const worksheet = workbook.getWorksheet(1);

        worksheet.eachRow((row, rowNumber) => {
            if (rowNumber > 7) {
                row.eachCell((cell, colNumber) => {
                if (colNumber > 4) {

                    if (cell.isMerged) {
                        const master = cell.master.address;
                        worksheet.unMergeCells(master);
                    }

                    cell.value = null;
                    cell.style = {};
                    cell.numFmt = null;
                }
                });
            }
        });
        
        
        const headerRow = worksheet.getRow(8);
        let lastHeaderCol = 0;
        headerRow.eachCell((cell, colNumber) => {
            if (cell.value !== null && cell.value !== undefined && cell.value !== "") {
                lastHeaderCol = colNumber;
            }
        });
        let newHeaderCol = lastHeaderCol + 1;

        const jsonData = await fs.promises.readFile(resultsJson, 'utf8');
        const tests_output_data = JSON.parse(jsonData);
        Object.keys(tests_output_data[0]).forEach(attribute => {
            
            if(attribute != "name") {

                worksheet.getCell(8, newHeaderCol).value = attribute;
                worksheet.mergeCells(8, newHeaderCol, 9, newHeaderCol);
                worksheet.getColumn(newHeaderCol).eachCell({ includeEmpty: true }, (cell, rowNumber) => {
                    if (rowNumber > 7 && rowNumber < 811) {
                        cell.alignment = {
                            horizontal: 'center',
                            vertical: 'middle',
                            wrapText: true 
                        }
                        cell.border = {
                            top:    { style: 'thin' },
                            left:   { style: 'thin' },
                            bottom: { style: 'thin' },
                            right:  { style: 'thin' }
                        };
                    }
                });
                newHeaderCol++;
            }
        });

        path.join(__dirname, 'Tests unitaires Dositrace.xlsx');
        await workbook.xlsx.writeFile(report);
        console.log("Unit Tests Sheet refactored for automated tests successfully !");

    } catch(err) {
        console.error("Error: ", err);
    }
}

refactorSheet();