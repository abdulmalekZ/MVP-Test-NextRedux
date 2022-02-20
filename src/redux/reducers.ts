import { combineReducers } from "redux";

import counter from "@redux/slices/counter";
import reports from "@redux/slices/reports";
import filters from "@redux/slices/filters";

const rootReducer = combineReducers({ counter, reports, filters });

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
