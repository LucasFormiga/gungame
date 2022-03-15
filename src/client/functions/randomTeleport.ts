import { config } from "../config";
import delay from "../../shared/utils/delay";
import { GameManager } from "..";
import { SafeCoords } from "../../shared/type/safeCoords";

export default async function randomTeleport(): Promise<void> {
    let location: SafeCoords = generateRandomLocation();
    const ped: number = PlayerPedId();

    do {
        await delay(1);

        location = generateRandomLocation();
    } while (
        !location.isSafe ||
        GetDistanceBetweenCoords(location.x, location.y, location.z, config.SPAWN_LOCATION.x, config.SPAWN_LOCATION.y, config.SPAWN_LOCATION.z, true) >= config.RADIUS
    );
    
    SetEntityCoords(ped, location.x, location.y, location.z - 1.0, true, false, false, false);
    SetEntityInvincible(ped, false);

    await delay(50);

    GameManager.get(PlayerId())?.startGame();
}

function generateRandomLocation(): SafeCoords {
    const [safe, coords] = GetSafeCoordForPed(
        config.SPAWN_LOCATION.x + (Math.random() * 1000),
        config.SPAWN_LOCATION.y + (Math.random() * 1000),
        config.SPAWN_LOCATION.z,
        false,
        16
    );

    return {
        isSafe: safe,
        x: coords[0],
        y: coords[1],
        z: coords[2]
    };
}
