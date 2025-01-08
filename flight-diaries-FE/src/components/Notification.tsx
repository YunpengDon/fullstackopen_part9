const Notification = ({ notification }: { notification: string }) => {
  if (notification) {
    return <div style={{ color: "red" }}>{notification}</div>;
  }
  return null;
};

export default Notification;
