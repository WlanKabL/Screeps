const typedConfig = require("./config");

export class HardstuckManager {
    private static stuckCreeps: Map<string, number> = new Map();

    static checkHardstuck(): void {
        for (const creepName in Game.creeps) {
            const creep = Game.creeps[creepName];

            if (creep.memory.status === "moving") {
                if (this.stuckCreeps.has(creepName)) {
                    this.stuckCreeps.set(
                        creepName,
                        this.stuckCreeps.get(creepName)! + 1
                    );
                } else {
                    this.stuckCreeps.set(creepName, 1);
                }

                if (
                    this.stuckCreeps.get(creepName)! >=
                    typedConfig.hardstuckLimits.warningTicks
                ) {
                    console.log(`⚠️ Warning: ${creepName} might be stuck.`);
                }

                if (
                    this.stuckCreeps.get(creepName)! >=
                    typedConfig.hardstuckLimits.suicideTicks
                ) {
                    console.log(`🛑 Killing stuck creep: ${creepName}`);
                    creep.suicide();
                }
            } else {
                this.stuckCreeps.delete(creepName);
            }
        }
    }
}
