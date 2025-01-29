/**
 * Manages construction sites in the game Screeps.
 */
export class ConstructionManager {
    /**
     * Checks if there are any construction sites in the given room.
     * @param roomName - The name of the room.
     * @returns True if there are any construction sites in the room, false otherwise.
     */
    static doesRoomHaveConstruction(room: Room): boolean {
        const constructionSites = room.find(FIND_CONSTRUCTION_SITES);
        return constructionSites.length > 0;
    }
}
