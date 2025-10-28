import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Pedometer } from 'expo-sensors';
import { useActivityPermissions } from '../lib/useActivityPermissions';

const DailyStepsWidget = () => {
  const { status, requestPermissionsAsync } = useActivityPermissions();
  const [stepCount, setStepCount] = useState(0);

  useEffect(() => {
    const fetchStepCount = async () => {
      if (status === 'granted') {
        const end = new Date();
        const start = new Date();
        start.setHours(0, 0, 0, 0); // Set to midnight

        try {
          const result = await Pedometer.getStepCountAsync(start, end);
          if (result) {
            setStepCount(result.steps);
          }
        } catch (error) {
          console.error("Failed to get step count:", error);
        }
      }
    };

    fetchStepCount();
    // Re-fetch every minute to update the count, as the component might stay mounted
    const interval = setInterval(fetchStepCount, 60000);

    return () => clearInterval(interval);
  }, [status]);

  const renderContent = () => {
    switch (status) {
      case 'granted':
        return <Text style={styles.text}>Сегодня пройдено: {stepCount} шагов</Text>;
      case 'denied':
        return (
          <View>
            <Text style={styles.text}>Permission to access activity data is denied.</Text>
            <Button title="Grant Permission" onPress={requestPermissionsAsync} />
          </View>
        );
      default:
        return (
           <View>
             <Text style={styles.text}>Requesting permissions...</Text>
             <Button title="Request Permissions" onPress={requestPermissionsAsync} />
           </View>
        );
    }
  };

  return <View style={styles.container}>{renderContent()}</View>;
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  text: {
    fontSize: 18,
    color: '#333',
  },
});

export default DailyStepsWidget;
