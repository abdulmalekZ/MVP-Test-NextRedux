import { combineReducers } from "redux";

import reports from "@redux/slices/reports";
import filters from "@redux/slices/filters";

const rootReducer = combineReducers({ reports, filters });

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
