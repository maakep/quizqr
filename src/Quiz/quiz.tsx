import * as React from 'react';
import { BrowserQRCodeReader } from '@zxing/library';


type Props = { team: string };
export default class Bla extends React.PureComponent<Props, { text: string }> {
  scanner: BrowserQRCodeReader;

  constructor(props: Props) {
    super(props);
    this.scanner = new BrowserQRCodeReader();

    this.state = { text: 'nothing' }
  }

  decode = () => {
    this.scanner.decodeOnceFromVideoDevice(undefined, 'video').then((result) => {
      this.setState({ text: result.getText() });
    }).catch((err: string) => {
      console.warn(err);
    }).finally(() => {
      this.scanner.reset();
    });
  }

  render() {
    return (
      <>
        <p>
          {this.state.text}
        </p>
        <video
          onMouseDown={() => this.decode()}
          onMouseUp={() => {
          }}
          id="video" width="100%" height="80%" autoPlay={false} style={{ border: '1px solid black' }}></video>
      </>
    );
  }
}