import React, { useEffect, useMemo, useState } from 'react';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { isBefore, startOfDay, startOfMonth, parseISO } from 'date-fns';
import { useHapioBookingStore } from 'hapio-ui-state-management';

interface StepProps {
    onSelect: () => void;
}

const Calendar: React.FC<StepProps> = ({ onSelect }) => {
    const {
        availableDates,
        selectedDate,
        setSelectedDate,
        setSelectedTimeSlot,
        selectedLocation,
        selectedService,
        fetchDates,
    } = useHapioBookingStore();

    const [currentMonth, setCurrentMonth] = useState<Date>(new Date());

    useEffect(() => {
        setSelectedDate(null);

        if (selectedDate) {
            fetchDates(
                startOfMonth(
                    typeof selectedDate === 'string'
                        ? new Date(selectedDate)
                        : selectedDate
                )
            );
        } else {
            fetchDates(currentMonth);
        }
    }, [fetchDates, currentMonth, setSelectedDate, selectedDate]);

    const handleMonthChange = (date: Date) => {
        setCurrentMonth(date);
    };

    // Create a Set of time values for faster comparison
    const availableDatesSet = useMemo(() => {
        return new Set(
            availableDates
                .filter((item) => item.starts_at)
                .map((item) => parseISO(item.starts_at!).toDateString())
        );
    }, [availableDates]);

    const shouldDisableDate = (date: Date) => {
        if (selectedService && selectedLocation) {
            // Disable dates with no available timeslots
            const dateString = date.toDateString();
            return !availableDatesSet.has(dateString);
        } else {
            // Disable dates before today
            const today = startOfDay(new Date());
            return isBefore(date, today);
        }
    };

    const handleDateSelect = (newValue: Date | null) => {
        setSelectedDate(newValue);
        setSelectedTimeSlot(null);
        onSelect();
    };

    return (
        <DateCalendar
            value={selectedDate ? new Date(selectedDate) : null}
            onChange={handleDateSelect}
            shouldDisableDate={shouldDisableDate}
            onMonthChange={handleMonthChange}
            views={['day']}
        />
    );
};

export default Calendar;
