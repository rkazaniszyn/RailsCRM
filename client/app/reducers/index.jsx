// This file is our manifest of all reducers for the app.
// See also /client/app/bundles/HelloWorld/store/Store.jsx
// A real world app will likely have many reducers and it helps to organize them in one file.
import helloWorldReducer from './helloWorldReducer';
import recordsReducer from './RecordsReducer';
import uiReducer from './UIReducer';
import recordReducer from './RecordReducer';
import metadataReducer from './MetadataReducer';
import userReducer from './UserReducer';
import {reducer as toastrReducer} from 'react-redux-toastr'

export default {
  name: helloWorldReducer,
  records: recordsReducer,
  record: recordReducer,
  ui: uiReducer,
  metadata: metadataReducer,
  user: userReducer,
  toastr: toastrReducer
};