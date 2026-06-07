import { ActivityStatus } from "../../enums/ActivityStatus";

export class EditActivityRequest {
    constructor(name = null, date = null, time = null, location = null, description = null, budget = null, status = null, travelPlanId, destinationId = null) {
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