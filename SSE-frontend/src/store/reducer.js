import * as ActionTypes from './actions';

const initialState = {
    stockData: [],
    columns: [
        {
            Header: "Id",
            accessor: "id",
        },
        {
            Header: "Asset Name",
            accessor: "assetName",
        },
        {
            Header: "Asset Price",
            accessor: "price",
        },
        {
            Header: "Last Updated",
            accessor: "lastUpdate",
        },
        {
            Header: "Asset Type",
            accessor: "type",
        },
    ]
};

export const stockReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.GET_INITIAL_DATA_SUCCESS:
            return {
                ...initialState,
                stockData: [...action.payload]
            };
        case ActionTypes.DATA_UPDATED:
            return {
                ...initialState,
                stockData: state.stockData.map(function (item) { if (item.id === action.payload.id) { return action.payload } else { return item } })
            };
        default:
            return state;
    }
}