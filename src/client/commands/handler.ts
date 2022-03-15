import { testCommand } from "./test";

export const registerCommands = (): void => {
    RegisterCommand("test", testCommand, false);
};
