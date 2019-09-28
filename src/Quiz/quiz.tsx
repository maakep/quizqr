import * as React from 'react';
import { BrowserQRCodeReader } from '@zxing/library';
import { IQuiz } from './main';


type Props = { team: string, quiz: IQuiz };
export default class Bla extends React.PureComponent<Props, { text: string }> {
  scanner: BrowserQRCodeReader;

  constructor(props: Props) {
    super(props);
    this.scanner = new BrowserQRCodeReader();

    this.state = { text: 'nothing' }
  }

  decode = () => {
    this.scanner.decodeOnceFromVideoDevice(undefined, 'video').then((result) => {
      this.setState({ text: this.props.quiz.questions[parseInt(result.getText())].question });
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
          onTouchStart={() => this.decode()}
          onTouchEnd={() => {
            this.scanner.reset();
          }}
          id="video" width="100%" height="80%" autoPlay={false} style={{ border: '1px solid black' }}></video>
      </>
    );
  }
}