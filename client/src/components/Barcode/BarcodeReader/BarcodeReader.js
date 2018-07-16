import React from 'react';
import { ScanSettings } from "scandit-sdk";
import BarcodePicker from "../BarcodePicker";
import API from '../../../utils/API';


const BarcodeReader = (props) => {
  console.log("autosave in barcode reader= " + props.autoSaveOn);
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

        //puts barcode in form
        props.handleBarcodeChange({ target: { value: barcodes[0].data } });

        //searches API for barcode -> if it can't find one it will render the alert, if it can then either renders item name in form, if autosave on it will autosave
        API.findBarcode(barcodes[0].data)
          .then((res) => {
            console.log(JSON.parse(res.data));
            let results = JSON.parse(res.data);

            if (results.results_count < 1) {
              console.log("alert");
              console.log()
              props.handleAlertShow();
            }

            else {
              let name = (results.results[0].name);
              props.handleItemNameChange({ target: { value: name } });
              props.handleScanSuccess();
              // console.log("autoSave in else = " + props.autoSaveOn);
              // if (props.autoSaveOn) {
    
              //   console.log("HITTING AUTOSAVE TRUE");
              // }
            }
          })
          .catch(err => console.log(err));
      }}
      onError={error => {
        console.error(error.message);
      }}
    />
  );
}

export default BarcodeReader;