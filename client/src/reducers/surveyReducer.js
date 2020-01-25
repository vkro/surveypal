const SET_SURVEY = "SET_SURVEY";
const SET_NEXT_QUESTION = "SET_NEXT_QUESTION";
const SET_CHECKED = "SET_CHECKED";
const SET_QUESTION_RESPONSE = "SET_QUESTION_RESPONSE";

export { 
  SET_SURVEY,
  SET_NEXT_QUESTION,
  SET_CHECKED,
  SET_QUESTION_RESPONSE
};

export default function reducer(state, action) {
  // initalize the survey by setting the survey passed in 
  // from app => index => useSurveyData
  if (action.type === SET_SURVEY) {
    
    const first_question = action.value.questions[0].question
    first_question['serial_order'] = action.value.questions[0].serial_order
    const first_question_options = action.value.questions[0].options
    const survey_length = action.value.questions.length
    return ({
      ...state,
      current_survey: action.value,
      survey_length: survey_length,
      current_question: first_question,
      current_options: first_question_options
    });
  };
  // set which options have been selected for multiple choice questions
  if (action.type === SET_CHECKED) {
    return ({
      ...state,
      checked: action.value
    })
  }
  // sets current question based on question navigation
  if (action.type === SET_NEXT_QUESTION) {
    const next_question = action.value.question
    next_question.serial_order = action.value.serial_order
    return({
      ...state,
      current_question: next_question,
      current_options: action.value.options,
      checked: [0]
    })
  };

  throw new Error(
    `tried to reduce with unsupported action type: ${action.type}`
  );

};