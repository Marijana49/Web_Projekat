import { ActivityStatus } from "../../enums/ActivityStatus";

/**
 * @typedef {object} Activity
 * @property {number} id
 * @property {string} name
 * @property {string} date
 * @property {string} description
 * @property {number} estimatedCost
 * @property {keyof typeof ActivityStatus} activityStatus
 */