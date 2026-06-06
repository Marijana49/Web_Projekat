import React, { useState, useEffect } from 'react';
import Calendar from "react-calendar";
import { useParams } from 'react-router-dom';
import "../../App.css"
import axios from 'axios';
import { GetPlanById } from '../../services/TravelService';
import { useNavigate } from 'react-router-dom';

export function ActivityCalendar() {
    const { planId } = useParams();
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await GetPlanById(planId);
                console.log("Stiglo sa backenda:", response);
                
                const start = new Date(response.startDate);
                start.setHours(0, 0, 0, 0);
                console.log(start)

                const end = new Date(response.endDate);
                end.setHours(0, 0, 0, 0);
                console.log(end)

                setStartDate(start);
                setEndDate(end);
            } catch (error) {
                console.error("Greška pri učitavanju plana:", error);
            }
        };
        fetchData(); 
    }, [planId]);

    return (
        <Calendar
            onClickDay={(date) => {
                if(date >= startDate && date <= endDate) {
                    alert("moze se dodati")
                    const year = date.getFullYear();
                    const month = String(date.getMonth() + 1).padStart(2, '0');
                    const day = String(date.getDate()).padStart(2, '0');
                    
                    const formattedDate = `${year}-${month}-${day}`;
                    navigate(`/activities/${planId}?date=${formattedDate}`)
                }
                else {
                    alert("Ne možet dodati aktivnosti za dane koji nisu predviđeni planom!")
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
    );
}