import { format } from "date-fns";
import { uk } from "date-fns/locale";

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return format(date, "dd MMMM, yyyy | HH:mm", { locale: uk });
};
