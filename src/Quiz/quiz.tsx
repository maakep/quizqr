import * as React from 'react';
import { BrowserQRCodeReader } from '@zxing/library';
import styles, * as style from '../styles';

export default (props: { team: string }) => {
  const [error, setError] = React.useState('');

  const decodeOnce = (codeReader: BrowserQRCodeReader, selectedDeviceId: string) => {
    codeReader.decodeFromInputVideoDevice(selectedDeviceId, 'video').then((result) => {
      console.log(result)
      setError(result.getText());
    }).catch((err: string) => {
      console.error(err)
      setError(err);
    })
  }


  const initScan = () => {
    const scanner = new BrowserQRCodeReader();
    scanner.listVideoInputDevices().then(r => {
      if (r.length === 0) {
        setError('No cameras found');
        return;
      }

      decodeOnce(scanner, r[0].deviceId);
    }).catch(e => {
      setError("Error:" + e);
    });
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
        <video id="video" width="300" height="200" style={{ border: '1px solid black' }}></video>
        nav: {(navigator !== undefined) && <p>true</p>}
        devices: {(!!navigator.mediaDevices) && <p> true</p>}
        {!!(!!navigator.mediaDevices && navigator.mediaDevices.enumerateDevices)}
      </>)
    ;
}
