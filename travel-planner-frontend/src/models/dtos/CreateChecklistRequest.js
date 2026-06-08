export class CreateChecklist {
    constructor(name, isChecked, planId) {
        this.name = name;
        this.isChecked = isChecked;
        this.travelPlanId = planId;
    }
}