export class EditPlanRequest {
    constructor(name = null, description = null, startDate = null, endDate = null, budget = null, notes = null, userId) {
        this.name = name;
        this.description = description;
        this.startDate = startDate;
        this.endDate = endDate;
        this.budget = budget;
        this.notes = notes;
        this.userId = userId;
    }
}