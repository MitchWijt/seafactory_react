import axios from 'axios';

export const getAmountDue = async (registrationId, airTanks = 0, nxTanks = 0, discount = 0) => {
    const getTotalCost = await axios.get(`/registration/total-cost?id=${registrationId}&air=${airTanks}&nitrox=${nxTanks}&discount=${discount}`);
    return getTotalCost.data.total;
}