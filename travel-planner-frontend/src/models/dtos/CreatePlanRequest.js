export class TravelPlanRequest {
    constructor(name, description, startDate, endDate, budget, notes, userId) {
        this.name = name;
        this.description = description;
        this.startDate = startDate;
        this.endDate = endDate;
        this.budget = budget;
        this.notes = notes;
        this.userId = userId;
    }
}