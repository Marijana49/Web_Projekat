import React, { useState, useEffect } from 'react';
import Calendar from "react-calendar";
import { useParams, useNavigate } from 'react-router-dom';
import "../../App.css";
import { GetPlanById } from '../../services/TravelService';
import { ActivityList } from './ActivityList';

export function ActivityCalendar({ planId: externalPlanId, readOnly, shareToken }) {
    const { id: paramId } = useParams();
    const id = externalPlanId || paramId;
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await GetPlanById(id, shareToken);
                
                const start = new Date(response.startDate);
                start.setHours(0, 0, 0, 0);
                
                const end = new Date(response.endDate);
                end.setHours(0, 0, 0, 0);
                
                setStartDate(start);
                setEndDate(end);
            } catch (error) {
                console.error("Greška pri učitavanju plana:", error);
            }
        };
        fetchData(); 
    }, [id, shareToken]); 

    return (
        // OBAVEZAN RODITELJSKI DIV
        <div className="calendar-wrapper">
            <Calendar
                onClickDay={(date) => {
                    if(date >= startDate && date <= endDate) {
                        const year = date.getFullYear();
                        const month = String(date.getMonth() + 1).padStart(2, '0');
                        const day = String(date.getDate()).padStart(2, '0');
                        
                        const formattedDate = `${year}-${month}-${day}`;
                        setSelectedDate(formattedDate);
                    } else {
                        alert("Ne možete dodati/gledati aktivnosti za dane koji nisu predviđeni planom putovanja!");
                    }
                }}
                tileClassName={({ date, view }) => {
                    if (view === 'month' && startDate && endDate) {
                        const current = new Date(date);
                        current.setHours(0, 0, 0, 0);
                        return (current >= startDate && current <= endDate) ? 'trip-days' : null;
                    }
                    return null;
                }} 
            />

            {selectedDate && (
                <ActivityList 
                    planId={id} 
                    readOnly={readOnly} 
                    selectedDate={selectedDate} 
                />
            )}
        </div>
    );
}