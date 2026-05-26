export class TravelPlan {
    constructor(id, title, destination, startDate, endDate, userId) {
        this.id = id;
        this.title = title;
        this.destination = destination;
        this.startDate = new Date(startDate); 
        this.endDate = new Date(endDate);
        this.userId = userId;
    }
}