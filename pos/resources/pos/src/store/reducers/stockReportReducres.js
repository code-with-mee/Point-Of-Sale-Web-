import {stockReportActionType} from '../../constants';

export default (state = [], action) => {
    switch (action.type) {
        case stockReportActionType.STOCK_REPORT:
            return action.payload;
        default:
            return state;
    }
};
