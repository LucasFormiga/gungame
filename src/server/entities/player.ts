export default class Player {
    
    private source!: string | number
    private identifier!: string;
    private name!: string;
    private score: number = 0;

    constructor(identifier: string, name: string) {
        this.identifier = identifier;
        this.name = name;
    }

    public getSource(): string | number {
        return this.source;
    }

    public getIdentifier(): string {
        return this.identifier;
    }

    public getName(): string {
        return this.name;
    }

    public getScore(): number {
        return this.score;
    }

    public setSource(source: string | number): void {
        this.source = source;
    }

    public setIdentifier(identifier: string): void {
        this.identifier = identifier;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public setScore(score: number): void {
        this.score = score;
    }

    public addScore(score: number): void {
        this.score += score;

        if (this.score >= 100) {
            emitNet('warnAndKick', -1, `Game Over! Winner: ${this.getName()}`);
        }
    }

    public removeScore(score: number): void {
        if (this.score !== 0) {
            this.score -= score;
        }
    }
}