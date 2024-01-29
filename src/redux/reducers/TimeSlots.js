
const initialState = {
    slots: [],
}

const TimeSlots = (state = initialState, { type, payload})=>{
    switch(type){
        case "TIME_SLOTS": return {...state, slots: payload}
        default: return state
    }
}

export default TimeSlots;