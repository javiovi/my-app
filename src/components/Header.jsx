import { View, Text, TouchableOpacity, StyleSheet } from "react-native"


const options = [ "Go!","Short Break", "Long Break"];
export default function Header({currentTime, setCurrentTime, setTime }) {
    
    function handPress(index){
        const newTime = index === 0 ? 5 : index === 1 ? 1 : 10;
        setCurrentTime(index);
        setTime(newTime * 60);
    }
    
    return (
        <View style={ {flexDirection: "row"}}S>
        {options.map((item, index) => (
            <TouchableOpacity key={index} 
            onPress={() => handPress(index)}
             style={[styles.itemStyle,
             currentTime !== index &&{ borderColor: "transparent"},  ]}>
            <Text style={{ fontWeight: "bold" }}>{item}</Text>
            </TouchableOpacity>
       ))}
        </View>
    );
}

const styles = StyleSheet.create({
    itemStyle: {
        width: "33%",
        alignItems: "center",
        borderWidth: 3,
        padding: 5,
        borderRadius: 10,
        borderColor: "grey",
        marginVertical: 30,
    },
  
});