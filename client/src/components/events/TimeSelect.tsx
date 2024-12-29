'use client';

import React, { useState } from 'react';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { getDateOptions } from '@/utils';
import { type DateOptionType } from '@/types';
import { Input } from "@/components/ui/input"


export function DateSelector() {
    const [selectedOption, setSelectedOption] = useState<DateOptionType | undefined>(undefined);
    const [customDate, setCustomDate] = useState<Date>();
    const [showCalendar, setShowCalendar] = useState(false);
    const { today, tomorrow, weekEnd } = getDateOptions();

    const getDisplayDate = (option: DateOptionType | undefined): string => {
        switch (option) {
            case 'today':
                return `Today, ${format(today, 'EEE, MMM d')}`;
            case 'tomorrow':
                return `Tomorrow, ${format(tomorrow, 'EEE, MMM d')}`;
            case 'thisWeek':
                return `Until ${format(weekEnd, 'EEE, MMM d')}`;
            case 'custom':
                return customDate ? format(customDate, 'EEE, MMM d, yyyy') : 'Select date';
            default:
                return 'Select time';
        }
    };

    const handleOptionChange = (value: DateOptionType) => {
        setSelectedOption(value);
        if (value === 'custom') {
            setShowCalendar(true);
        } else {
            setShowCalendar(false);
        }
    };

    const handleDateSelect = (date: Date | undefined) => {
        if (date) {
            setCustomDate(date);
            setShowCalendar(false);
        }
    };

    return (
        <>

            <div >
                <Select value={selectedOption} onValueChange={handleOptionChange}>
                    <SelectTrigger id="time">
                        <SelectValue placeholder="Select time">
                            {getDisplayDate(selectedOption)}
                        </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="today">
                            {getDisplayDate('today')}
                        </SelectItem>
                        <SelectItem value="tomorrow">
                            {getDisplayDate('tomorrow')}
                        </SelectItem>
                        <SelectItem value="thisWeek">
                            {getDisplayDate('thisWeek')}
                        </SelectItem>
                        <SelectItem value="custom">
                            Custom date
                        </SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {
                showCalendar && (
                    <div>
                        <Calendar
                            mode="single"
                            selected={customDate}
                            onSelect={handleDateSelect}
                            disabled={{ before: today }}
                            initialFocus
                        />
                    </div>
                )
            }
        </>

    );
}
