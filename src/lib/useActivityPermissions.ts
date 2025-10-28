import { useState, useEffect } from 'react';
import { Pedometer } from 'expo-sensors';
import * as Location from 'expo-location';

type PermissionStatus = 'granted' | 'denied' | 'undetermined';

export const useActivityPermissions = () => {
  const [status, setStatus] = useState<PermissionStatus>('undetermined');

  const checkPermissions = async () => {
    const pedometerStatus = await Pedometer.getPermissionsAsync();
    const locationStatus = await Location.getForegroundPermissionsAsync();

    if (
      pedometerStatus.status === 'granted' &&
      locationStatus.status === 'granted'
    ) {
      setStatus('granted');
    } else {
        // If either is denied, we consider the overall status denied for our use case.
        // If one is granted and the other is undetermined, we still need to prompt.
        const isDenied = pedometerStatus.status === 'denied' || locationStatus.status === 'denied';
        setStatus(isDenied ? 'denied' : 'undetermined');
    }
  };

  useEffect(() => {
    checkPermissions();
  }, []);

  const requestPermissionsAsync = async (): Promise<PermissionStatus> => {
    const pedometerResponse = await Pedometer.requestPermissionsAsync();
    const locationResponse = await Location.requestForegroundPermissionsAsync();

    if (
      pedometerResponse.status === 'granted' &&
      locationResponse.status === 'granted'
    ) {
      setStatus('granted');
      return 'granted';
    } else {
      setStatus('denied');
      return 'denied';
    }
  };

  return { status, requestPermissionsAsync };
};
