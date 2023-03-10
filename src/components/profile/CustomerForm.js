import { useEffect, useState } from "react"

export const CustomerForm = () => {
    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)

    const [profile, updateProfile] = useState({
        address: "",
        phoneNumber: "",
        userId: 0
    })

    const [feedback, setFeedback] = useState("")

    useEffect(() => {
        if (feedback !== "") {
            setTimeout(() => setFeedback(""), 3000);
        }
    }, [feedback])

    useEffect(() => {
        fetch(`http://localhost:8088/customers?userId=${honeyUserObject.id}`)
            .then(response => response.json())
            .then((data) => {
                const customerObject = data[0]
                updateProfile(customerObject)
            })
    }, [])

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        return fetch(`http://localhost:8088/customers/${profile.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(profile)
        })
            .then(response => response.json)
            .then(() => {
                setFeedback("Customer profile successfully saved")
            })
    }

    return (
        <form className="profile">
            <h2 className="profile__title">Update Profile</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="address">Address:</label>
                    <input
                        required
                        type="text"
                        className="form-control"
                        value={profile.address}
                        onChange={
                            (evt) => {
                                const copy = { ...profile }
                                copy.address = evt.target.value
                                updateProfile(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="phoneNumber">Phone Number:</label>
                    <input
                        required
                        type="text"
                        className="form-control"
                        value={profile.phoneNumber}
                        onChange={
                            (evt) => {
                                const copy = { ...profile }
                                copy.phoneNumber = evt.target.value
                                updateProfile(copy)
                            }
                        } />
                </div>
            </fieldset>
            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-prmary">
                    Save Profile
                </button>
                <div className={`${feedback.includes("Error") ? "error" : "feedback"}
                ${feedback === "" ? "invisible" : "visible"}`}>
                    {feedback}
                </div>
        </form>
    )
}