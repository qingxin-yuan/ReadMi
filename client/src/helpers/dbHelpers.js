import { firebaseDB } from "../config/firebaseConfig";


// NOTE: ref.once() can be extracted into helper fns, but ref.on() can be tricky as it takes in 2 params
async function getAllUsersName() {
  const ref = await firebaseDB.ref(`users/`);

  ref.on("value", snapshot => {
    return snapshot.val();
  });
}




export { getAllUsersName };
