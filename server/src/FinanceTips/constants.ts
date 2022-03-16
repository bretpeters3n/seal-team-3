import { FinanceTip } from './dataStructureFiles/financeTips.interfaces';

export const FINANCETIPS: ReadonlyArray<FinanceTip> = [
  {
    title: 'Money is a terrible master but an excellent servant.',
    author: 'P.T. Barnum',
  },
  {
    title: 'A man who pays his bills on time is soon forgotten.',
    author: 'Oscar Wilde',
  },
  {
    title:
      'The most difficult thing is the decision to act, the rest is merely tenacity.',
    author: 'Amelia Earhart',
  },
  {
    title: 'Beware of little expenses; a small leak will sink a great ship.',
    author: 'Benjamin Franklin',
  },
  {
    title:
      'You cannot escape the responsibility of tomorrow by evading it today.',
    author: 'Abraham Lincoln',
  },
  {
    title:
      'The desire of gold is not for gold. It is for the means of freedom and benefit.',
    author: 'Ralph Waldo Emerson',
  },
  {
    title: 'To contract new debts is not the way to pay old ones.',
    author: 'George Washington',
  },
  { title: 'Fortune befriends the bold.', author: 'Emily Dickinson' },
  {
    title: 'When prosperity comes, do not use all of it.',
    author: 'Confucius',
  },
  {
    title: 'Do the best you can, and don’t take life too serious.',
    author: 'Will Rogers',
  },
] as const;
