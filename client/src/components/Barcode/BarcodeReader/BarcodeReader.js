import React from 'react';
import { ScanSettings, Barcode } from "scandit-sdk";
import BarcodePicker from "../BarcodePicker";


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
          onScan={scanResult => {
            document.getElementById("barcode").value = scanResult.barcodes.reduce(function(
              string,
              barcode
            ) {
              console.log(Barcode.Symbology.toHumanizedName(barcode.symbology) + ": " + barcode.data);
              return string + barcode.data;
            },
            "");
          }}
          onError={error => {
            console.error(error.message);
          }}
        />
      );
    }

  export default BarcodeReader;