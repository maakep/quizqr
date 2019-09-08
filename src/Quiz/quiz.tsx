import * as React from 'react';
import { BrowserQRCodeReader } from '@zxing/library';
import Spinner from './util/spinner';
import styles, * as style from '../styles';

export default (props: { team: string }) => {
    const [error, setError] = React.useState('');

    const scanner = new BrowserQRCodeReader(100);
    scanner.getVideoInputDevices().then(r => {
        if (r.length === 0)
            setError('No cameras found')

    })

    return error
        ?
        <div style={styles(style.center, style.error)}>
            {error}
        </div>
        :
        <Spinner style={style.center} />;
}