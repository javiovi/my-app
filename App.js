import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Platform, Text, View, Button,SafeAreaView, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import Header from './src/components/Header';
import Timer  from './src/components/Timer';
import { Audio } from "expo-av";

const colors = ["#b7aea5","#f77014","#e33c08"]


export default function App() {

  const [IsWorking, setIsWorking] = useState(false);
  const [time, setTime] = useState(25 * 60);
  const [currentTime, setCurrentTime] = useState("GO" | "SHORT" | "BREAK");
  const [isActive, setIsActive] = useState(false);

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
    <TouchableOpacity onPress={handleStartStop} style={styles.button}>
      <Text style={{color: "white", fontWeight: "bold "}}>
      {isActive ? "STOP" : "START"} </Text>
    </TouchableOpacity>
  </View>
     </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
     },
  text: {
    fontSize: 32, fontWeight: "bold"},
    button: {
      alignItems: "center",
      backgroundColor: "#333333",
      padding: 15,
      marginTop: 15,
      borderRadius: 15,
    }
});
