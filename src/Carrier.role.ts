const BaseRole = require("./BaseRole.role");
const PathManager = require("./Path.manager");
const StateManager = require("./State.manager");

export class Carrier extends BaseRole {
    workSmart(): void {
        if (this.creep.store[RESOURCE_ENERGY] === 0) {
            this.doHarvest();
        } else {
            this.doTransport();
        }
    }

    doTransport(): void {
        const target = this.creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
            filter: (structure: AnyStructure) =>
                (structure.structureType === STRUCTURE_SPAWN ||
                    structure.structureType === STRUCTURE_EXTENSION ||
                    structure.structureType === STRUCTURE_TOWER) &&
                structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0,
        });

        if (
            target &&
            this.creep.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE
        ) {
            PathManager.moveTo(this.creep, target, "transporting");
        } else {
            StateManager.updateState(
                this.creep,
                "transferring",
                "⚡ Supplying"
            );
        }
    }
}
