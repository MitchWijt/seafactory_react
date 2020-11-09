export const SET_STAFF_MEMBERS = 'SET_STAFF_MEMBERS';
export const SET_CHOSEN_STAFF_MEMBERS = 'SET_CHOSEN_STAFF_MEMBERS';

export const setStaffMembers = (staffMembers) => {
    return {
        type: SET_STAFF_MEMBERS,
        payload: {
            staffMembers: staffMembers
        }
    }
}

export const setChosenStaffMembers = (staffMembers) => {
    return {
        type: SET_CHOSEN_STAFF_MEMBERS,
        payload: {
            chosenStaffMembers: staffMembers
        }
    }
}