export default function reducer(state = {
  testProp: '',
}, action) {

  switch(action.type) {

    case "EDIT_TEST": {
      return {
        ...state,
        allDocuments: action.payload
      }
    }

  return state;
}
