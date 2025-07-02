import React from 'react';
import { View, StyleSheet, Image, Dimensions } from 'react-native';
import { Text, Button, Card } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const Home: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>👋 Welcome Back!</Text>
      <Text style={styles.subtitle}>Let’s track your wellness journey</Text>

      <Card style={styles.card}>
        <Button
          icon="silverware-fork-knife"
          mode="contained"
          onPress={() => navigation.navigate('FoodLogs')}
          style={styles.button}
          labelStyle={styles.buttonLabel}
          buttonColor="#FF8A65"
        >
          Food Logs
        </Button>

        <Button
          icon="run"
          mode="contained"
          onPress={() => navigation.navigate('Movements')}
          style={styles.button}
          labelStyle={styles.buttonLabel}
          buttonColor="#4DB6AC"
        >
          Movements
        </Button>

        <Button
          icon="chart-bar"
          mode="contained"
          onPress={() => navigation.navigate('Activity')}
          style={styles.button}
          labelStyle={styles.buttonLabel}
          buttonColor="#9575CD"
        >
          Activity
        </Button>
      </Card>

      {/* <Image
        source={{
          uri: 'https://cdn-icons-png.flaticon.com/512/4269/4269914.png',
        }}
        style={styles.image}
      /> */}
    </View>
  );
};

export default Home;

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF3E0',
    padding: 20,
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FF7043',
    textAlign: 'center',
    marginTop: 30,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
    marginTop: 6,
  },
  card: {
    padding: 20,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    elevation: 6,
  },
  button: {
    marginVertical: 10,
    borderRadius: 12,
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  image: {
    width: width * 0.5,
    height: width * 0.5,
    alignSelf: 'center',
    marginTop: 30,
    opacity: 0.8,
  },
});
