import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"

export const TicketEdit = () => {
    const { ticketId } = useParams()
    const [ticket, update] = useState({
        description: "",
        emergency: false
    })
    const navigate = useNavigate()

    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)

    useEffect(() => {
        fetch(`http://localhost:8088/serviceTickets/${ticketId}`)
            .then(response => response.json())
            .then((data) => {
                update(data)
            })
    }, [ticketId])

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        // TODO: Perform the fetch() to POST the object to the API
        return fetch(`http://localhost:8088/serviceTickets/${ticket.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(ticket)
        })
            .then(response => response.json())
            .then(() => {
                navigate("/tickets")
            })
    }

    return (
        <form className="ticketForm">
            <h2 className="ticketForm__title">New Service Ticket</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea
                        required autoFocus
                        type="text"
                        style={{
                            height: "10rem"
                        }}
                        className="form-control"
                        placeholder="Brief description of problem"
                        value={ticket.description}
                        onChange={
                            (evt) => {
                                const copy = { ...ticket }
                                copy.description = evt.target.value
                                update(copy)
                            }
                        }>{ticket.description}</textarea>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Emergency:</label>
                    <input type="checkbox"
                        checked={ticket.emergency}
                        value={ticket.emergency}
                        onChange={
                            (evt) => {
                                const copy = { ...ticket }
                                copy.emergency = evt.target.checked
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                Submit Ticket
            </button>
        </form>
    )
}