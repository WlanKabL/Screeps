const BaseRole = require("./BaseRole.role");
const PathManager = require("./Path.manager");
const StateManager = require("./State.manager");

export class Harvester extends BaseRole {
    workSmart(): void {
        if (this.creep.store.getFreeCapacity() > 0) {
            this.doHarvest();
        } else {
            this.doWork("transporting");
        }
    }

    doHarvest(): void {
        const source = this.creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
        if (source && this.creep.harvest(source) === ERR_NOT_IN_RANGE) {
            PathManager.moveTo(this.creep, source, "harvesting");
        } else {
            StateManager.updateState(this.creep, "harvesting", "🔄 Harvesting");
        }
    }
}
