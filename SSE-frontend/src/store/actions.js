import { getAssets, subscribeToUpdates } from '../services/data.service';
export const GET_INITIAL_DATA_SUCCESS = 'GET_INITIAL_DATA_SUCCESS';
export const DATA_UPDATED = 'DATA_UPDATED';


export const getInitialData = () => {
    return async (dispatch) => {
        // side effect
        const assets = await getAssets();
        subscribeToUpdates(dataUpdated, dispatch);

        // dispatch event
        dispatch({
            type: GET_INITIAL_DATA_SUCCESS,
            payload: assets
        });
    }
}

const dataUpdated = (event, dispatch) => {
    const parsedData = JSON.parse(event.data);
    dispatch({
        type: DATA_UPDATED,
        payload: parsedData
    })
};