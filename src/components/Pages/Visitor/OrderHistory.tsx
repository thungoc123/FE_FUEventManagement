import { useState } from "react"
import OrderHistoryTable from "../../Organisms/Visitor/OrderHistoryTable"
import { NavbarCheckout } from "../../Organisms/Visitor/NavbarCheckout"
import { Footer } from "../../Organisms/Guest/FooterPayment"
// import PaymentMethod from "../Molecules/PaymentMethod"
// import { Footer } from "../Organisms/Guest/FooterPayment"
// import HeaderTable from "../Organisms/Guest/HeaderTable"
// import { NavbarCheckout } from "../Organisms/Visitor/NavbarCheckout"
// import { Table1 } from "../Organisms/Guest/HeaderTableHistory"
// import OrderHistoryTable from "../Organisms/Visitor/OrderHistoryTable"

export const OrderHistory = () => {

  return (

    <>
      <NavbarCheckout />
      <OrderHistoryTable />
      <Footer />
    </>
  )
}