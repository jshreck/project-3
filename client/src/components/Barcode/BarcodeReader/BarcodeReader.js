import React from 'react';
import { ScanSettings } from "scandit-sdk";
import BarcodePicker from "../BarcodePicker";
import API from '../../../utils/API';


const BarcodeReader = (props) => {
      return (
        <BarcodePicker
          playSoundOnScan={true}
          vibrateOnScan={true}
          scanSettings={
            new ScanSettings({
              enabledSymbologies: ["qr", "ean8", "ean13", "upca", "upce", "code128", "code39", "code93", "itf"],
              codeDuplicateFilter: 1000
            })
          }
          onScan={(scanResult) => {
            const { barcodes = [] } = scanResult;
            
            if (!barcodes.length) {
              // IF there are no barcodes to report...
            }

            props.handleBarcodeChange({ target: { value: barcodes[0].data }});
  
              API.findBarcode(barcodes[0].data)
              .then((res) => {
                console.log(JSON.parse(res.data));
                let results = JSON.parse(res.data);
      
                if (results.results_count<1) {
                  console.log("alert");
                  console.log()
                  props.handleAlertShow();
                }
                else {
                //if auto save find item and then save to database, else find item and output to form
                let name = (results.results[0].name);
                props.handleItemNameChange({ target: { value: name }});
                }
                //if results count = 1 want to continue else alert and either skip or manually add (alert)
               
              });
              
                          
          }}
          onError={error => {
            console.error(error.message);
          }}
        />
      );
    }

  export default BarcodeReader;