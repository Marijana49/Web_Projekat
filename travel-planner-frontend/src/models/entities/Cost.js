import { CostCategory } from "../../enums/CostCategory";

/**
 * @typedef {Object} Cost
 * @property {number} id
 * @property {string} name
 * @property {keyof typeof CostCategory} category
 * @property {number} amount
 * @property {string} date
 * @property {string} description
 */