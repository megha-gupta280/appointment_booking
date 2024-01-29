import axios from "axios"

export const getTimeSlots = (payload, cb) => {
    return (dispatch) => {
        axios.get(`https://app.appointo.me/scripttag/mock_timeslots?start_date=${payload.start_time}&end_date=${payload.end_time}`)
        .then((response) => {
            dispatch({ type: "TIME_SLOTS", payload: response.data });
            console.log(response, "show response");
            if (cb) {
                cb();
            }
        })
        .catch((error) => {
            console.error(error);
            if (cb) {
                cb();
            }
        });
    };
};