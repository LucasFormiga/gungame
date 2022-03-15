export default class Game {
    
    private level: number = 0;
    private guns: Array<string> = [
        'weapon_pistol',
        'weapon_combatpistol', // combat pistol
        'weapon_pistol50', // .50
        'weapon_microsmg', // microsmg
        'weapon_smg', // smg,
        'weapon_assaultrifle', // assault rifle
        'weapon_advancedrifle', // advanced rifle,
        'weapon_sawnoffshotgun', // sawnoff
        'weapon_heavysniper', // heavy sniper
        'weapon_knife' // knife
    ];

    public addLevel(): void {
        if (this.level !== 10) {
            this.level++;
        }

        this.startGame();
    }

    public removeLevel(): void {
        if (this.level !== 0) {
            this.level--;
        }

        this.startGame();
    }

    public startGame(): void {
        const ped = PlayerPedId();

        RemoveAllPedWeapons(ped, false);
        GiveWeaponToPed(ped, GetHashKey(this.guns[this.level]), 60, false, false);
    }

}
