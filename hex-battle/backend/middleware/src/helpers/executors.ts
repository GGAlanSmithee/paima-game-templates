import type { MatchExecutor, RoundExecutor } from '@paima/sdk/executors';
import { matchExecutor } from '@paima/sdk/executors';
import Prando from '@paima/sdk/prando';

import type { MatchState, TickEvent } from '@hexbattle/game-logic';
// import { initialState } from '@hexbattle/game-logic';
import { extractMatchEnvironment, initRoundExecutor, processTick } from '@hexbattle/game-logic';
import type { MatchExecutorData, RoundExecutorData } from '@hexbattle/utils';

export function buildRoundExecutor(
  data: RoundExecutorData,
  round: number
): RoundExecutor<MatchState, TickEvent> {
  const { seed } = data.block_height;
  console.log(seed, 'seed used for the round executor at the middleware');
  const randomnessGenerator = new Prando(seed);
  return initRoundExecutor(
    /* data.lobby, */ round,
    data.match_state,
    [], // data.moves,
    randomnessGenerator
  );
}

// export function buildMatchExecutor(data: MatchExecutorData): MatchExecutor<MatchState, TickEvent> {
//   console.log(data.seeds, 'seeds used for the match executor at the middleware');

//   // const matchState: MatchState = { fenBoard: initialState() };
//   return matchExecutor.initialize(
//     {}, // extractMatchEnvironment(lobby),
//     lobby.num_of_rounds,
//     matchState,
//     seeds,
//     moves,
//     processTick
//   );
// }
