import styles from "./ScheduleMeeting.module.css";

const ScheduleMeeting = ({ handleSubmit }) => {

    return (
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: "0.5rem", width: "80%" }}>
            <label className={styles.label} for="fname">Name</label>
            <input className={styles.input} type="text" id="fname" name="fname"></input>
            <label className={styles.label} for="email">Email</label>
            <input className={styles.input} type="email" id="email" name="email"></input>
            <label className={styles.label} for="reason">Help us with reason.</label>
            <textarea className={styles.input} type="text" id="reason" name="reason"></textarea>
            <button className={styles.submit} type="submit">Confirm</button>
        </form>)
}

export default ScheduleMeeting;