import { Gamers } from "..";
import Player from "../entities/player";

export default async function setupPlayer(identifier: string, name: string) {
    // query database

    const player = new Player(identifier, name);

    Gamers.set(identifier, player);

    console.log("[Gun Game]", player.getName(), "has logged in successfully.");
}