// src/visuals.ts

export const Visuals = {
    /**
     * Visualizes the controller progress and ETA for upgrading.
     * @param room The room where the controller is located.
     */
    visualizeController(room: Room): void {
        const controller = room.controller;

        // Ensure the room has a valid controller
        if (!controller || !controller.my) {
            return;
        }

        // Calculate progress and remaining time
        const progress = controller.progress || 0;
        const progressTotal = controller.progressTotal || 1;
        const remainingProgress = progressTotal - progress;

        // Estimate remaining time based on current upgrader energy output
        const upgraderWorkParts = Object.values(Game.creeps).reduce((sum, creep: Creep) => {
            if (creep.memory.role === 'upgrader' && creep.room.name === room.name) {
                return sum + creep.getActiveBodyparts(WORK);
            }
            return sum;
        }, 0);

        const energyPerTick = upgraderWorkParts * UPGRADE_CONTROLLER_POWER; // Default power = 1 per WORK
        const ticksRemaining = energyPerTick > 0 ? Math.ceil(remainingProgress / energyPerTick) : Infinity;

        // Format the remaining time into a human-readable string
        const timeRemaining = ticksRemaining !== Infinity ? `${ticksRemaining} ticks` : '∞';

        // Draw the overlay near the controller
        room.visual.text(
            `Progress: ${progress}/${progressTotal} (${Math.floor((progress / progressTotal) * 100)}%)`,
            controller.pos.x + 1,
            controller.pos.y,
            { align: 'left', color: '#00ff00', font: 0.8 }
        );

        room.visual.text(
            `ETA: ${timeRemaining}`,
            controller.pos.x + 1,
            controller.pos.y + 1,
            { align: 'left', color: '#00ff00', font: 0.8 }
        );
    },

    /**
     * Visualizes all construction sites in the room.
     * @param room The room where the construction sites are located.
     */
    visualizeConstructionSites(room: Room): void {
        const constructionSites = room.find(FIND_CONSTRUCTION_SITES);

        // Iterate through all construction sites in the room
        constructionSites.forEach((site) => {
            const progress = site.progress;
            const progressTotal = site.progressTotal;
            const progressPercent = Math.floor((progress / progressTotal) * 100);

            // Draw progress near the construction site
            room.visual.text(
                `${progressPercent}%`,
                site.pos.x + 1,
                site.pos.y,
                { align: 'center', color: '#ffaa00', font: 0.6 }
            );
        });
    }
};