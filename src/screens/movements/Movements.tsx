import React, { useState } from 'react';
import {  StyleSheet, ScrollView, Keyboard } from 'react-native';
import { Text, TextInput, Button, Snackbar, Card } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeModules } from 'react-native';

const { WidgetUpdater } = NativeModules;

const Movements = () => {
  const [exercise, setExercise] = useState('');
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  const logMovement = async () => {
    if (!exercise.trim()) return;

    const message = `Last Movement: ${exercise}`;
    await AsyncStorage.setItem('lastMovement', exercise);
    await AsyncStorage.setItem('widget_text', message);
    await AsyncStorage.setItem('widget_type', 'movement'); // ✅ Set widget type
    WidgetUpdater.updateWidget(message);

    setExercise('');
    setSnackbarVisible(true);
    Keyboard.dismiss();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>💪 Movements Log</Text>

      <Card style={styles.card}>
        <Card.Content>
          <TextInput
            label="Enter completed movement"
            value={exercise}
            onChangeText={setExercise}
            mode="outlined"
            style={styles.input}
          />
          <Button
            mode="contained"
            onPress={logMovement}
            disabled={!exercise.trim()}
            style={styles.button}
            buttonColor="#1E88E5"
          >
            Log Movement
          </Button>
        </Card.Content>
      </Card>

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={2000}
        style={styles.snackbar}
      >
        Movement logged! 🏋️
      </Snackbar>
    </ScrollView>
  );
};

export default Movements;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#1565C0',
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
    backgroundColor: '#1E88E5',
  },
});
