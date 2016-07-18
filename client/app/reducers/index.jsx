// This file is our manifest of all reducers for the app.
// See also /client/app/bundles/HelloWorld/store/Store.jsx
// A real world app will likely have many reducers and it helps to organize them in one file.
import helloWorldReducer from './helloWorldReducer';
import recordsReducer from './recordsReducer';

export default {
  name: helloWorldReducer,
  records: recordsReducer
};