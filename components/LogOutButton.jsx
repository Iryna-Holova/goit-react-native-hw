import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { colors } from "../styles/global";
import LogOutIcon from "../assets/icons/log-out.svg";

export default LogOutButton = () => {
  const navigation = useNavigation();

  const handleLogOut = () => {
    navigation.navigate("Login");
  };

  return (
    <TouchableOpacity onPress={handleLogOut} style={{ padding: 16 }}>
      <LogOutIcon width={24} height={24} fill={colors.text_gray} />
    </TouchableOpacity>
  );
};
