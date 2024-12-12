import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { colors } from "../styles/global";
import BackIcon from "../assets/icons/arrow-left.svg";

export default BackButton = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      style={{ padding: 16 }}
    >
      <BackIcon width={24} height={24} fill={colors.black_transparent} />
    </TouchableOpacity>
  );
};
