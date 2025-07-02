import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  ScrollView,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  InteractionManager,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeModules } from 'react-native';

const { WidgetUpdater } = NativeModules;

type FoodItem = {
  id: string;
  name: string;
};

const FoodLog = () => {
  const [food, setFood] = useState('');
  const [logs, setLogs] = useState<FoodItem[]>([]);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;

    AsyncStorage.getItem('foodLogs').then((stored) => {
      if (stored && mountedRef.current) {
        InteractionManager.runAfterInteractions(() => {
          setLogs(JSON.parse(stored));
        });
      }
    });

    return () => {
      mountedRef.current = false;
    };
  }, []);

  const addFood = async () => {
    if (!food.trim()) return;

    const newLog = { id: Date.now().toString(), name: food.trim() };
    const updatedLogs = [newLog, ...logs];

    Keyboard.dismiss();
    setFood('');

    await AsyncStorage.setItem('foodLogs', JSON.stringify(updatedLogs));
    await AsyncStorage.setItem('widget_type','food');
    WidgetUpdater.updateWidget(`Last Meal: ${newLog.name}`);

    if (mountedRef.current) {
      InteractionManager.runAfterInteractions(() => {
        setLogs(updatedLogs);
      });
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.scrollContent}>
        <Text style={styles.header}>🍱 Food Log</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter your meal..."
          value={food}
          onChangeText={setFood}
          placeholderTextColor="#999"
        />

        <View style={styles.buttonWrapper}>
          <Button title="Add Meal" onPress={addFood} disabled={!food.trim()} />
        </View>

        <View style={styles.divider} />

        <Text style={styles.subHeader}>📋 Meals Today</Text>

        {logs.length === 0 ? (
          <Text style={styles.emptyText}>No meals logged yet 🥗</Text>
        ) : (
          logs.map((item) => (
            <View key={item.id} style={styles.item}>
              <Text style={styles.itemText}>🍽 {item.name}</Text>
            </View>
          ))
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default FoodLog;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8F0',
    padding: 20,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FF7043',
    textAlign: 'center',
    marginBottom: 20,
  },
  subHeader: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
    marginBottom: 12,
  },
  buttonWrapper: {
    marginBottom: 16,
  },
  divider: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 16,
  },
  item: {
    backgroundColor: '#FFF3E0',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  itemText: {
    fontSize: 16,
    color: '#333',
  },
  emptyText: {
    fontStyle: 'italic',
    color: '#888',
    textAlign: 'center',
    marginTop: 16,
  },
});
