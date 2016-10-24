import {SET_CURRENT_SUM, EVALUATE_RESULT} from '../constants'

export function setCurrentSum(sum){
  return {
    type: SET_CURRENT_SUM,
    sum
  }
};

export function evaluateResult(result, playerAnswer){
  return {
    type: EVALUATE_RESULT,
    result, playerAnswer
  }
}