/// <reference path="../../node_modules/@citizenfx/server/natives_server.d.ts"/>

import { getSteamIdentifier } from "../shared/utils/identifier";
import { registerCommands } from "./commands/handler";
import Player from "./entities/player";
import setupPlayer from "./functions/setupPlayer";

on('playerConnecting', (name: string, setKickReason: Function, deferrals: any) => {
    const identifiers: Array<string> = getPlayerIdentifiers(source);
    const identifier: string = getSteamIdentifier(identifiers);

    if (!identifier) {
        setKickReason("You must have Steam opened to play this game.");
        deferrals.done("You must have Steam opened to play this game.");

        return;
    }
});

on('playerJoining', (source: string) => {
    const identifiers: Array<string> = getPlayerIdentifiers(source);
    const identifier: string = getSteamIdentifier(identifiers);

    if (!identifier) {
        DropPlayer(source, "You must have Steam opened to play this game.");

        return;
    }

    setupPlayer(identifier, GetPlayerName(source));
});

on('playerDropped', (source: string) => {
    const identifiers: Array<string> = getPlayerIdentifiers(source);
    const identifier: string = getSteamIdentifier(identifiers);

    if (!identifier) {
        return;
    }

    Gamers.delete(identifier);
});

onNet('playerUpdate', () => {
    const identifiers: Array<string> = getPlayerIdentifiers(source);
    const identifier: string = getSteamIdentifier(identifiers);
    const player = Gamers.get(identifier);

    if (!player) {
        console.log("[Gun Game]", "Someone tried to get a player which does not exists.");
        return;
    }

    player.setSource(source);

    Gamers.set(identifier, player);
});

onNet('increaseScore', () => {
    const identifiers: Array<string> = getPlayerIdentifiers(source);
    const identifier: string = getSteamIdentifier(identifiers);
    const player = Gamers.get(identifier);

    if (!player) {
        console.log("[Gun Game]", "Someone tried to get a player which does not exists.");
        return;
    }

    player.addScore(10);

    Gamers.set(identifier, player);
});

onNet('decreaseScore', () => {
    const identifiers: Array<string> = getPlayerIdentifiers(source);
    const identifier: string = getSteamIdentifier(identifiers);
    const player = Gamers.get(identifier);

    if (!player) {
        console.log("[Gun Game]", "Someone tried to get a player which does not exists.");
        return;
    }

    player.removeScore(10);

    Gamers.set(identifier, player);
});

onNet('kickMe', (msg: string) => {
    DropPlayer(String(source), msg);
});

registerCommands();

export const Gamers: Map<string, Player> = new Map<string, Player>();
