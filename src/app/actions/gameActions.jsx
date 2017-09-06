import axios from 'axios';

export function testFunc(value) {
  return {
    type: "EDIT_TEST",
    payload: value
  }
}