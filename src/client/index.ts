import delay from "../shared/utils/delay";
import Game from "./class/game";
import { registerCommands } from "./commands/handler";
import { config } from "./config";
import randomTeleport from "./functions/randomTeleport";
import { deathTask } from "./loops/dead";

on('playerSpawned', async () => {
    const ped: number = PlayerPedId();

    SetEntityCoords(ped, config.SPAWN_LOCATION.x, config.SPAWN_LOCATION.y, config.SPAWN_LOCATION.z, true, false, false, false);
    SetCanAttackFriendly(ped, true, false)
    NetworkSetFriendlyFireOption(true)

    GameManager.set(PlayerId(), new Game());

    await delay(1000);

    randomTeleport();
    emitNet('playerUpdate');
    deathTask();
});

on("gameEventTriggered", (name: string, args: any) => {
    if (name == "CEventNetworkEntityDamage") {
        if (args[1] == PlayerPedId() && IsEntityDead(args[0])) {
            const Game: Game | undefined = GameManager.get(PlayerId());

            if (!Game) return;
            
            Game.addLevel();
            Game.startGame();

            GameManager.set(PlayerId(), Game);

            emitNet("increaseScore");
        }
    }
});

onNet('warnAndKick', (msg: string) => {
    emitNet('kickMe', msg);
});

registerCommands();

export const GameManager: Map<number, Game> = new Map<number, Game>();
