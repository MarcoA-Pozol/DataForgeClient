import React, {useState, useCallback} from "react";
import { useDropzone } from "react-dropzone";
import "../../styles/DataVisualization/DataFileInputFormulary.css";

const DataFileInputFormulary = () => {
   const [uploadedFile, setUploadedFile] = useState(null);

    // Drop files function
    const onDrop = useCallback(acceptedFiles => {
        // Do something with the files
        const file = acceptedFiles[0];
        if (file) {
            setUploadedFile(file);
            localStorage.setItem("UploadedFileInDataVisualization", file.name);
            localStorage.setItem("IsFileUploadedInDataVisualization", true);
        }
    }, []);

    // Validation of files
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop,
        accept: {
            'text/csv': ['.csv'], // Accept .csv files
            'application/vnd.ms-excel': ['.xls'], // Accept .xls or sheets files
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'], // Accept .xlsx files for Excel from office
        },
        multiple: false
    });

    const cleanUploadedFile = () => {
        setUploadedFile(null);
        localStorage.removeItem("IsFileUploadedInDataVisualization");
        localStorage.removeItem("UploadedFileInDataVizualization");
    };

    return(
        <div className="file-upload-container">
            <h3>1. Input The DataFile</h3>
            <p>ℹ️ Upload a file in csv, xlsx or xls format. You can drag and drop down below.</p>

            {/* Drop fIles here */}
            <div {...getRootProps({ className: 'dropzone' })}>
                <input {...getInputProps()} />
                {uploadedFile ? (
                    <p id="file-info">✅ File selected: <strong>{uploadedFile.name}</strong></p>
                ) : (
                    <p>🗂️ Drag and drop a file here, or click to select one</p>
                )}
            </div>

            {/* Browse files manually */}
            {/*<form onChange={(e) => onDrop(e.target.files)} accept=".csv, .xlsx, .xls" className="file-upload-formulary">
                <label>File (csv, xlsx, xls) <input type="file" value={uploadedFile}></input></label>
            </form>*/}
            
            {/* Clean selected file */}
            {uploadedFile ? (<button className="clean-uploaded-file-button" onClick={cleanUploadedFile}>Clean</button>)
            : (<button className="clean-uploaded-file-button hided" onClick={cleanUploadedFile}>Clean</button>)}
        </div>
    );
}

export default DataFileInputFormulary;