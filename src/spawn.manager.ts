const typedConfig = require("./config");
const WorkManager = require("./Work.manager");

export class SpawnManager {
    static spawnCreep(spawn: StructureSpawn): void {
        const roleCounts = Object.values(Game.creeps).reduce(
            (counts, creep: Creep) => {
                const role = creep.memory.role as CreepRole;
                counts[role] = (counts[role] || 0) + 1;
                return counts;
            },
            {} as Record<CreepRole, number>
        );

        const totalCreeps = Object.keys(Game.creeps).length;
        const availableEnergy = spawn.room.energyAvailable;

        for (const role in typedConfig.roles) {
            const roleConfig = typedConfig.roles[role as CreepRole];

            if (!roleConfig.active) {
                // Kill all creeps of this role if disabled
                for (const creepName in Game.creeps) {
                    if (Game.creeps[creepName].memory.role === role) {
                        console.log(`🛑 Removing ${creepName} (${role})`);
                        Game.creeps[creepName].suicide();
                    }
                }
                continue;
            }

            // Check if we need more creeps of this role
            if ((roleCounts[role as CreepRole] || 0) < roleConfig.max) {
                const weakBodyParts = WorkManager[role as CreepRole]
                    ?.weakBodyParts || [WORK, CARRY, MOVE];
                const strongBodyParts =
                    this.getBestStrongConfig(role, availableEnergy) ||
                    weakBodyParts;

                if (availableEnergy < this.calculateCost(weakBodyParts)) {
                    console.log(
                        `⚠️ Not enough energy to spawn a ${role}. Waiting...`
                    );
                    continue;
                }

                spawn.spawnCreep(strongBodyParts, `Creep_${Game.time}`, {
                    memory: { role: role as CreepRole, status: "idle" },
                });

                console.log(
                    `🚀 Spawning new ${role} with ${strongBodyParts.length} body parts`
                );
                break;
            }
        }
    }

    /**
     * Finds the best strongBodyParts configuration based on available energy.
     */
    static getBestStrongConfig(
        role: string,
        availableEnergy: number
    ): BodyPartConstant[] | undefined {
        const roleConfig = WorkManager[role];
        if (!roleConfig || !roleConfig.strongConfigs) return undefined;

        let bestConfig: BodyPartConstant[] | undefined;
        let bestEnergy = 0;

        for (const [energy, parts] of Object.entries(
            roleConfig.strongConfigs
        )) {
            const cost = this.calculateCost(parts as BodyPartConstant[]);
            if (cost <= availableEnergy && cost > bestEnergy) {
                bestEnergy = cost;
                bestConfig = parts as BodyPartConstant[];
            }
        }

        return bestConfig;
    }

    /**
     * Calculates the energy cost of a given body part configuration.
     */
    static calculateCost(bodyParts: BodyPartConstant[]): number {
        return bodyParts.reduce((cost, part) => cost + BODYPART_COST[part], 0);
    }
}
