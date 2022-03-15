import { GameManager } from "..";
import delay from "../../shared/utils/delay";
import randomTeleport from "../functions/randomTeleport";

export const deathTask = (): void => {
    setTick(async () => {
        while (true) {
            await delay(10);

            const ped: number = PlayerPedId();
            const [x, y, z] = GetEntityCoords(ped);
            const heading: number = GetEntityHeading(ped);

            if (IsEntityDead(ped)) {
                const Game = GameManager.get(PlayerId());
                
                if (!Game) return;
                
                Game.removeLevel();
                GameManager.set(PlayerId(), Game);

                emitNet('decreaseScore');

                await delay(5 * 1000);

                NetworkResurrectLocalPlayer(x, y, z + 0.5, heading, true, false);
                SetEntityInvincible(ped, true);
                SetEntityHealth(ped, GetEntityMaxHealth(ped));

                randomTeleport();
            }
        }
    });
}
