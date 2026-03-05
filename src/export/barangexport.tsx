import * as ExcelJS from 'exceljs';

export default function exportBarang() {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Barang');
    worksheet.columns = [
        { header: 'ID', key: 'id', width: 10 },
        { header: 'Nama Barang', key: 'item_name', width: 30 },
        { header: 'Stock', key: 'stock', width: 10 },
        { header: 'Unit', key: 'unit', width: 10 },
    ];
    return workbook;
}