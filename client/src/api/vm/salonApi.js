import axios from "../axios"

const GET_SALONS = '/vm/salons'

export const getSalons = async () => {
    const token = localStorage.getItem('vm');
    try {
        const { data } = await axios.get(GET_SALONS, {
            headers: {
                Authorization: token
            }
        });
        return data;
    } catch (err) {
        console.log(err.message);
        throw err;
    }
}