import {useState, useCallback} from "react";
import { FileWithPath, useDropzone } from "react-dropzone";
import * as XLSX from "xlsx";
import "../../styles/DataVisualization/DataFileInputFormulary.css";

// Types and interfaces
type CellValue = string | number | boolean | null;
type Row = CellValue[];
interface FileInputFormProps {
    onParsedFile: (headers: string[], rows: Row[], XTypes: Record<string, 'string' | 'boolean'>, yTypes: Record<string, "number">) => void;
	onCleanedFile: () => void;
}  

// Component
const FileInputForm = ({onParsedFile, onCleanedFile}:FileInputFormProps) => {
   const [uploadedFile, setUploadedFile] = useState<FileWithPath |null>(null);
	
	// Clean file function
	const onClean = useCallback(() => {
        setUploadedFile(null);
        onCleanedFile();
	}, [onCleanedFile])

    // Drop files function
    const onDrop = useCallback((acceptedFiles:FileWithPath[]) => {
        // Do something with the files
        const file = acceptedFiles[0];
        if (file) {
            setUploadedFile(file);


            const reader = new FileReader();
            reader.onload = (e: ProgressEvent<FileReader>) => {
                const result = e.target?.result;
                if (!result) return; 

                const data = new Uint8Array(result as ArrayBuffer);
                const workbook = XLSX.read(data, { type: "array" });
                const worksheet = workbook.Sheets[workbook.SheetNames[0]];
                const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as Row[];
                const headers = jsonData[0] as string[]; // Get headers/columns of the dataset (horizontal axis)
                const rows = jsonData.slice(1); // Get rows from vertical axis (up->down)

                // Obtain types of columns (to let the user to choose the visualization mode: count, compare values in case of numeric rows)
                const xTypes:Record<string, "string" | "boolean"> = {};

                // Obtain Y indexes
                const yTypes:Record<string, "number"> = {};

                headers.forEach((header:string, index:number) => {
                    const columnValues = rows.map(row => row[index]);

                    let isNumber = true;
                    let isBoolean = true;

                    // Column type validation
                    for (let val of columnValues) {
                        const normalized = val?.toString().trim().toLowerCase();

                        if (isNaN(Number(val))) isNumber = false; // If column is not a number, set isNumber to false.
                        if (normalized !== "true" && normalized !== "false") isBoolean = false; // If column is not a boolean, set isBoolean to false.
                    }

                    if (isBoolean) {
                        xTypes[header] = "boolean";
                    } else if (isNumber) {
                        yTypes[header] = "number";
                    } else {
                        xTypes[header] = "string";
                    }
                });

                // Send parsed data to parent
                onParsedFile(headers, rows, xTypes, yTypes);
            };
            reader.readAsArrayBuffer(file);
        }
    }, [onParsedFile]);

    // Validation of files
    const {getRootProps, getInputProps} = useDropzone({onDrop,
        accept: {
            'text/csv': ['.csv'], // Accept .csv files
            'application/vnd.ms-excel': ['.xls'], // Accept .xls or sheets files
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'], // Accept .xlsx files for Excel from office
        },
        multiple: false
    });

    return(
        <div className="file-upload-container">
            <h3>1. Input The DataFile</h3>
            <p>ℹ️ Upload a file in csv, xlsx or xls format. You can drag and drop down below.</p>

            {/* Drop fIles here */}
            <div {...getRootProps({ className: 'dropzone' })}>
                <input {...getInputProps()} />
                {uploadedFile ? (
                    <div>
                        <p id="file-info">✅ File selected: <strong>{uploadedFile.name}</strong></p>
                        <button className="clean-uploaded-file-button" onClick={(e) => {e.stopPropagation();onClean();}}>Clean</button>
                    </div>
                ) : (
                    <div>
                        <p>🗂️ Drag and drop a file here, or click to select one</p>
                        <button className="clean-uploaded-file-button hided" onClick={onClean}>Clean</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default FileInputForm;