import svg from "@assets/waving-hand.svg";

export const EmptyDialog = () => {
  return (
    <div className="empty__dialog empty__dialog-modified">
      <img src={svg} alt="hand" />
      <h2>Send me a message! :)</h2>
    </div>
  );
};
