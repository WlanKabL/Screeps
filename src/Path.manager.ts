const typedConfig = require("./config");

export class PathManager {
    private static pathCache: Map<string, PathStep[]> = new Map();

    static moveTo(
        creep: Creep,
        target: RoomPosition | { pos: RoomPosition },
        action: string
    ): void {
        const role = creep.memory.role as CreepRole;
        const color = typedConfig.pathColors[role]?.[action] || "#ffffff";
        const targetPos = "pos" in target ? target.pos : target;
        const key = `${creep.name}_${targetPos.x}_${targetPos.y}`;

        if (this.pathCache.has(key)) {
            creep.moveByPath(this.pathCache.get(key)!);
        } else {
            const path = creep.room.findPath(creep.pos, targetPos, {
                ignoreCreeps: false,
            });
            this.pathCache.set(key, path);
            creep.moveByPath(path);
        }

        this.visualizePath(creep.room, creep.pos, targetPos, color);
    }

    private static visualizePath(
        room: Room,
        start: RoomPosition,
        end: RoomPosition,
        color: string
    ): void {
        const path = room.findPath(start, end);
        path.forEach((step) =>
            room.visual.circle(step.x, step.y, { radius: 0.2, fill: color })
        );
    }
}
