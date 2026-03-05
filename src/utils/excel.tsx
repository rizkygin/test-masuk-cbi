import React from 'react';
import FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import Icons, { exportIcon } from '@/public/icons/icons';
import { CSSProperties } from 'react';

const styles: Record<string, CSSProperties> = {
    button: {
        display: 'flex',
        flexDirection: 'row',
        gap: '0.5rem',
        alignItems: 'center',
        justifyContent: 'center',
        width: 'auto',
    },
};

type Props = {
    csvData: Object[];
    fileName: string;
};

export const ExportCSV: React.FC<Props> = ({ csvData, fileName }) => {
    const fileType =
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";

    const exportToCSV = (csvData: Object[], fileName: string) => {
        const ws = XLSX.utils.json_to_sheet(csvData);
        const wb = { Sheets: { data: ws }, SheetNames: ["data"] };

        const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
        const data = new Blob([excelBuffer], { type: fileType });

        FileSaver.saveAs(data, fileName + fileExtension);
    };

    return (
        <div style={styles.button}>
            <button onClick={(e) => exportToCSV(csvData, fileName)} style={styles.button}>
                <Icons color="green" icon={exportIcon} />
                Export data
            </button>
        </div>
    );
};