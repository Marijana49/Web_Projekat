import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { GetPlanById } from "../services/TravelService";
import { GetTravelPlanDestinations } from "../services/DestinationService";
import { GetBudgetSummary } from "../services/ExpenseService";
import { GetActivitiesByDate } from "../services/ActivityService";
import { ActivityStatusLabels } from "../enums/ActivityStatus";

export async function GeneratePlanPdf(planId, shareToken = null) {
    const plan = await GetPlanById(planId, shareToken);
    const destinations = await GetTravelPlanDestinations(planId, shareToken);
    const budgetData = await GetBudgetSummary(planId, shareToken);

    const allActivities = [];
    const start = new Date(plan.startDate);
    const end = new Date(plan.endDate);

    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        const dateStr = d.toISOString().split("T")[0];
        try {
            const dayActivities = await GetActivitiesByDate(planId, dateStr, shareToken);
            allActivities.push(...dayActivities);
        } catch (err) {
            console.error(`Greška pri učitavanju aktivnosti za ${dateStr}:`, err);
        }
    }

    const doc = new jsPDF();
    let y = 20;

    doc.setFontSize(18);
    doc.text(plan.name, 14, y);
    y += 10;

    doc.setFontSize(11);
    doc.text(`Opis: ${plan.description || "-"}`, 14, y);
    y += 7;
    doc.text(`Period: ${plan.startDate} - ${plan.endDate}`, 14, y);
    y += 7;
    doc.text(`Budžet: ${plan.budget} €`, 14, y);
    y += 10;

    doc.setFontSize(13);
    doc.text("Pregled budžeta", 14, y);
    y += 7;
    doc.setFontSize(11);
    doc.text(`Planirano: ${budgetData.budget} €`, 14, y);
    y += 6;
    doc.text(`Potrošeno: ${budgetData.totalExpenses} €`, 14, y);
    y += 6;
    doc.text(`Preostalo: ${budgetData.remainingBudget} €`, 14, y);
    y += 10;

    doc.setFontSize(13);
    doc.text("Destinacije", 14, y);
    y += 4;

    if (destinations.length === 0) {
        doc.setFontSize(11);
        doc.text("Nema unesenih destinacija.", 14, y + 6);
        y += 12;
    } else {
        autoTable(doc, {
            startY: y + 4,
            head: [["Naziv", "Lokacija", "Dolazak", "Odlazak", "Opis"]],
            body: destinations.map(d => [
                d.name, d.location, d.arrivalDate, d.departureDate, d.description || "-"
            ]),
            styles: { fontSize: 9 },
        });
        y = doc.lastAutoTable.finalY + 10;
    }

     doc.setFontSize(13);
    doc.text("Aktivnosti", 14, y);
    y += 4;

    if (allActivities.length === 0) {
        doc.setFontSize(11);
        doc.text("Nema unesenih aktivnosti.", 14, y + 6);
    } else {
        autoTable(doc, {
            startY: y + 4,
            head: [["Datum", "Vrijeme", "Naziv", "Lokacija", "Status"]],
            body: allActivities.map(a => [
                a.date, a.time, a.name, a.location, ActivityStatusLabels[a.status]
            ]),
            styles: { fontSize: 9 },
        });
    }

    doc.save(`${plan.name.replace(/\s+/g, "_")}.pdf`);
}