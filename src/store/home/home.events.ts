import { ISocketMessage } from "@/types/Home.types";
import { createEvent } from "effector";

export const clearMessages = createEvent();
export const dialogLoaded = createEvent();
export const socketMessageReceived = createEvent<ISocketMessage>();
export const messageSentSwitcher = createEvent();