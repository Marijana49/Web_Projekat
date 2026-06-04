export class EditDestinationRequest {
    constructor(name = null, location = null, arrivalDate = null, departureDate = null, description = null, planId) {
        this.name = name;
        this.location = location;
        this.arrivalDate = arrivalDate;
        this.departureDate = departureDate;
        this.description = description;
        this.planId = planId;
    }
}