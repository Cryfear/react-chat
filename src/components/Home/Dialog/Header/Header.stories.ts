// import { useUnit } from "effector-react";
// import { HeaderWrapper } from "./HeaderWrapper";
// import { HomeStore } from "../../Home.model";
// import { DialogsListStore } from "../../DialogsLIst/DialogsList.model";

// const meta = {
//     component: HeaderWrapper,
// }

// export default meta;

// export const HeaderDefault = {
//     args: {
//         isOnline: true,
//         userName: 'Arthur'
//     }
// }

// export const Header = () => {
//   const store = useUnit(HomeStore);
//   const dialogsListStore = useUnit(DialogsListStore);

//   const userName =
//     store.currentUser !== null || dialogsListStore.potentialDialog !== null
//       ? store.currentUser?.name || dialogsListStore.potentialDialog?.name
//       : "undefined";
//   const isOnline =
//     store?.currentUser?.isOnline || dialogsListStore?.potentialDialog?.isOnline
//       ? "online"
//       : "offline";

//   return (
//     <Header userName={userName} isOnline={isOnline} />
//   );
// };