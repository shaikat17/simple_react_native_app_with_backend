import React, {useState, useEffect} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View, TextInput, ScrollView} from 'react-native';

const EditModal = ({ modalVisible, setModalVisible, post }) => {
    const [postInformation, setPostInformation] = useState({
        title: '',
        description: ''
    })

    useEffect(() => {
        setPostInformation(post)
    },[post])
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
                  <ScrollView>
                  <View style={styles.modalView}>
                      <Text style={styles.modalText}>Update Your Post</Text>
                      <Text style={styles.inputTitle}>Title: </Text>
                          <TextInput style={styles.inputBox} value={postInformation.title}
                      onChageText={text => setPostInformation(prevState => ({...prevState, title: text}))}    />
                      <Text style={styles.inputTitle}>Description:</Text>
                          <TextInput style={styles.inputBox}
                          onChangeText={text => setPostInformation(prevState => ({...prevState, description: text}))}
                          value={postInformation.description}
                          multiline={true}
                      numberOfLines={4} />
                      <View style={styles.buttonContainer}>
                          {/* for cancel */}
                      <Pressable
              style={[styles.button, { backgroundColor: '#fd1616' }]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Cancel</Text>
                          </Pressable>
                          {/* For update content */}
                          <Pressable
              style={[styles.button, { backgroundColor: 'green' }]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Update</Text>
            </Pressable>
            </View>
          </View>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
      elevation: 5,
    
  },
  button: {
    borderRadius: 5,
    padding: 10,
      elevation: 2,
      width: '40%',
    fontWeight: 'bold',
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 24,
    borderBottomColor: 'red',
    borderBottomWidth: 0.5,
    },
    inputTitle: {
        textTransform: 'capitalize',
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'left',
          marginBottom: 5,
        },
    inputBox: {
        backgroundColor: "#fff",
        marginBottom: 20,
        padding: 10,
        width: 280,
        fontSize: 18,
        borderColor: "red",
        borderWidth: 0.5,
        borderRadius: 5,
        fontWeight: "bold",
        textAlignVertical: "top",
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 10,
    }
});

export default EditModal;