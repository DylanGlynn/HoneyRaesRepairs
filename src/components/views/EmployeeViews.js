import { Outlet, Route, Routes } from "react-router-dom"
import { CustomerDetails } from "../customers/CustomerDetails.js"
import { CustomerList } from "../customers/CustomerList.js"
import { EmployeeDetails } from "../employees/EmployeeDetails.js"
import { EmployeeList } from "../employees/EmployeeList.js"
import { TicketContainer } from "../tickets/TicketContainer.js"

export const EmployeeViews = () => {
    return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1>Honey Rae Repair Shop</h1>
                    <div>Your one-stop-shop to get all your electronics fixed</div>

                    <Outlet />
                </>
            }>

                <Route path="tickets" element={<TicketContainer />} />
                <Route path="employees" element={<EmployeeList />} />
                <Route path="employees/:employeeId" element={<EmployeeDetails />} />
                <Route path="customers" element={<CustomerList />} />
                <Route path="customers/:customerId" element={<CustomerDetails />} />
            </Route>
        </Routes>
    )
}