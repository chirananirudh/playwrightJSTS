const exceljs = require('exceljs');
const { test, expect } = require('@playwright/test');

// const workbook = new exceljs.Workbook();
// workbook.xlsx.readFile('C://Users//WB470668//playwrightExcelScript//Exceldownload.xlsx').then(() => {
//     const worksheet = workbook.getWorksheet('Sheet1');
//     console.log("------------------------------------------")
//     worksheet.eachRow((row, rowNumber) => {
//         row.eachCell((cell, colNumber) => {
//             console.log(`Row ${rowNumber}, Column ${colNumber}:  ${cell.value}`);
//         });
//     });
// });

async function writeExcel(searchText, replaceText, change, filePath) {

    const workbook = new exceljs.Workbook();
    await workbook.xlsx.readFile(filePath)
    const worksheet = workbook.getWorksheet('Sheet1');
    const output = await readExcel(worksheet, searchText);

    const cell = worksheet.getCell(output.row, output.col + change.colChange);
    cell.value = replaceText
    await workbook.xlsx.writeFile(filePath);
    console.log("File is updated");
}

async function readExcel(worksheet, searchText) {
    let output = { row: -1, col: -1 };
    worksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => {
            if (cell.value == searchText) {
                output.row = rowNumber;
                output.col = colNumber;
                console.log(`Row ${output.row}, Column ${output.col}:  ${cell.value}`);
            }
        });
    });
    return output;
}


// console.log("Writing Excel using async/await:");
// writeExcel("Banana", 350, { rowChange: 0, colChange: 2 }, "C://Users//WB470668//playwrightExcelScript//Exceldownload.xlsx");

//update Mango Price to 350. 
test('Upload download excel validation', async ({ page }) => {
    const textSearch = 'Mango';
    const updateValue = '350';
    await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");
    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button', { name: 'Download' }).click();
    await downloadPromise;
    await page.pause();
    writeExcel(textSearch, updateValue, { rowChange: 0, colChange: 2 }, "C:/Users/WB470668/Downloads/Exceldownload.xlsx");
    await page.locator("#fileinput").click();
    await page.locator("#fileinput").setInputFiles("C:/Users/WB470668/Downloads/Exceldownload.xlsx");
    const textlocator = page.getByText(textSearch);
    const desiredRow = await page.getByRole('row').filter({ has: textlocator });
    await expect(desiredRow.locator("#cell-4-undefined")).toContainText(updateValue);
});