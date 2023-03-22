import { PaimaParser } from 'paima-sdk/paima-utils';
import type { ParsedSubmittedInput } from './types';

const myGrammar = `
createdLobby        = c|numOfRounds|roundLength|playTimePerPlayer|isHidden?|isPractice?|playerOneIsWhite?
joinedLobby         = j|*lobbyID
closedLobby         = cs|*lobbyID
submittedMoves      = s|*lobbyID|roundNumber|pgnMove
zombieScheduledData = z|*lobbyID
userScheduledData   = u|*user|result
`;

const parserCommands = {
  createdLobby: {
    numOfRounds: PaimaParser.NumberParser(3, 1000),
    roundLength: PaimaParser.DefaultRoundLength(),
    playTimePerPlayer: PaimaParser.NumberParser(1, 10000),
    isHidden: PaimaParser.TrueFalseParser(false),
    isPractice: PaimaParser.TrueFalseParser(false),
    playerOneIsWhite: PaimaParser.TrueFalseParser(true),
  },
  joinedLobby: {
    lobbyID: PaimaParser.NCharsParser(12, 12),
  },
  closedLobby: {
    lobbyID: PaimaParser.NCharsParser(12, 12),
  },
  submittedMoves: {
    lobbyID: PaimaParser.NCharsParser(12, 12),
    roundNumber: PaimaParser.NumberParser(1, 10000),
    pgnMove: PaimaParser.RegexParser(/^[a-zA-Z0-9 ]+$/),
  },
  zombieScheduledData: {
    renameCommand: 'scheduledData',
    effect: 'zombie',
    lobbyID: PaimaParser.NCharsParser(12, 12),
  },
  userScheduledData: {
    renameCommand: 'scheduledData',
    effect: 'stats',
    user: PaimaParser.WalletAddress(),
    result: PaimaParser.RegexParser(/^[w|t|l]$/),
  },
};

const myParser = new PaimaParser(myGrammar, parserCommands);

function parse(s: string): ParsedSubmittedInput {
  try {
    const parsed = myParser.start(s);
    return { input: parsed.command, ...parsed.args } as any;
  } catch (e) {
    console.log(e, 'Parsing error');
    return { input: 'invalidString' };
  }
}

export default parse;