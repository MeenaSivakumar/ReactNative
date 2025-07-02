import React, { useState } from 'react';
import {  StyleSheet, ScrollView, Keyboard } from 'react-native';
import { Text, TextInput, Button, Snackbar, Card, } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeModules } from 'react-native';

const { WidgetUpdater } = NativeModules;

const Activity = () => {
  const [activity, setActivity] = useState('');
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  const logActivity = async () => {
    if (!activity.trim()) return;

    const logMessage = `Activity: ${activity}`;
    await AsyncStorage.setItem('lastActivity', activity);
    await AsyncStorage.setItem('widget_text', logMessage); // ✅ Required by widget
    await AsyncStorage.setItem('widget_type', 'activity'); // ✅ Set widget type
    WidgetUpdater.updateWidget(logMessage);

    setActivity('');
    setSnackbarVisible(true);
    Keyboard.dismiss();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🏃‍♂️ Activity Tracker</Text>

      <Card style={styles.card}>
        <Card.Content>
          <TextInput
            label="What did you do?"
            value={activity}
            mode="outlined"
            onChangeText={setActivity}
            style={styles.input}
          />
          <Button
            mode="contained"
            onPress={logActivity}
            disabled={!activity.trim()}
            style={styles.button}
            buttonColor="#43A047"
          >
            Log Activity
          </Button>
        </Card.Content>
      </Card>

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={2000}
        style={styles.snackbar}
      >
        Activity logged! 💪
      </Snackbar>
    </ScrollView>
  );
};

export default Activity;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#2E7D32',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    elevation: 4,
  },
  input: {
    marginBottom: 16,
    backgroundColor: 'white',
  },
  button: {
    borderRadius: 10,
    paddingVertical: 8,
  },
  snackbar: {
    backgroundColor: '#43A047',
  },
});
