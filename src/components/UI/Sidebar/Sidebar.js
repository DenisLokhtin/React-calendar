import React, {useContext, useEffect, useMemo, useState} from 'react';
import './Sidebar.css';
import dayjs from "dayjs";
import GlobalContext from "../../../context/GlobalContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

const Sidebar = () => {
    const {monthIndex, setMonthIndex} = useContext(GlobalContext);
    const [startDate, setStartDate] = useState(new Date(dayjs().year(), monthIndex))
    useMemo(() => {
        setStartDate(new Date(dayjs().year(), monthIndex));
    }, [monthIndex])

    const increaseIndex = () => {
        setMonthIndex(monthIndex + 1)
        localStorage.setItem('index', JSON.stringify(monthIndex + 1));
    };

    const decreaseIndex = () => {
        setMonthIndex(monthIndex - 1)
        localStorage.setItem('index', JSON.stringify(monthIndex - 1));
    };

    const now = dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM YYYY");

    const difference = () => {
        const currentDate = new Date(dayjs().year(), monthIndex);
        let diffMonth = dayjs(startDate).diff(dayjs(currentDate), 'month');

        if (diffMonth !== 0) {
            setMonthIndex(monthIndex + (diffMonth))
            localStorage.setItem('index', JSON.stringify(monthIndex + (diffMonth)));
        }
    };

    useEffect(() => {
        difference();
    }, [startDate])

    return (
        <div className='sidebar'>
            <h2 className='header'>Calendar</h2>
            <div>
                <button className='btn' onClick={decreaseIndex}>
                    &lt;
                </button>
                <div className='date'>
                    {now}
                </div>
                <button className='btn' onClick={increaseIndex}>
                    &gt;
                </button>
                <DatePicker
                    selected={startDate}
                    onChange={(date: Date) => setStartDate(date)}
                    dateFormat="MMMM yyyy"
                    showMonthYearPicker
                    className='datepicker'
                />
            </div>
            <p>
                Add task
            </p>
        </div>
    );
};

export default Sidebar;