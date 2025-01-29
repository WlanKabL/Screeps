export class TurretManager {
    /**
     * Checks if all turrets in the room are full on energy.
     * @param room The room to check for turrets.
     * @returns `true` if all turrets are full, otherwise `false`.
     */
    static areAllTurretsFull(room: Room): boolean {
        const turrets = room.find(FIND_MY_STRUCTURES, {
            filter: (structure) => structure.structureType === STRUCTURE_TOWER
        }) as StructureTower[];

        return turrets.every(turret => turret.store.getFreeCapacity(RESOURCE_ENERGY) === 0);
    }

    /**
     * Assigns a carrier to supply turrets with energy.
     * @param creep The creep that should supply the turrets.
     */
    static supplyTurrets(creep: Creep): void {
        const turret = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
            filter: (structure) => structure.structureType === STRUCTURE_TOWER &&
                structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
        }) as StructureTower;

        if (turret) {
            if (creep.transfer(turret, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.moveTo(turret, { visualizePathStyle: { stroke: '#ffaa00' } });
            }
        }
    }
}