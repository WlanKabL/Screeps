// src/stateManager.ts
export class StateManager {
    static updateState(creep: Creep, newState: CreepStatus, message?: string): void {
        if (creep.memory.status !== newState) {
            creep.memory.status = newState;
            if (message) {
                creep.say(message);
            }
        }
    }

    static moveTo(creep: Creep, target: RoomPosition | { pos: RoomPosition }, pathColor: string): void {
        creep.moveTo(target, {
            visualizePathStyle: { stroke: pathColor }
        });
    }
}