import { View, Text, StyleSheet, TextInput } from 'react-native'
const InputField = ({ lable, keyboardType, autoComplete, secureTextEntry=false, value, setValue }) => {
  return (
    <View>
          <Text style={styles.inputLabel}>{lable}</Text>
          <TextInput style={styles.inputBox}
              autoCorrect={false}
              keyboardType={keyboardType}
              autoComplete={autoComplete}
              secureTextEntry={secureTextEntry}
              value={value}
              onChangeText={(text) => setValue(prevState => ({
                ...prevState, [lable]: text
      }))}    />
    </View>
  )
}
export default InputField

const styles = StyleSheet.create({
    inputLabel: {
        textTransform: 'capitalize'
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
  