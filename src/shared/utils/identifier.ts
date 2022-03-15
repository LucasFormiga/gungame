export const getSteamIdentifier = (identifiers: Array<string>): string => {
    const identifier = identifiers.find((identifier: string | string[]) => identifier.includes("steam"));

    if (!identifier) {
        return "none";
    }

    return identifier.substring("steam".length + 1, identifier.length);
};
