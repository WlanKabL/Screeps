const BaseRole = require("./BaseRole.role");
const PathManager = require("./Path.manager");
const StateManager = require("./State.manager");

export class Defender extends BaseRole {
    workSmart(): void {
        this.doDefend();
    }

    doDefend(): void {
        const target = this.creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS);
        if (target && this.creep.attack(target) === ERR_NOT_IN_RANGE) {
            PathManager.moveTo(this.creep, target, "defending");
        } else {
            StateManager.updateState(this.creep, "defending", "🛡️ Defending");
        }
    }
}
