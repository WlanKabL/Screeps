// const PathManager = require("./Path.manager");
// const StateManager = require("./State.manager");
const WorkManager = require("./Work.manager");

export abstract class BaseRole {
    constructor(protected creep: Creep) {}

    workSmart(): void {}

    /**
     * Checks if the creep has the capability to perform a certain task
     * @param task The task name (e.g., "harvesting", "building")
     * @returns true if the creep can perform the task, otherwise false
     */
    hasCapability(task: keyof typeof WorkManager): boolean {
        return WorkManager[task]?.roles.includes(this.creep.memory.role);
    }

    /**
     * Executes the appropriate task based on WorkManager definition
     * @param task The task name (e.g., "harvesting", "building")
     */
    doWork(task: keyof typeof WorkManager): void {
        switch (task) {
            case "harvesting":
                this.doHarvest();
                break;
            case "building":
                this.doBuild();
                break;
            case "upgrading":
                this.doUpgrade();
                break;
            case "repairing":
                this.doRepair();
                break;
            case "transporting":
                this.doTransport();
                break;
            case "attacking":
                this.doAttack();
                break;
            case "defending":
                this.doDefend();
                break;
        }
    }

    // Define common tasks for all roles
    doHarvest(): void {}
    doBuild(): void {}
    doUpgrade(): void {}
    doRepair(): void {}
    doTransport(): void {}
    doAttack(): void {}
    doDefend(): void {}
}
