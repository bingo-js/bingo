export const cliMessages: Record<CliMessageType, string> = {
  done: `Done. Enjoy your updated repository! 💝`,
  exiting: 'Exiting - maybe another time? 👋',
  leaving: 'Leaving changes to the local directory on disk. 👋',
  new: `Done. Enjoy your new repository! 💝`,
  ok: 'Cheers! 💝',
};
export type CliMessageType = 'done' | 'exiting' | 'leaving' | 'new' | 'ok';
