export class StateManager {
    static updateState(creep: Creep, newState?: CreepStatus, message?: string): void {
        if (creep.memory.status !== newState) {
            creep.memory.status = newState;
            if (message) creep.say(message);
        }
    }
}