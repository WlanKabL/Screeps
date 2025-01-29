export class ConstructionManager {
    /**
     * Checks if there are any construction sites in the room.
     * @param room The room to check for construction sites.
     * @returns `true` if there are construction sites, otherwise `false`.
     */
    static hasConstruction(room: Room): boolean {
        return room.find(FIND_CONSTRUCTION_SITES).length > 0;
    }
}