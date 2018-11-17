/**
 * Returns the index and content of the object with matching id in arraylist
 * @param {*} id
 * @param {*} arraylist
 */
export function getInfo(id, arraylist) {
  const target = arraylist.find(t => t.id === id);
  const index = arraylist.indexOf(target);
  return { index: index, info: target };
}

/**
 * TODO: Id close to each other should be very different, give same color each time
 * Seeded random?
 * Should give a color from list based on modulo of layer id
 */
export function getColor(id) {
  var x = Math.round(0xffffff * Math.random()).toString(16);
  var y = 6 - x.length;
  var z = "000000";
  var z1 = z.substring(0, y);
  return "#" + z1 + x;
}
/**
 * Checks if the input is a number, removes all parts of the inputvalue which are not numbers
 * Currently returns empty string if input is empty. Can return defaultvalue instead
 */
export function validateNumberInput(inputValue, defaultValue) {
  if (inputValue.length === 0) {
    return "";
  }
  let newValue = "";
  for (let i = 0; i < inputValue.length; i++) {
    let char = inputValue.charAt(i);
    //Check if the char is a number
    if (!isNaN(Number(char))) {
      newValue += char;
    }
  }
  return newValue.length > 0
    ? Number(newValue)
    : defaultValue !== null
    ? defaultValue
    : "";
}
