import { ActivityStatus } from "../../enums/ActivityStatus";

export class Activity {
    constructor(id, name, date, description, budget, status) {
        this.id = id;
        this.name = name;
        this.date = new Date(date); 
        this.description = description;
        this.budget = budget;
        this.status = role || ActivityStatus.PLANNED;
    }
}