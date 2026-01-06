import * as Location from 'expo-location';
import { Pedometer } from 'expo-sensors';
import { useEffect, useRef, useState } from 'react';
import { Alert, Button, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { openAppSettings, useActivityPermissions } from '../lib/useActivityPermissions';

const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371e3; // metres
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;
  const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const WorkoutScreen = () => {
  // This component needs both pedometer and location permissions.
  const { status, requestPermissionsAsync } = useActivityPermissions({ pedometer: true, location: true });

  const [isTracking, setIsTracking] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);

  const initialSteps = useRef(0);
  const [sessionSteps, setSessionSteps] = useState(0);
  const [sessionDistance, setSessionDistance] = useState(0);

  const [stepSubscription, setStepSubscription] = useState<Pedometer.Subscription | null>(null);
  const [locationSubscription, setLocationSubscription] = useState<Location.LocationSubscription | null>(null);

  const lastLocation = useRef<Location.LocationObject | null>(null);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isTracking && startTime) {
      timer = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isTracking, startTime]);

  const handleStartWorkout = async () => {
    if (status !== 'granted') {
      if (status === 'denied') {
        Alert.alert(
          "Permissions Required",
          "To track a workout, we need access to your activity and location data. Please enable these in your settings.",
          [
            { text: "Cancel", style: "cancel" },
            { text: "Open Settings", onPress: () => openAppSettings() }
          ]
        );
      } else {
        await requestPermissionsAsync();
      }
      return;
    }

    setIsTracking(true);
    setStartTime(Date.now());
    setElapsedTime(0);
    setSessionSteps(0);
    setSessionDistance(0);
    lastLocation.current = null;

    const end = new Date();
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const pastStepCount = await Pedometer.getStepCountAsync(start, end);
    initialSteps.current = pastStepCount.steps;

    const stepSub = Pedometer.watchStepCount(result => {
        setSessionSteps(result.steps - initialSteps.current);
    });
    setStepSubscription(stepSub);

    const locSub = await Location.watchPositionAsync(
      { accuracy: Location.Accuracy.High, timeInterval: 1000, distanceInterval: 10 },
      (location) => {
        if (lastLocation.current) {
          const distance = calculateDistance(
            lastLocation.current.coords.latitude, lastLocation.current.coords.longitude,
            location.coords.latitude, location.coords.longitude
          );
          setSessionDistance((prev) => prev + distance);
        }
        lastLocation.current = location;
      }
    );
    setLocationSubscription(locSub);
  };

  const stopWorkout = () => {
    setIsTracking(false);
    setStartTime(null);
    stepSubscription?.remove();
    locationSubscription?.remove();
  };

  const formatTime = (seconds: number) => {
      const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
      const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
      const s = (seconds % 60).toString().padStart(2, '0');
      return `${h}:${m}:${s}`;
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* <Text style={styles.title}>Workout Tracker</Text> */}

      {isTracking ? (
        <View style={styles.metricsContainer}>
            <Text style={styles.metricText}>Time: {formatTime(elapsedTime)}</Text>
            <Text style={styles.metricText}>Steps: {sessionSteps}</Text>
            <Text style={styles.metricText}>Distance: {(sessionDistance / 1000).toFixed(2)} km</Text>
        </View>
      ) : (
         <View style={styles.metricsContainer}>
            <Text style={styles.metricText}>Start new training</Text>
            {status !== 'granted' && (
                <Text style={styles.permissionWarning}>Permissions are required</Text>
            )}
         </View>
      )}

      <Button
        title={isTracking ? "End training" : "Start training"}
        onPress={isTracking ? stopWorkout : handleStartWorkout}
        color={isTracking ? "red" : "green"}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 20,
    width: '100%',
  },
  title: {
      fontSize: 32,
      color: 'white',
      fontWeight: 'bold',
  },
  metricsContainer: {
    alignItems: 'center',
    marginVertical: 30,
  },
  metricText: {
    fontSize: 24,
    marginVertical: 10,
    color: 'white',
  },
  permissionWarning: {
      fontSize: 14,
      color: 'orange',
      marginTop: 10,
  }
});

export default WorkoutScreen;