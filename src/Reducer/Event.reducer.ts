import { createReducer } from "@reduxjs/toolkit";
import { Event } from "../Types/event.type"
import { initialEventList } from "../Constants/event";

// interface là dùng để tạo một kiễu dữ liệu mà typescript support
// tìm kiếm trong type.ts 
interface EventState {
    eventList: Event[]
}


const initialState: EventState = {
    eventList: initialEventList
}
// builder là xử lý những gì nhỉ ? 
// 1. Tạo Reducer đầu tiên 

const eventReducer = createReducer(initialState, builder => {

})

export default eventReducer