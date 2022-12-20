/**
 * 给你一手无序的扑克牌, 判断这手牌里是否有同花顺
 */
export type Poker = {
  color: 1 | 2 | 3 | 4;
  size: number;
};
export function hasSequence(pokers: Poker[]): boolean {
  pokers.sort((a, b) => {
    if (a.color > b.color) {
      return 1;
    } else if (a.color < b.color) {
      return -1;
    } else {
      if (a.size > b.size) {
        return 1;
      } else if (a.size < b.size) {
        return -1;
      } else {
        return 0;
      }
    }
  });

  let arr: Poker[] = [];
  let right = 0;

  while (right < pokers.length) {
    const lastCard = arr.length > 0 ? arr[arr.length - 1] : null;
    const card = pokers[right];
    if (
      lastCard &&
      card.color === lastCard.color &&
      card.size === lastCard.size + 1
    ) {
      arr.push(card);
    } else {
      arr = [card];
    }
    if (arr.length >= 5) {
      return true;
    }
    right++;
  }

  return false;
}
