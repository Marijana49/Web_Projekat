export class Destination {
    constructor(id, name, location, arrivalDate, departureDate, description, planId) {
        this.id = id;
        this.name = name;
        this.location = location;
        this.arrivalDate = new Date(arrivalDate); 
        this.departureDate = new Date(departureDate);
        this.description = description;
        this.planId = planId;
    }
}