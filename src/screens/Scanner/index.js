import React, {useState, useRef, useEffect} from 'react';
import {
  ActivityIndicator,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Text,
  Button,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faRedo} from '@fortawesome/free-solid-svg-icons'; // Import the redo icon
import AppLayout from '../../layouts/AppLayout';
import {Camera} from 'react-native-vision-camera';
import styles from './styles';
import ScanResultView from '../../components/ScanResultView';
import {COLORS} from '../../constants';
import {useNavigation} from '@react-navigation/native';
import {extractUsefulData, fetchFoodSuggestions} from '../../api/foodApi';
import {useCameraDevices} from 'react-native-vision-camera';
import {NativeModules} from 'react-native';


const testDectionData = {
  confidence: 95.7,
  image:
    'file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252Fnourish-ai-300bda4c-9066-4e65-a0a0-10784dca77a7/Camera/c4638f30-70ac-4b2d-b54f-6c9f3afcba49.jpg',
  name: 'Burger',
  nutrition: {
    calories: 354,
    carbohydrates: '32g',
    fats: '17g',
    proteins: '19g',
  },
};

const Scanner = () => {
  const navigation = useNavigation();
  const [hasPermission, setHasPermission] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [detectedFood, setDetectedFood] = useState(null);
  // const [detectedFood, setDetectedFood] = useState(testDectionData);
  const cameraRef = useRef(null);
  const {MobileNetModule} = NativeModules;

  const devices = useCameraDevices();
  const device = devices.back;

  useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const detectFood = async () => {
    if (cameraRef.current) {
      try {
        const options = {quality: 0.5, base64: true};

        const pic = await cameraRef.current.takePhoto({
          enableShutterSound: false,
          flash: 'off',
          qualityPrioritization: 'speed',
        });
        const picPath = pic.path;
        const picURI = `file://${picPath}`; // Convert to URI
        console.log('Converted URI:', picURI);

        console.log("Captured image", pic);
        const prediction = await MobileNetModule.predict(picPath);
        console.log('Prediction: ', prediction);
        const { label, confidence } = prediction;

        let foodData = null;
        try {
          foodData = (await fetchFoodSuggestions(label))[0];
          foodData = extractUsefulData(foodData);
        } catch (error) {
          console.error('Error: ' + error);
          return;
        }
        foodData = {
          ...foodData,
          imageURI: picURI,
        };

        console.log('foodData', foodData);
        setDetectedFood(foodData);
      } catch (e) {
        console.error('Error predicting:', e);
      }
    }
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  if (!device) {
    return <Text>Loading device</Text>;
  }


  return (
    <AppLayout statusBarColor={COLORS.orange}>
      <View style={{flex: 1}}>
        {detectedFood ? (
          <ScanResultView
            data={detectedFood}
            onRetake={() => setDetectedFood(null)}
            onAdd={() => {
              navigation.navigate('Food', {scannedFood: detectedFood});
            }}
          />
        ) : (
          <View style={styles.cameraContainer}>
            <Camera
              style={{flex: 1}}
              ref={cameraRef}
              device={device}
              isActive={true}
              photo={true}
              orientation='portrait'
              ></Camera>
            <View style={styles.container}>
              <ButtonContainer onPress={detectFood} isLoading={isLoading} />
            </View>
          </View>
        )}
      </View>
    </AppLayout>
  );
};

const ButtonContainer = ({onPress, isLoading}) => (
  <View style={styles.buttonContainer}>
    {isLoading ? (
      <ActivityIndicator size="large" color="orange" />
    ) : (
      <TouchableOpacity style={styles.captureButton} onPress={onPress}>
        <View style={styles.innerCircle} />
      </TouchableOpacity>
    )}
  </View>
);

export default Scanner;
