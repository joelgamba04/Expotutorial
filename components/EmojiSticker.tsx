import { View } from "react-native";
import { Image, type ImageSource } from "expo-image";

type Props = {
  imageSize: number;
  stickerSource: ImageSource;
};
const EmojiSticker = ({ imageSize, stickerSource }: Props) => {
  return (
    <View style={{ top: -350 }}>
      <Image
        source={stickerSource}
        style={{ width: imageSize, height: imageSize }}
      />
    </View>
  );
};

export default EmojiSticker;
