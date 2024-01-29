import { useCallback, useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';
import { format, compareAsc } from "date-fns";
import { getTimeSlots } from '../redux/actions/TimeSlots';
import { useDispatch, useSelector } from 'react-redux';
import { startOfMonth, endOfMonth } from 'date-fns';
import ScheduleMeeting from './ScheduleMeeting';
import Loader from './Loader';
import styles from "./Home.module.css";
import '@fortawesome/fontawesome-free/css/all.min.css';

const Home = () => {

    const dispatch = useDispatch();

    const slots = useSelector((state) => state.slots)


    const currentDate = new Date();
    const startDate = startOfMonth(currentDate);
    currentDate.setMonth(currentDate.getMonth() + 1)
    const endDate = startOfMonth(currentDate.setMonth(currentDate.getMonth()));

    const formattedStartDate = format(startDate, 'yyyy-MM-dd');
    const formattedEndDate = format(endDate, 'yyyy-MM-dd');

    const [selectedMonthDates, setSelectedMonthDates] = useState({ start_time: formattedStartDate, end_time: formattedEndDate })
    const [selectedDate, setSelectedDate] = useState()
    const [selectedDateSlots, setSelectedDateSlots] = useState([])
    const [selectedTime, setSelectedTime] = useState();
    const [loader, setLoader] = useState(false)
    const [confirmedSlots, setConfirmedSlots] = useState([])


    useEffect(() => {
        const payload = {
            start_time: selectedMonthDates.start_time,
            end_time: selectedMonthDates.end_time,
        }
        setLoader(true)
        dispatch(getTimeSlots(payload, () => {
            setLoader(false)
        }))
    }, [getTimeSlots, dispatch, selectedMonthDates, setLoader])

    const getMonthStartDate = (date) => {
        return format(new Date(date.getFullYear(), date.getMonth(), 1), "yyyy-MM-dd");
    }

    const getMonthEndDate = (date) => {
        return format(new Date(date.getFullYear(), date.getMonth() + 1, 1), "yyyy-MM-dd");
    }

    const handleActiveStartDateChange = useCallback(({ activeStartDate, view }) => {
        if (view === 'month') {
            const startDate = getMonthStartDate(activeStartDate);
            const endDate = getMonthEndDate(activeStartDate);
            setSelectedMonthDates({ start_time: startDate, end_time: endDate })
        }
    }, [getMonthStartDate, getMonthEndDate, setSelectedMonthDates])

    const onChange = useCallback((e) => {
        const date = format(e, "yyyy-MM-dd")
        setSelectedDate(date)
    }, [setSelectedDate])

    useEffect(() => {
        const selectedDateSlots = slots.find((date) => {
            return date.date == selectedDate
        })
        setSelectedDateSlots(selectedDateSlots?.slots)

    }, [selectedDate, slots, setSelectedDateSlots])

    const handleScheduleMeeting = useCallback((time) => {
        setSelectedTime(time)
    }, [setSelectedTime])

    const handleSubmit = (e) => {
        e.preventDefault()
        if (e.target.fname.value && e.target.email.value && e.target.reason.value) {
            alert("Appointment Confirmed")
            setConfirmedSlots(prev => ([...prev, { date: selectedDate, time: selectedTime }]))
            setSelectedTime()
        } else {
            alert("Please fill all the details")
        }
    }

    return (<div className={styles.card}>
        <div style={{ display: "flex", flexDirection: "row", backgroundColor: "#EBEBF0", borderRadius: "8px 8px 0 0" }}>
            <div style={{ padding: "8px" }}>
                <p>Select a Date and Time</p>
                <Calendar
                    minDate={new Date()}
                    onActiveStartDateChange={handleActiveStartDateChange}
                    onChange={onChange}
                />

            </div>

            {selectedDate && <div style={{ width: "500px", height: "400px", backgroundColor: "#ffffff", display: "flex", alignItems: "center", flexDirection: "column", justifyContent: "center", borderRadius: "0 8px 0 0" }}>
                {selectedTime ? <ScheduleMeeting handleSubmit={handleSubmit} /> : loader ?
                    <Loader />
                    : <>
                        {selectedDate && selectedDateSlots?.length ? <> <h3>{format(selectedDate, "EEEE, LLL d")} - Available Slots</h3>
                            <div style={{ display: "flex", flexDirection: "column", alignItems: 'center', maxHeight: "300px", overflow: "auto" }}>
                                {
                                    selectedDateSlots?.map((slot) => {
                                        return (<button

                                            disabled={!!confirmedSlots.find((confirmedSlot) => confirmedSlot.date === selectedDate && JSON.stringify(confirmedSlot.time) === JSON.stringify(slot))}
                                            className={styles.slotButton}
                                            onClick={() => handleScheduleMeeting(slot)}>
                                            <div>{format(new Date(slot?.start_time), "p")} - {format(new Date(slot?.end_time), "p")}</div>
                                            {!!confirmedSlots.find((confirmedSlot) => confirmedSlot.date === selectedDate && JSON.stringify(confirmedSlot.time) === JSON.stringify(slot)) && <i class="fa-regular fa-circle-check"></i>}
                                        </button>)
                                    })
                                }
                            </div> </> : <div>Please Select a Date on Calendar</div>}
                    </>
                }



            </div>}

        </div>
        <div style={{ height: "100px", backgroundColor: "#378760", borderRadius: "0 0 8px 8px" }}>
        </div>

    </div>)
}

export default Home;