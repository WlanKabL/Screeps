export class VisualManager {
    static drawUpgradeOverlay(): void {
        Object.values(Game.rooms).forEach(room => {
            const controller = room.controller;
            if (!controller || !controller.my) return;

            const progress = controller.progress || 0;
            const progressTotal = controller.progressTotal || 1;
            const percentage = Math.floor((progress / progressTotal) * 100);

            room.visual.text(`⚡ Upgrade: ${progress}/${progressTotal} (${percentage}%)`, controller.pos.x + 1, controller.pos.y, { align: 'left', color: '#00ff00', font: 0.8 });
        });
    }

    static drawConstructionOverlay(): void {
        Object.values(Game.rooms).forEach(room => {
            room.find(FIND_CONSTRUCTION_SITES).forEach(site => {
                room.visual.text(`🚧 ${site.progress}/${site.progressTotal}`, site.pos.x, site.pos.y, { color: '#ffffff', font: 0.6 });
            });
        });
    }

    static drawCreepTasks(): void {
        Object.values(Game.creeps).forEach(creep => {
            if (creep.memory.status) {
                creep.room.visual.text(`🔄 ${creep.memory.status}`, creep.pos.x, creep.pos.y - 0.5, { color: '#ffaa00', font: 0.5 });
            }
        });
    }
}