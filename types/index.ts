import { BrowserQRCodeReader } from '@zxing/library';

export type DeviceAndScanner = {
    scanner: BrowserQRCodeReader;
    deviceId: string;
}