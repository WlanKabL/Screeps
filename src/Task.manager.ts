const RoleManager = require("./Role.manager");
const WorkManager = require("./Work.manager");
const ConstructionManager = require("./Construction.manager");
const TurretManager = require("./Turret.manager");
// const FlagManager = require("./Flag.manager");
const VisualManager = require("./Visual.manager");
const typedConfig = require("./config");

export class TaskManager {
    static assignTask(creep: Creep): void {
        if (!creep.memory.role) return;
        const role = RoleManager.getRoleInstance(creep);

        // Get all tasks the role can do, sorted by priority
        const tasks = Object.keys(WorkManager)
            .filter((work) =>
                role.hasCapability(work as keyof typeof WorkManager)
            )
            .sort(
                (a, b) =>
                    (WorkManager[a].priority[creep.memory.role] || 99) -
                    (WorkManager[b].priority[creep.memory.role] || 99)
            );

        for (const work of tasks) {
            if (!role.hasCapability(work as keyof typeof WorkManager)) continue;

            switch (work) {
                case "attacking":
                case "defending":
                case "repairing":
                case "harvesting":
                    role.doWork(work as keyof typeof WorkManager);
                    return;

                case "transporting":
                    if (!TurretManager.areAllTurretsFull(creep.room)) {
                        role.doWork("transporting");
                        return;
                    }
                    break;

                case "building":
                    if (ConstructionManager.hasConstruction(creep.room)) {
                        role.doWork("building");
                        return;
                    }
                    break;
            }
        }

        // Default Fallback: Upgrading
        role.doWork("upgrading");
    }

    static updateVisuals(): void {
        if (typedConfig.visualization.showUpgradeProgress) {
            VisualManager.drawUpgradeOverlay();
        }
        if (typedConfig.visualization.showConstructionSites) {
            VisualManager.drawConstructionOverlay();
        }
        if (typedConfig.visualization.showCreepTasks) {
            VisualManager.drawCreepTasks();
        }
    }
}
