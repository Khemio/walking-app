import { Pedometer } from 'expo-sensors';
import { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { openAppSettings, useActivityPermissions } from '../lib/useActivityPermissions';

//TODO: Style adjustments
const DailyStepsWidget = () => {
  // Now we specify that this component ONLY needs the pedometer permission.
  const { status, requestPermissionsAsync } = useActivityPermissions({ pedometer: true });
  const [stepCount, setStepCount] = useState(0);

  useEffect(() => {
    const fetchStepCount = async () => {
      if (status === 'granted') {
        const end = new Date();
        const start = new Date();
        start.setHours(0, 0, 0, 0); // Midnight

        try {
          const result = await Pedometer.getStepCountAsync(start, end);
          setStepCount(result.steps);
        } catch (error) {
          console.error("Failed to get step count:", error);
        }
      }
    };

    fetchStepCount();
    const interval = setInterval(fetchStepCount, 60000);

    return () => clearInterval(interval);
  }, [status]);

  const handlePermissionRequest = () => {
      if (status === 'denied') {
          // If denied, the prompt won't show again. Guide user to settings.
          openAppSettings();
      } else {
          requestPermissionsAsync();
      }
  }

  const renderContent = () => {
    switch (status) {
      case 'granted':
        // return <Text style={styles.text}>Сегодня пройдено: {stepCount} шагов</Text>;
        return <Text style={styles.text}>Walked today: {stepCount} steps</Text>;
      case 'denied':
        return (
          <View style={styles.centered}>
            <Text style={styles.text}>Permission to access activity data is denied.</Text>
            <Text style={styles.subText}>Please enable it in your settings.</Text>
            <Button title="Open Settings" onPress={handlePermissionRequest} />
          </View>
        );
      default: // undetermined
        return (
           <View style={styles.centered}>
             <Text style={styles.text}>Track your daily steps</Text>
             <Button title="Grant Permission" onPress={handlePermissionRequest} />
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
    marginVertical: 10,
    width: '90%',
  },
  centered: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
  },
  subText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 10,
  }
});

export default DailyStepsWidget;