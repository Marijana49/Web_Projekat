export class DestinationRequest {
    constructor(name, location, arrivalDate, departureDate, description, planId) {
        this.name = name;
        this.location = location;
        this.arrivalDate = arrivalDate;
        this.departureDate = departureDate;
        this.description = description;
        this.planId = planId;
    }
}