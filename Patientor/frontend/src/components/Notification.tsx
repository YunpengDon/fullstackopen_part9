export interface NotificationSchema {
  type: string;
  message: string;
}

import { Alert } from "@mui/material";

const Notification = ({
  notification,
}: {
  notification: NotificationSchema | null;
}) => {
  if (notification) {
    switch (notification.type) {
      case "success":
        return <Alert severity="success">{notification.message}</Alert>;
      case "error":
        return <Alert severity="error">{notification.message}</Alert>;
      default:
        break;
    }
  }
  return null;
};

export default Notification;
