export const isZipCode = (target: string) =>
  /^(\d{0,7}|\d{0,3}|\d{3}-\d{0,4})$/.test(target);

export const isCompleteZipCode = (target: string) =>
  /^(\d{7}|\d{3}-\d{4})$/.test(target);

export const sanitazeZipCode = (target: string) => target.replace(/-/, "");
