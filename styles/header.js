import { colors, text } from "./global";

export const headerStyles = {
  headerTitleAlign: "center",
  headerTitleStyle: { ...text.subtitle },
  headerShadowVisible: false,
  headerStyle: {
    backgroundColor: colors.white,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.gray_transparent,
  },
};
