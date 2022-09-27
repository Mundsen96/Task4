export function transformToRegister(data) {
  let postData = [...data];
  let user = {
    name: postData[0].value,
    email: postData[1].value,
    password: postData[2].value
  }
  if(postData[2].value === postData[3].value){
    return user;
  }else{
    return false;
  }
}
export function transformToLogin(data) {
  let postData = [...data];
  let user = {
    name: postData[0].value,
    email: postData[1].value,
    password: postData[2].value
  }
  return user;
}

export function handleInputs(data){
  let inputs = [...data];
  let checkedInputs = inputs.filter(input => {
    return input.checked === true;
  });
  return checkedInputs;
}

export function handleToPost(state, data, type){
  if(!type){
    let newArray = state.filter(
      (ar) => !data.find((rm) => rm.id === ar._id)
    );
    return newArray.map((user, index) => Object.assign({}, user, { id: index + 1 }))
  }else{
  return state.map((row) => {
      return !data.find((el) => el.id === row._id)
        ? row
        : { ...row, status: type };
    });
  }
}