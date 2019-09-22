import * as React from 'react';
import styles, * as style from '../styles';
import Quiz from './quiz';
import { BrowserQRCodeReader } from '@zxing/library';
import { DeviceAndScanner } from '../../types';


const TEAM_NAME = 'TEAM_NAME';

export default (): JSX.Element => {
  const [input, setInput] = React.useState<string>('');
  const [error, setError] = React.useState<string>('');
  const [cameraError, setCameraError] = React.useState<string>('');
  const [team, setTeam] = React.useState<string>(localStorage.getItem(TEAM_NAME) || '');
  const [cam, setCam] = React.useState<DeviceAndScanner>();

  const submit = () => {
    if (input.length > 3) {
      localStorage.setItem(TEAM_NAME, input);
      setTeam(input);
    }
    else {
      setError('Minimum 4 characters');
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.currentTarget.value);
    setError('');
  }

  const noTeamSelected = () => {
    return (
      <>
        <div style={style.center}>
          <input
            autoFocus
            style={style.input}
            type="text"
            onChange={handleChange}
            placeholder={"Enter your team name"}
          />
          <button style={style.button} onClick={() => submit()}>Go</button>
        </div>
        <div style={styles(style.center, style.error, style.text)}>
          {error}
        </div>
      </>
    );
  };

  const noCameraFound = () => {
    return (
      <div style={styles(style.center)}>
        <span>
          {cameraError}
        </span>
      </div>
    );
  }

  // TODO: How to call this without infinite loops
  const getCamera = async (): Promise<DeviceAndScanner> => {
    const scanner = new BrowserQRCodeReader();
    const devices = await scanner.listVideoInputDevices();
    if (devices.length === 0) {
      setCameraError('No cameras found');
      return;
    }
    console.log(devices.length);
    return { scanner: scanner, deviceId: devices[devices.length - 1].deviceId } as DeviceAndScanner;
  }



  if (team === '') {
    return noTeamSelected();
  } else if (team !== '' && cam === undefined || !cam.deviceId.length) {
    return noCameraFound();
  } else {
    return (
      <Quiz
        team={team}
        deviceAndScanner={cam}
      />
    )
  }
}




