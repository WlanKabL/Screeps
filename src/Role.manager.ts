const Harvester = require("./Harvester.role");
const Builder = require("./Builder.role");
const Carrier = require("./Carrier.role");
const Upgrader = require("./Upgrader.role");
// const Repairer = require('./Repairer');
// const Attacker = require('./Attacker');
// const Defender = require('./Defender');
// const Claimer = require('./Claimer');
// const Scout = require("./Scout.role");

export class RoleManager {
    /**
     * Returns an instance of the correct role class for a given creep.
     * @param creep The creep to assign a role.
     * @returns The role class instance.
     */
    static getRoleInstance(creep: Creep) {
        switch (creep.memory.role) {
            case "harvester":
                return new Harvester(creep);
            case "builder":
                return new Builder(creep);
            case "carrier":
                return new Carrier(creep);
            case "upgrader":
                return new Upgrader(creep);
            // case 'repairer': return new Repairer(creep);
            // case 'attacker': return new Attacker(creep);
            // case 'defender': return new Defender(creep);
            // case 'claimer': return new Claimer(creep);
            // case 'scout': return new Scout(creep);
            default:
                throw new Error(`Unknown role: ${creep.memory.role}`);
        }
    }
}
