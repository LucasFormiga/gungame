import { Gamers } from "..";
import { getSteamIdentifier } from "../../shared/utils/identifier";

export const scoreCommand = (source: number, args: Array<any>): void => {
    if (args.length < 1) {
        emitNet("chat:addMessage", source, {
            color: [255, 0, 0],
            multiline: true,
            args: ["Gun Game", "Please, you need to specify a player ID."]
        });

        return;
    }

    const identifiers = getPlayerIdentifiers(args[0]);
    const identifier: string = getSteamIdentifier(identifiers);
    const player = Gamers.get(identifier);

    if (!player) {
        emitNet("chat:addMessage", source, {
            color: [255, 0, 0],
            multiline: true,
            args: ["Gun Game", "It looks like this player doesn't exists."]
        });

        return;
    }

    emitNet("chat:addMessage", source, {
        color: [255, 0, 0],
        multiline: true,
        args: ["Gun Game", `The player ${player.getName()} have a total of ${player.getScore()} points!`]
    });
};
