interface Config {
    roles: {
        [role: string]: {
            active: boolean;
            max: number;
        };
    };
    pathColors: {
        [role in CreepRole]?: {
            [action: string]: string;
        };
    };
    visualization: {
        showUpgradeProgress: boolean;
        showConstructionSites: boolean;
        showCreepTasks: boolean;
    };
    hardstuckLimits: {
        warningTicks: number;
        suicideTicks: number;
    };
}

const config = {
    roles: {
        harvester: { active: true, max: 5 },
        builder: { active: true, max: 12 },
        carrier: { active: true, max: 4 },
        upgrader: { active: true, max: 5 },
        repairer: { active: false, max: 2 },
        attacker: { active: false, max: 1 },
        defender: { active: false, max: 2 },
        claimer: { active: false, max: 1 },
        scout: { active: false, max: 1 }
    },
    pathColors: {
        harvester: {
            harvesting: "#ffaa00",
            transferring: "#11ff11",
            moving: "#ffffff"
        },
        builder: {
            building: "#ffffff",
            harvesting: "#ffaa00",
            upgrading: "#00ff00",
            moving: "#11ff11"
        },
        carrier: {
            transporting: "#ffaa00",
            moving: "#11ff11"
        },
        upgrader: {
            upgrading: "#00ff00",
            harvesting: "#ffaa00",
            moving: "#ffffff"
        },
        repairer: {
            repairing: "#ffaa00",
            moving: "#11ff11"
        },
        attacker: {
            attacking: "#ff0000",
            moving: "#11ff11"
        },
        defender: {
            defending: "#ff0000",
            moving: "#11ff11"
        },
        claimer: {
            claiming: "#ffaa00",
            moving: "#11ff11"
        },
        scout: {
            scouting: "#ffaa00",
            moving: "#11ff11"
        }
    },
    visualization: {
        showUpgradeProgress: true,
        showConstructionSites: true,
        showCreepTasks: true
    },
    hardstuckLimits: {
        warningTicks: 100,
        suicideTicks: 200
    }
} as const;

export const typedConfig: Config = config;