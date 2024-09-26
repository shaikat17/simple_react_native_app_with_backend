import { StyleSheet, Text, TouchableOpacity } from "react-native";
const SubmitButton = ({ btnTitle, handleSubmit, loading }) => {
  return (
    <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
      <Text style={styles.btnText}>{loading ? "Please Wait" : btnTitle}</Text>
    </TouchableOpacity>
  );
};
export default SubmitButton;

const styles = StyleSheet.create({
  submitBtn: {
    backgroundColor: "#1e2225",
    height: 50,
    marginHorizontal: 25,
    borderRadius: 10,
    justifyContent: "center",
    marginBottom: 20,
  },
  btnText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 24,
    fontWeight: "400",
  },
});
