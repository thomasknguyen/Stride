import { useMemo, useState } from "react";
import { PermissionsAndroid, Platform } from "react-native";
import {
  BleError,
  BleManager,
  Device,
} from "react-native-ble-plx";
import * as ExpoDevice from "expo-device";

const bleManager = new BleManager();

interface BluetoothLowEnergyApi {
  requestPermissions(): Promise<boolean>;
  scanForDevices: () => void;
  connectToDevice: (device: Device) => Promise<void>;
  disconnectFromDevice: () => void;
  connectedDevice: Device | null;
  allDevices: Device[];
}

function useBLE(): BluetoothLowEnergyApi {
  const [allDevices, setAllDevices] = useState<Device[]>([]);
  const [connectedDevice, setConnectedDevice] = useState<Device | null>(null);

  const requestAndroid31Permissions = async () => {
    const bluetoothScanPermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN
    );
    const bluetoothConnectPermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT
    );
    const fineLocationPermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );

    return (
      bluetoothScanPermission === PermissionsAndroid.RESULTS.GRANTED &&
      bluetoothConnectPermission === PermissionsAndroid.RESULTS.GRANTED &&
      fineLocationPermission === PermissionsAndroid.RESULTS.GRANTED
    );
  };

  const requestPermissions = async () => {
    if (Platform.OS === "android") {
      if ((ExpoDevice.platformApiLevel ?? -1) < 31) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } else {
        return await requestAndroid31Permissions();
      }
    }
    return true;
  };

  const isDuplicateDevice = (devices: Device[], nextDevice: Device) =>
    devices.some((device) => nextDevice.id === device.id);

  const scanForDevices = async () => {
    const isGranted = await requestPermissions();
    if (!isGranted) return;

    bleManager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        console.error("Scan Error:", error);
        return;
      }
      if (device?.name) {
        setAllDevices((prevDevices) => {
          if (!isDuplicateDevice(prevDevices, device)) {
            return [...prevDevices, device];
          }
          return prevDevices;
        });
      }
    });

    setTimeout(() => {
      bleManager.stopDeviceScan();
    }, 10000);
  };

  const connectToDevice = async (device: Device) => {
    try {
      const deviceConnection = await bleManager.connectToDevice(device.id);
      setConnectedDevice(deviceConnection);
      await deviceConnection.discoverAllServicesAndCharacteristics();
      bleManager.stopDeviceScan();
    } catch (error) {
      console.error("Failed to connect:", error);
    }
  };

  const disconnectFromDevice = () => {
    if (connectedDevice) {
      bleManager.cancelDeviceConnection(connectedDevice.id);
      setConnectedDevice(null);
    }
  };

  return {
    scanForDevices,
    requestPermissions,
    connectToDevice,
    disconnectFromDevice,
    allDevices,
    connectedDevice,
  };
}

export default useBLE;
