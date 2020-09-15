import moment from 'moment-timezone';

export const FormatDate = (date) => {
    return moment(date).format('MMMM Do YYYY');
}