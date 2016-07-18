export default function helloWorldReducer(state = 'bill', action) {
  const { type, name } = action;
  switch (type) {
    case 'HELLO_WORLD_NAME_UPDATE':
      return name;

    default:
      return state;
  }
}