import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";
import { useState } from "react";
import { Document, Page } from "react-pdf";
// import { PdfProps } from "../types";
import { pdfjs } from "react-pdf";
import "./pdfViewer.css";
interface PdfProps {
        src: string;
      }


pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function PdfViewer({ src }: PdfProps) {
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  function nextPage() {
    setPageNumber((v) => ++v);
  }

  function prevPage() {
    setPageNumber((v) => --v);
  }

  return (
    <div className="Pdf_Container">
      {/* <button onClick={prevPage} disabled={pageNumber <= 1}>
        Previous
      </button>
      <button onClick={nextPage} disabled={pageNumber >= (numPages ?? -1)}>
        Next
      </button> */}
      <Document
        file={src}
        onLoadSuccess={onDocumentLoadSuccess}
        className="my-react-pdf"
      >
        {/* <Page pageNumber={pageNumber} /> */}
        {Array.from(new Array(numPages), (el, index) => (
            <div >
          <Page 
            key={`page_${index + 1}`} 
            pageNumber={index + 1} 
            className="Pdf_page"
            
          />
          <p className="page_number_text">
          Page {index+1} of {numPages}
        </p>
        </div>
        ))}
      </Document>
       
    </div>
  );
}
 