import { useState } from "react"
import { TicketList } from "./TicketList.js"
import { TicketSearch } from "./TicketSearch.js"

export const TicketContainer = () => {
    const [searchTerms, setSearchTerms] = useState("")

    return <>
        <TicketSearch setterFunction={setSearchTerms}/> {/* Sibiling component with TicketList */}
        <TicketList searchTermsState={searchTerms}/> {/* Sibiling component with TicketSearch */}
    </>
}

/*
    TicketSearch and TicketList are sibling components. Child components of the
    TicketContainer parent. This allows the states to pass to the two children
    components (via the shared parent-component).
*/