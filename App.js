import React, { useState } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Sharing from "expo-sharing";

const App = () => {

  const [selectedImage, setSelectedImage] = useState(null);

  let openImagePickerAsync = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to galery is required");
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync();

    if (pickerResult.cancelled === true) {
      return;
    }

    setSelectedImage({localUri: pickerResult.uri})

  };

  let openShareDialog = async () => {
    if (!(await Sharing.isAvailableAsync())) {
      alert(
        `The image share is available for sharing at: ${selectedImage.remoteUri}`
      );
      return;
    }

    await Sharing.shareAsync(selectedImage.localUri);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Select a image from your galery!</Text>
      <TouchableOpacity onPress={openImagePickerAsync}>
        <Image
          source={{
            uri:
              selectedImage !== null
                ? selectedImage.localUri
                : "https://assets.webiconspng.com/uploads/2017/02/Photograph-Icon-PNG.png",
          }}
          style={styles.image}
        />
      </TouchableOpacity>
      {selectedImage ? (
        <TouchableOpacity onPress={openShareDialog} style={styles.button}>
          <Image
            style={styles.buttonImage}
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/61/61020.png",
            }}
          />
        </TouchableOpacity>
      ) : (
        <View></View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#69D9FF",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "black",
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
  },
  image: {
    height: 300,
    width: 300,
    borderRadius: 50,
    marginTop: 40,
    resizeMode:"contain"
  },
  buttonImage: {
    height: 100,
    width: 100,
    marginTop: 30,
  },
});

export default App;
