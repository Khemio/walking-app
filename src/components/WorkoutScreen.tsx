import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Button, StyleSheet, SafeAreaView } from 'react-native';
import { Pedometer } from 'expo-sensors';
import * as Location from 'expo-location';
import { useActivityPermissions } from '../lib/useActivityPermissions';

// Helper function to calculate distance between two coordinates (Haversine formula)
const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371e3; // metres
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // in metres
};

const WorkoutScreen = () => {
  const { status, requestPermissionsAsync } = useActivityPermissions();

  const [isTracking, setIsTracking] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);

  const initialSteps = useRef(0);
  const [sessionSteps, setSessionSteps] = useState(0);
  const [sessionDistance, setSessionDistance] = useState(0);

  const [stepSubscription, setStepSubscription] = useState<Pedometer.Subscription | null>(null);
  const [locationSubscription, setLocationSubscription] = useState<Location.LocationSubscription | null>(null);

  const lastLocation = useRef<Location.LocationObject | null>(null);

  // Timer effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isTracking && startTime) {
      timer = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isTracking, startTime]);

  const startWorkout = async () => {
    if (status !== 'granted') {
      const newStatus = await requestPermissionsAsync();
      if (newStatus !== 'granted') {
        alert("Permissions are required to start a workout.");
        return;
      }
    }

    setIsTracking(true);
    setStartTime(Date.now());
    setElapsedTime(0);
    setSessionSteps(0);
    setSessionDistance(0);
    lastLocation.current = null;

    // 1. Get initial step count
    const end = new Date();
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const pastStepCount = await Pedometer.getStepCountAsync(start, end);
    initialSteps.current = pastStepCount.steps;

    // 2. Subscribe to step updates
    const stepSub = Pedometer.watchStepCount(result => {
        setSessionSteps(result.steps - initialSteps.current);
    });
    setStepSubscription(stepSub);

    // 3. Subscribe to location updates
    const locSub = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.High,
        timeInterval: 1000, // 1 second
        distanceInterval: 10, // 10 meters
      },
      (location) => {
        if (lastLocation.current) {
          const distance = calculateDistance(
            lastLocation.current.coords.latitude,
            lastLocation.current.coords.longitude,
            location.coords.latitude,
            location.coords.longitude
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
    setStepSubscription(null);

    locationSubscription?.remove();
    setLocationSubscription(null);

    // Optional: Save workout data here
    console.log(`Workout finished:
      Time: ${elapsedTime}s
      Steps: ${sessionSteps}
      Distance: ${sessionDistance.toFixed(2)}m
    `);
  };

  const formatTime = (seconds: number) => {
      const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
      const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
      const s = (seconds % 60).toString().padStart(2, '0');
      return `${h}:${m}:${s}`;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Workout Tracker</Text>

      {isTracking ? (
        <View style={styles.metricsContainer}>
            <Text style={styles.metricText}>Время: {formatTime(elapsedTime)}</Text>
            <Text style={styles.metricText}>Шаги: {sessionSteps}</Text>
            <Text style={styles.metricText}>Дистанция: {(sessionDistance / 1000).toFixed(2)} km</Text>
        </View>
      ) : (
         <View style={styles.metricsContainer}>
            <Text style={styles.metricText}>Начните новую тренировку</Text>
         </View>
      )}

      <Button
        title={isTracking ? "Завершить тренировку" : "Начать тренировку"}
        onPress={isTracking ? stopWorkout : startWorkout}
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
  },
  title: {
      fontSize: 32,
      fontWeight: 'bold',
  },
  metricsContainer: {
    alignItems: 'center',
    marginVertical: 30,
  },
  metricText: {
    fontSize: 24,
    marginVertical: 10,
  },
});

export default WorkoutScreen;
