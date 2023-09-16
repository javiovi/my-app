import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Platform, Text, View, Button,SafeAreaView, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import Header from './src/components/Header';
import Timer  from './src/components/Timer';
import { Audio } from "expo-av";

const colors = ["#fbffdd","#e1f7c4","#c8eeac"]


export default function App() {

  const [IsWorking, setIsWorking] = useState(false);
  const [time, setTime] = useState(5 * 60);
  const [currentTime, setCurrentTime] = useState("GO" | "SHORT" | "BREAK");
  const [isActive, setIsActive] = useState(false);
  const [buttonColor, setButtonColor] = useState("#94dd7a");

  useEffect( () => {
    let interval = null;

     if(isActive){
      interval = setInterval(() => {
     setTime(time -1);
      }, 1000);

     }else{
      clearInterval(interval);}
      if (time === 0){
        setIsActive(false);
        setIsWorking(prev => !prev);
        setTime(IsWorking ? 300 : 1500);

      }
     return () => clearInterval(interval);

  }, [isActive, time]);

  function handleStartStop (){ 
    playSound();
    setIsActive(!isActive);
    setButtonColor(isActive ? "#94dd7a" : "red");
}

async function playSound(){
  const { sound } = await Audio.Sound.createAsync(
    require("./assets/campana-de-box.mp3")
  )
  await sound.playAsync();
}
 


  return (
    <SafeAreaView style={[styles.container,{ backgroundColor: colors[currentTime]}]}>
  <View style={{
    flex: 1, 
    paddingHorizontal: 15, paddingTop: Platform.OS === "android" && 30,
  }}>
  <Text style={styles.text}>TIMER</Text>
  
  <Header
   currentTime={currentTime}
   setCurrentTime={setCurrentTime}
    setTime={setTime}/>
    <Timer time={time}/>
    <TouchableOpacity onPress={handleStartStop} style={[styles.button, { backgroundColor: buttonColor} ]}>
      <Text style={{color:"white", fontWeight: "bold"}}>
      {isActive ? "STOP" : "START"} </Text>
    </TouchableOpacity>
  </View>
     </SafeAreaView>
  );
}

const styles = StyleSheet.create( {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 50,
    paddingHorizontal: 20,
    
   
  },
  text: {
    textAlign: 'center',
    fontSize: 36, 
    fontWeight: 'bold',
    color: '#333333', 
    marginBottom: 20, 
    paddingBottom: 20,
  },
  button: {
    alignItems: 'center', 
    paddingVertical: 15, 
    paddingHorizontal: 30,
    borderRadius: 25, 
    elevation: 3, 
    paddingBottom: 20,
   
    marginTop: 50,
  },
  buttonText: {
    color: 'white', 
    fontSize: 18, 
    fontWeight: 'bold'
  }
})
