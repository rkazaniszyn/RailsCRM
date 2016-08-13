import recordsReducer from './RecordsReducer';
import uiReducer from './UIReducer';
import recordReducer from './RecordReducer';
import metadataReducer from './MetadataReducer';
import userReducer from './UserReducer';
import {reducer as toastrReducer} from 'react-redux-toastr'
import { pendingTasksReducer } from 'react-redux-spinner';

export default {
  records: recordsReducer,
  record: recordReducer,
  ui: uiReducer,
  metadata: metadataReducer,
  user: userReducer,
  toastr: toastrReducer,
  pendingTasks: pendingTasksReducer,
};