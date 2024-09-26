import { View, Text, StyleSheet, TextInput } from 'react-native'
const InputField = ({ lable, keyboardType, autoComplete, secureTextEntry=false, value, setValue, editable=true, customStyles }) => {
  return (
    <View>
          <Text style={styles.inputLabel}>{lable}</Text>
          <TextInput style={[styles.inputBox, customStyles]}
              autoCorrect={false}
              keyboardType={keyboardType}
              autoComplete={autoComplete}
              secureTextEntry={secureTextEntry}
        value={value}
        editable={editable}
              onChangeText={(text) => setValue(prevState => ({
                ...prevState, [lable]: text
      }))}    />
    </View>
  )
}
export default InputField

const styles = StyleSheet.create({
    inputLabel: {
    textTransform: 'capitalize',
    fontWeight: 'bold',
      fontSize: 18,
    },
    inputBox: {
      height: 40,
      marginBottom: 20,
      backgroundColor: "#fff",
      borderRadius: 10,
      marginTop: 10,
      paddingLeft: 10,
      color: "#af9f85",
    },
  });
  