import { useState, useEffect, useCallback } from 'react';
import { Pedometer } from 'expo-sensors';
import * as Location from 'expo-location';
import { Linking, AppState } from 'react-native';

type PermissionStatus = 'granted' | 'denied' | 'undetermined';

interface UseActivityPermissionsOptions {
  pedometer?: boolean;
  location?: boolean;
}

// Helper to open app settings, will be used in components
export const openAppSettings = () => {
  Linking.openSettings();
};

export const useActivityPermissions = (options: UseActivityPermissionsOptions) => {
  const [status, setStatus] = useState<PermissionStatus>('undetermined');

  const checkPermissions = useCallback(async () => {
    const statuses: Location.PermissionStatus[] = [];

    if (options.pedometer) {
      const { status } = await Pedometer.getPermissionsAsync();
      statuses.push(status);
    }
    if (options.location) {
      const { status } = await Location.getForegroundPermissionsAsync();
      statuses.push(status);
    }

    if (statuses.length === 0) {
      setStatus('granted'); // No permissions requested, so we're good.
      return;
    }

    if (statuses.some(s => s === 'denied')) {
      setStatus('denied');
    } else if (statuses.every(s => s === 'granted')) {
      setStatus('granted');
    } else {
      setStatus('undetermined');
    }
  }, [options.pedometer, options.location]);

  useEffect(() => {
    checkPermissions();

    const subscription = AppState.addEventListener('change', (nextAppState) => {
        if (nextAppState === 'active') {
            checkPermissions();
        }
    });

    return () => {
        subscription.remove();
    };
  }, [checkPermissions]);

  const requestPermissionsAsync = async (): Promise<PermissionStatus> => {
    let allGranted = true;

    if (options.pedometer) {
      const { status } = await Pedometer.requestPermissionsAsync();
      if (status !== 'granted') allGranted = false;
    }

    if (options.location) {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') allGranted = false;
    }

    // After requesting, re-check the actual state from the system
    await checkPermissions();
    const finalStatus = allGranted ? 'granted' : 'denied';

    return finalStatus;
  };

  return { status, requestPermissionsAsync };
};
