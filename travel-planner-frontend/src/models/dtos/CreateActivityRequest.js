import { ActivityStatus } from "../../enums/ActivityStatus";

export class CreateActivityRequest {
    constructor(name, date, time, location, description, budget, status, travelPlanId, destinationId = null) {
        this.name = name;
        this.date = date; 
        this.time = time;
        this.location = location;
        this.description = description;
        this.budget = budget;
        this.status = status || ActivityStatus.PLANNED;
        this.travelPlanId = travelPlanId;
        this.destinationId = destinationId;
    }
}