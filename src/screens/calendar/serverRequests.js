import axios from 'axios';

export const fetchCalendarItemsByDate = async (date) => {
    const response = await axios.get(`/calendar?date=${date}`);
    return response;
}

export const fetchCalendarItemById = async (id) => {
    const response = await axios.get(`/calendar?id=${id}`);
    return response.data;
}

export const fetchCalendarItemCategories = async () => {
    const response = await axios.get(`/calendar/categories`);
    return response;
}

export const removeCalendarItemById = async (id) => {
    const response = await axios.delete(`/calendar?id=${id}`);
    return response;
}