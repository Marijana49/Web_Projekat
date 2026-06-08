import { ExpenseCategory } from "../../enums/ExpenseCategory";
 
 export class CreateExpenseRequest {
     constructor(name, amount, category, date, description, travelPlanId) {
        this.name = name;           
        this.amount = amount;       
        this.category = category;   
        this.date = date;           
        this.description = description;
        this.travelPlanId = travelPlanId;
    }
 }