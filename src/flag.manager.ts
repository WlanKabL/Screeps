export class FlagManager {
    static moveToFlag(creep: Creep, flagName: string): void {
        const flag = Game.flags[flagName];
        if (flag) {
            creep.moveTo(flag, { visualizePathStyle: { stroke: '#ffcc00' } });
        }
    }

    static assignIdleCreepsToFlag(flagName: string): void {
        for (const creepName in Game.creeps) {
            const creep = Game.creeps[creepName];
            if (creep.memory.status === 'idle') {
                this.moveToFlag(creep, flagName);
            }
        }
    }
}