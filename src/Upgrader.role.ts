const BaseRole = require("./BaseRole.role");
const PathManager = require("./Path.manager");
const StateManager = require("./State.manager");

export class Upgrader extends BaseRole {
    workSmart(): void {
        if (this.creep.store.getFreeCapacity() > 0) {
            this.doHarvest();
        } else {
            this.doUpgrade();
        }
    }

    doUpgrade(): void {
        const controller = this.creep.room.controller;
        if (controller) {
            if (this.creep.upgradeController(controller) === ERR_NOT_IN_RANGE) {
                PathManager.moveTo(this.creep, controller, "upgrading");
            } else {
                StateManager.updateState(
                    this.creep,
                    "upgrading",
                    "⚡ Upgrading"
                );
            }
        }
    }
}
