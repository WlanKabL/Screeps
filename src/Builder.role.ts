const BaseRole = require("./BaseRole.role");
const PathManager = require("./Path.manager");
const StateManager = require("./State.manager");
const ConstructionManager = require("./Construction.manager");

export class Builder extends BaseRole {
    workSmart(): void {
        if (this.creep.store.getFreeCapacity() > 0) {
            this.doHarvest();
        } else if (ConstructionManager.hasConstruction(this.creep.room)) {
            this.doBuild();
        } else {
            this.doUpgrade(); // Fallback auf Upgrading
        }
    }

    doBuild(): void {
        const site = this.creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
        if (site && this.creep.build(site) === ERR_NOT_IN_RANGE) {
            PathManager.moveTo(this.creep, site, "building");
        } else {
            StateManager.updateState(this.creep, "building", "🚧 Building");
        }
    }
}
