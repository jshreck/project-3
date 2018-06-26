import React, { Component } from "react";
import PropTypes from "prop-types";
import { configure, BarcodePicker as ScanditSDKBarcodePicker } from "scandit-sdk";

// Configure the library and activate it with a license key
configure("AcjrSiU3Ofv/Qs9aNjzKefEY0SQUD2S2LmUrOV9/ivDQcV4J0wLrOxNw6LB+W0eUK1Td/ONjvKYWCvCIEm5SzsB1r8FcMIFVWWlDwMt5ylPgVrKuQ2DyR2kjCTgZ9PP70jt1kHwzpveNDv8vKzulzF8vaBV0HAG9ciifpRcxBnTooflxfWxaZ0l1EEfG5Kz3KFjC9sXW5FIWZ05a+e+R40WPkWGOOmXldd8dp8lhYwdydy76tdh8Z8Af5x+BjoY4ZXckYiI2vpQMPfj/VUTG5oT7hIaquIb/o+XdtHZ/SEwxRChH18IptZnnIh2D/shh3qFyEIAmzVLiQYiCJ8IwLFky+eoXYYGJcMsP3uRmVEmS2LnhItAabRosHO5XJv7vgeevoudQPLbWSSEH8Q6kfnxINMyx/O9DTbSgSQ70mIzj/WQDQdh8dW6HZ0OMoxmPyJxFKwJhiO1GexrSGq5MIzHbqkDkwG3feBq0g10Y0JrV/DGBQ5c/91tK/SEYvG0u69mlGnASp+2dtaDaxi1C++JLWTkCtxQVz69XAVrLBEUjpp2yDrIlaSfJckNJ8ZLnSgUlKntWRcu5r5wwa6OdTNrYCPfndpBpD+vXQR4UK/556fex+apIpnmDz+GtOGP8d0Q8juFANsHXNWP4ov2K1C38CFEV4EsenaknhfP3jnO9GD1YIz9loPk/cp1gS/1xPiID7p0ermijh2vTnU2vJeWLZN6zvgc3MryMtS4jx0UBavlpWZzWjvUrDpxLrsHPQH9Azj58z5bMlIsMAkPo8bdKX4HB9PKQQETRBw==", {engineLocation: "./"}).catch(error => {
  alert(error);
});

const style = {
  position: "absolute",
  top: "0",
  bottom: "0",
  left: "0",
  right: "0",
  margin: "auto",
  maxWidth: "1280px",
  maxHeight: "80%"
};

class BarcodePicker extends Component {
  static propTypes = {
    visible: PropTypes.bool,
    playSoundOnScan: PropTypes.bool,
    vibrateOnScan: PropTypes.bool,
    scanningPaused: PropTypes.bool,
    guiStyle: PropTypes.string,
    videoFit: PropTypes.string,
    scanSettings: PropTypes.object,
    enableCameraSwitcher: PropTypes.bool,
    enableTorchToggle: PropTypes.bool,
    enableTapToFocus: PropTypes.bool,
    enablePinchToZoom: PropTypes.bool,
    accessCamera: PropTypes.bool,
    camera: PropTypes.object,
    cameraSettings: PropTypes.object,
    targetScanningFPS: PropTypes.number,
    onScan: PropTypes.func,
    onError: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }

  componentDidMount() {
    ScanditSDKBarcodePicker.create(this.ref.current, this.props).then(barcodePicker => {
      this.barcodePicker = barcodePicker;
      if (this.props.onScan != null) {
        barcodePicker.onScan(this.props.onScan);
      }
      if (this.props.onError != null) {
        barcodePicker.onScanError(this.props.onError);
      }
    });
  }

  componentWillUnmount() {
    if (this.barcodePicker != null) {
      this.barcodePicker.destroy();
    }
  }

  componentDidUpdate(prevProps) {
    // These are just some examples of how to react to some possible property changes

    if (JSON.stringify(prevProps.scanSettings) !== JSON.stringify(this.props.scanSettings)) {
      this.barcodePicker.applyScanSettings(this.props.scanSettings);
    }

    if (prevProps.visible !== this.props.visible) {
      this.barcodePicker.setVisible(this.props.visible);
    }
  }

  render() {
    return <div ref={this.ref} style={style} />;
  }
}

export default BarcodePicker;
