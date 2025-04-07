import React, {useState} from "react";
import "../../styles/DataVisualization/DataFileInputFormulary.css";

const DataFileInputFormulary = () => {
    const [isFileUploaded, setIsFileUploaded] = useState(false); // State will change once user uploads or drops a file
    const [uploadedFile, setUploadedFile] = useState(null);

    const handleFileUploading = () => {
        setUploadedFile();
        if (uploadedFile != null || uploadedFile != null) {
            setIsFileUploaded(true);
        }
        localStorage.setItem("IsFileUploadedInDataVisualization", uploadedFile);
        localStorage.setItem("UploadedFileInDataVizualization", isFileUploaded);
    };

    const cleanUploadedFile = () => {
        setUploadedFile(null);
        localStorage.removeItem("IsFileUploadedInDataVisualization");
        localStorage.removeItem("UploadedFileInDataVizualization");
    };

    return(
        <div className="file-upload-container">
            <h3>1. Input The DataFile</h3>
            <p>ℹ️ Upload a file in csv, xlsx or xls format. You can drag and drop down below.</p>
            <form onChange={handleFileUploading} className="file-upload-formulary">
                <label>File (csv, xlsx, xls) <input type="file" value={uploadedFile}></input></label>
            </form>
            <button id="clean-uploaded-file-button" onClick={cleanUploadedFile}>Clean</button>
        </div>
    );
}

export default DataFileInputFormulary;