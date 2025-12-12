import svg from "@assets/waving-hand.svg";

export const HelloDialog = () => {
  return <div className="empty__dialog">
    <img src={svg} alt="hand" />
    <h2>
      Choose the dialog to chat with someone! Or try to find your new friend
      and send him a Message!
    </h2>
  </div>
}