import { account } from "./account"
import { EOevent } from "./eo.type"

export interface StaffTable{
    No: number, // Số thứ tự bắt đầu từ 1
    Name: string, // Tên sự kiện
    Status: string,
    Event: string,
    Attendance: React.ReactNode, // Biểu tượng đánh dấu đã điểm danh
    SendFeedback: React.ReactNode,
}

export interface checkingStaff {
    id: number,
    account: account,
    event: EOevent,
}

export interface attendance {
    id: number, 
    status: string, 
    ticket: ticket,
    eventId: number,
    eventName: string,
    price: number,
    eventEndDate: string,
    description: string,
}
export interface ticket {
    id: number, 
    quantity: number, 
    createdDate: string, 
    expiredDate: string,
    status: string,
    eventName: string,
    price: number,
    description: string,
    eventEndDate: string,
    cart: cart,
    visitor: visitor,
}
export interface cart {
    cartId: number,
    visitor: visitor,
}
export interface visitor {
    information: null, 
    account_id: number,
    id: number,
}