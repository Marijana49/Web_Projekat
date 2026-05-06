import { useState } from "react";

export function TravelList ({ plans, onDelete, onEdit, onViewDetails}){
    return(
        <>
        <h2>List of Travel Plans</h2>
        {plans.length === 0 ? (
            <p>No plans created yet</p>
        ) : (
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Budget</th>
                    </tr>
                </thead>
                <tbody>
                    {plans.map((plan) => (
                        <tr key={plan.id}>
                            <td>{plan.name}</td>
                            <td>{plan.startDate}</td>
                            <td>{plan.endDate}</td>
                            <td>{plan.budget}</td>
                            <td>
                                <button onClick={() => onViewDetails(plan)}>Details</button>
                                <button onClick={() => onEdit(plan)}>Edit</button>
                                <button onClick={() => onDelete(plan.id)} style={{ color: "red" }}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        )}
        </>
    )
}