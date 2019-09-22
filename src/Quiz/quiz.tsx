import * as React from 'react';
import { BrowserQRCodeReader } from '@zxing/library';
import styles, * as style from '../styles';
import { DeviceAndScanner } from "../../types";

export default (props: { team: string, deviceAndScanner: DeviceAndScanner }) => {
  const [error, setError] = React.useState('');
  const { scanner, deviceId } = props.deviceAndScanner;

  const decodeOnce = (codeReader: BrowserQRCodeReader, selectedDeviceId: string) => {
    codeReader.decodeFromInputVideoDevice(selectedDeviceId, 'video').then((result) => {
      setError(result.getText());
    }).catch((err: string) => {
      console.error(err)
      setError(err);
    })
  }


  const initScan = () => {
    decodeOnce(scanner, deviceId);
  }

  return error
    ?
    <div style={styles(style.center, style.error)}>
      {error}
    </div>
    :
    (
      <>
        <button onClick={() => initScan()}>init scan</button>
        <video
          onMouseDown={() => initScan()}
          onMouseUp={() => scanner.reset()}
          id="video" width="300" height="200" style={{ border: '1px solid black' }}></video>
      </>)
    ;
}
