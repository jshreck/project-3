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
                console.log(res.data.results[0]);
              });
              
                          
          }}
          onError={error => {
            console.error(error.message);
          }}
        />
      );
    }

  export default BarcodeReader;