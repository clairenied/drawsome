

export const dateFormatted = function(aDate)  {
  let months = ['Jan','Feb','March','April','May','June','July','Aug','Sept','Oct','Nov','Dec'];
  let form = '';
  form+=months[+aDate.slice(5,7)-1];
  form+=' '+[+aDate.slice(8,10)]
  form+=' '+[aDate.slice(0,4)]
  return form;
}
