export const ADD_EMAIL = 'ADD_EMAIL';
export const CHOOSE_PLAN = 'CHOOSE_PLAN';

export const addEmail = (email) => {
    return {
        type: ADD_EMAIL,
        payload: {
            email: email
        }
    }
}

export const choosePlan = (premiumPlan) => {
    return {
        type: CHOOSE_PLAN,
        payload: {
            currentChosenPremiumPlan: premiumPlan
        }
    }
}