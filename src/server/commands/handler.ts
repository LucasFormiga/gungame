import { scoreCommand } from "./score";

export const registerCommands = (): void => {
    RegisterCommand("score", scoreCommand, false);
};