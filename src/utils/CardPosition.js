import TaskPositionEnum from "../enums/TaskPositionEnum";

const seed = 32000;

// export const CardPosition = {
// export default CardPosition = {
//   methods: {
//     ChangePos(tasks, pos) {
export const cardPosition = (tasks, pos) => {
  if (tasks.length === 0) {
    return seed;
  }

  let position = pos;
  if (pos < 0 || pos === TaskPositionEnum.TOP) {
    position = 0;
  } else if (pos > tasks.length || pos === TaskPositionEnum.BOTTOM) {
    position = tasks.length;
  }

  const firstItem = tasks[position - 1];
  const secondItem = tasks[position];
  if (!firstItem) {
    return secondItem.pos / 2;
  }
  if (!secondItem) {
    return firstItem.pos + firstItem.pos / 2;
  }

  return (firstItem.pos + secondItem.pos) / 2;
  //     },
  //   },
};

export default {
  cardPosition,
};
