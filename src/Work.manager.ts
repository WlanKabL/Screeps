interface RoleConfig {
    weakBodyParts: BodyPartConstant[];
    strongConfigs: Record<number, BodyPartConstant[]>;
    roles: CreepRole[];
    priority: Partial<Record<CreepRole, number>>;
}

interface WorkManagerType {
    [key: string | CreepRole]: RoleConfig;
}

export const WorkManager: WorkManagerType = {
    harvesting: {
        weakBodyParts: [WORK, CARRY, MOVE], // Minimale Arbeitskraft
        strongConfigs: {
            300: [WORK, WORK, CARRY, MOVE], // Effiziente Harvesting-Worker mit 300 Energie
            400: [WORK, WORK, CARRY, CARRY, MOVE], 
            500: [WORK, WORK, WORK, CARRY, CARRY, MOVE], 
            600: [WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE], 
            800: [WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE], 
            1300: [WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE], 
        },
        roles: ["harvester", "builder", "carrier", "upgrader"],
        priority: { harvester: 1, builder: 3, carrier: 2, upgrader: 4 },
    },
    building: {
        weakBodyParts: [WORK, CARRY, MOVE],
        strongConfigs: {
            300: [WORK, CARRY, MOVE, MOVE], // Schneller Builder mit mehr Bewegung
            400: [WORK, WORK, CARRY, MOVE, MOVE], 
            500: [WORK, WORK, WORK, CARRY, MOVE, MOVE], 
            600: [WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE], 
            800: [WORK, WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE], 
            1300: [WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], 
        },
        roles: ["builder"],
        priority: { builder: 1 },
    },
    upgrading: {
        weakBodyParts: [WORK, CARRY, MOVE],
        strongConfigs: {
            300: [WORK, CARRY, MOVE, MOVE], // Upgrader mit minimalem Transportweg
            400: [WORK, WORK, CARRY, MOVE, MOVE], 
            500: [WORK, WORK, WORK, CARRY, MOVE, MOVE], 
            600: [WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE], 
            800: [WORK, WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE], 
            1300: [WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], 
        },
        roles: ["upgrader", "harvester", "builder"],
        priority: { upgrader: 1, builder: 2, harvester: 3 },
    },
    repairing: {
        weakBodyParts: [WORK, CARRY, MOVE],
        strongConfigs: {
            300: [WORK, CARRY, MOVE, MOVE], // Repariert mit minimalem Bewegungsspielraum
            400: [WORK, WORK, CARRY, MOVE, MOVE], 
            500: [WORK, WORK, WORK, CARRY, MOVE, MOVE], 
            600: [WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE], 
            800: [WORK, WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE], 
            1300: [WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], 
        },
        roles: ["repairer", "builder"],
        priority: { repairer: 1, builder: 2 },
    },
    transporting: {
        weakBodyParts: [CARRY, MOVE], // Minimaler Transporter
        strongConfigs: {
            300: [CARRY, CARRY, MOVE, MOVE], 
            400: [CARRY, CARRY, CARRY, MOVE, MOVE, MOVE], 
            500: [CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE], 
            600: [CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE], 
            800: [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], 
            1300: [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE], 
        },
        roles: ["carrier"],
        priority: { carrier: 1 },
    },
    attacking: {
        weakBodyParts: [TOUGH, ATTACK, MOVE], // Basis für Angreifer
        strongConfigs: {
            300: [TOUGH, ATTACK, MOVE, MOVE], 
            400: [TOUGH, TOUGH, ATTACK, MOVE, MOVE, MOVE], 
            500: [TOUGH, TOUGH, ATTACK, ATTACK, MOVE, MOVE, MOVE], 
            600: [TOUGH, TOUGH, TOUGH, ATTACK, ATTACK, MOVE, MOVE, MOVE], 
            800: [TOUGH, TOUGH, TOUGH, ATTACK, ATTACK, ATTACK, MOVE, MOVE, MOVE, MOVE], 
            1300: [TOUGH, TOUGH, TOUGH, TOUGH, ATTACK, ATTACK, ATTACK, ATTACK, MOVE, MOVE, MOVE, MOVE, MOVE], 
        },
        roles: ["attacker"],
        priority: { attacker: 1 },
    },
    defending: {
        weakBodyParts: [TOUGH, RANGED_ATTACK, MOVE], // Basis für Verteidiger
        strongConfigs: {
            300: [TOUGH, RANGED_ATTACK, MOVE, MOVE], 
            400: [TOUGH, TOUGH, RANGED_ATTACK, MOVE, MOVE, MOVE], 
            500: [TOUGH, TOUGH, RANGED_ATTACK, RANGED_ATTACK, MOVE, MOVE, MOVE], 
            600: [TOUGH, TOUGH, TOUGH, RANGED_ATTACK, RANGED_ATTACK, MOVE, MOVE, MOVE], 
            800: [TOUGH, TOUGH, TOUGH, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, MOVE, MOVE, MOVE, MOVE], 
            1300: [TOUGH, TOUGH, TOUGH, TOUGH, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, MOVE, MOVE, MOVE, MOVE, MOVE], 
        },
        roles: ["defender"],
        priority: { defender: 1 },
    },
};
