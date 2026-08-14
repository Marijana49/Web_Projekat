import { ActivityStatus } from "../../enums/ActivityStatus";

export class Activity {
    constructor(id, name, date, time, location, description, budget, status, travelPlanId, destinationId = null, latitude = null, longitude = null) {
        this.id = id;
        this.name = name;
        this.date = new Date(date); 
        this.time = time;
        this.location = location;
        this.description = description;
        this.budget = budget;
        this.status = status || ActivityStatus.PLANNED;
        this.travelPlanId = travelPlanId;
        this.destinationId = destinationId;
        this.latitude = latitude;
        this.longitude = longitude;
    }
}