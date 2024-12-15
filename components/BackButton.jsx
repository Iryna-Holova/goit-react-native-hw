import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { colors } from "../styles/global";
import BackIcon from "../assets/icons/arrow-left.svg";

export default BackButton = ({ dark = false }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      style={{ padding: 16 }}
    >
      <BackIcon
        width={24}
        height={24}
        fill={dark ? colors.white : colors.black_transparent}
        stroke={dark ? colors.white : null}
      />
    </TouchableOpacity>
  );
};
