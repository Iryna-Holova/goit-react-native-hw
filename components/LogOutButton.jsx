import { useState } from "react";
import { useDispatch } from "react-redux";
import { ActivityIndicator, TouchableOpacity } from "react-native";

import { logoutDB } from "../services/auth";
import { colors } from "../styles/global";
import LogOutIcon from "../assets/icons/log-out.svg";

export default LogOutButton = () => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const handleLogOut = async () => {
    try {
      setLoading(true);
      await logoutDB(dispatch);
    } catch (error) {
      console.error("Logout error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableOpacity
      disabled={loading}
      onPress={handleLogOut}
      style={{ padding: 16 }}
    >
      {loading ? (
        <ActivityIndicator size="small" color={colors.text_gray} />
      ) : (
        <LogOutIcon width={24} height={24} fill={colors.text_gray} />
      )}
    </TouchableOpacity>
  );
};
