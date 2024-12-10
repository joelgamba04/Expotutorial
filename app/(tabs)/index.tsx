import { View, StyleSheet } from "react-native";
import { useState } from "react";
import { type ImageSource } from "expo-image";
import * as ImagePicker from "expo-image-picker";

import ImageViewer from "@/components/ImageViewer";
import Button from "@/components/Button";
import CircleButton from "@/components/CircleButton";
import IconButton from "@/components/IconButton";
import EmojiPicker from "@/components/EmojiPicker";
import EmojiList from "@/components/EmojiList";
import EmojiSticker from "@/components/EmojiSticker";

const PlaceholderImage = require("@/assets/images/background-image.png");

const Index = () => {
  const [selectedImage, setSelectedImage] = useState<string | undefined>(
    undefined
  );

  const [showAppOptions, setShowAppOptions] = useState(false);
  const [isEmojiPickerVisible, setIsEmojiPickerVisible] = useState(false);
  const [pickedEmoji, setPickedEmoji] = useState<ImageSource | undefined>(
    undefined
  );

  const pickImageAsync = async () => {
    console.log("Index: pickImageAsync start");

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      console.log(result);
      setSelectedImage(result.assets[0].uri);
      setShowAppOptions(true);
    } else {
      alert("You did not select any image.");
    }
  };

  const onReset = () => {
    setSelectedImage(undefined);
    setShowAppOptions(false);
  };

  const onAddSticker = () => {
    console.log("Index: addSticker");
    setIsEmojiPickerVisible(true);
  };

  const onCloseEmojiPicker = () => {
    setIsEmojiPickerVisible(false);
  };

  const onSaveImageAsync = async () => {
    console.log("Index: onSaveImageAsync");
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer
          imgSource={PlaceholderImage}
          selectedImage={selectedImage}
        />
        {pickedEmoji && (
          <EmojiSticker imageSize={40} stickerSource={pickedEmoji} />
        )}
      </View>
      {showAppOptions ? (
        <View style={styles.optionsContainer}>
          <View style={styles.optionsRow}>
            <IconButton icon="refresh" label="Reset" onPress={onReset} />
            <CircleButton onPress={onAddSticker} />
            <IconButton
              icon="save-alt"
              label="Save"
              onPress={onSaveImageAsync}
            />
          </View>
        </View>
      ) : (
        <View style={styles.footerContainer}>
          <Button
            label="Choose a photo"
            theme="primary"
            onClickPress={pickImageAsync}
          />
          <Button
            label="Use this photo"
            onClickPress={() => setShowAppOptions(true)}
          />
        </View>
      )}
      <EmojiPicker
        isVisible={isEmojiPickerVisible}
        onClose={() => {
          onCloseEmojiPicker();
        }}
      >
        <EmojiList
          onSelect={setPickedEmoji}
          onCloseModal={onCloseEmojiPicker}
        />
      </EmojiPicker>
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
  },
  imageContainer: {
    flex: 1,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: "center",
  },
  optionsContainer: {
    position: "absolute",
    bottom: 80,
  },
  optionsRow: {
    alignItems: "center",
    flexDirection: "row",
  },
});
