import { ExpenseCategory } from "../../enums/ExpenseCategory";
 
 export class Expense {
     constructor(id, name, amount, category, date, description, travelPlanId) {
        this.id = id;
        this.name = name;           
        this.amount = amount;       
        this.category = category;   
        this.date = date;           
        this.description = description;
        this.travelPlanId = travelPlanId;
    }
 }