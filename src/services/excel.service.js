import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

export default class ExcelService{
    static exportCityData(registrationData,resultsData,generalResults,cityName){

        const GeneralWorksheet = XLSX.utils.json_to_sheet([generalResults]);
        const RegistrationWorksheet = XLSX.utils.json_to_sheet(registrationData);
        const ResultsWorksheet = XLSX.utils.json_to_sheet(resultsData);

        const workbook = {Sheets: {'general':GeneralWorksheet,'registration': RegistrationWorksheet,'results':ResultsWorksheet}, SheetNames: ['general','registration','results']};
        const excelBuffer = XLSX.write(workbook, {bookType: 'xlsx', type: 'array'});
        this.saveAsExcelFile(excelBuffer, cityName);
    }

    static saveAsExcelFile(buffer, fileName) {
        const data = new Blob([buffer], {type: EXCEL_TYPE});
        FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
    }
}
