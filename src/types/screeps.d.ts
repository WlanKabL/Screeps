// Define all possible roles for a creep
type CreepRole =
    | 'harvester'   // Harvests energy from sources
    | 'upgrader'    // Upgrades the room controller
    | 'builder'     // Builds construction sites
    | 'repairer'    // Repairs damaged structures
    | 'carrier'     // Transports energy and other resources
    | 'attacker'    // Attacks hostile creeps or structures
    | 'defender'    // Defends the room from hostile threats
    | 'claimer'     // Claims or reserves controllers in new rooms
    | 'scout';      // Explores new rooms


type CreepStatus = 
    | 'spawned'
    | 'idle'
    | 'working'
    | 'upgrading'
    | 'building'
    | 'repairing'
    | 'carrying'
    | 'attacking'
    | 'defending'
    | 'claiming'
    | 'scouting'
    | 'harvesting'
    | 'transferring'
    | 'moving';

// Extend the CreepMemory interface to include custom properties
interface CreepMemory {
    role: CreepRole;    // The role assigned to the creep
    upgrading?: boolean; // Indicates if the creep is upgrading the controller
    building?: boolean;  // Indicates if the creep is building a construction site
    status?: CreepStatus; // The current status of the creep
}