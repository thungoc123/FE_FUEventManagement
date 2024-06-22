import { useState } from "react"
import PaymentMethod from "../Molecules/PaymentMethod"
import { Footer } from "../Organisms/Guest/FooterPayment"
import HeaderTable from "../Organisms/Guest/HeaderTable"
import { NavbarCheckout } from "../Organisms/Visitor/NavbarCheckout"
export const Payment = () => {

  return (

    <>
      <NavbarCheckout />
      <HeaderTable />
      <Footer />
    </>
  )
}