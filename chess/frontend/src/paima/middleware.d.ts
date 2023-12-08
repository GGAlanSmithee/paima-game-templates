import { userWalletLoginWithoutChecks, updateBackendUri, getRemoteBackendVersion } from '@paima/sdk/mw-core';
declare const endpoints: {
    createLobby: (numberOfRounds: number, roundLength: number, playTimePerPlayer: number, botDifficulty: number, isHidden?: boolean, isPractice?: boolean, playerOneIsWhite?: boolean) => Promise<import("./types").CreateLobbySuccessfulResponse | import("@paima/sdk/mw-core").FailedResult>;
    joinLobby: (lobbyID: string) => Promise<import("@paima/sdk/mw-core").OldResult>;
    closeLobby: (lobbyID: string) => Promise<import("@paima/sdk/mw-core").OldResult>;
    submitMoves: (lobbyID: string, roundNumber: number, move: string) => Promise<import("./types").PackedLobbyState | import("@paima/sdk/mw-core").FailedResult>;
    getUserStats: (walletAddress: string) => Promise<import("./types").PackedUserStats | import("@paima/sdk/mw-core").FailedResult>;
    getLobbyState: (lobbyID: string) => Promise<import("./types").PackedLobbyState | import("@paima/sdk/mw-core").FailedResult>;
    getLobbySearch: (wallet: string, searchQuery: string, page: number, count?: number | undefined) => Promise<import("./types").LobbyStates | import("@paima/sdk/mw-core").FailedResult>;
    getRoundExecutionState: (lobbyID: string, round: number) => Promise<import("./types").PackedRoundExecutionState | import("@paima/sdk/mw-core").FailedResult>;
    getRandomOpenLobby: () => Promise<import("./types").PackedLobbyState | import("@paima/sdk/mw-core").FailedResult>;
    getOpenLobbies: (wallet: string, page: number, count?: number | undefined) => Promise<import("./types").LobbyStates | import("@paima/sdk/mw-core").FailedResult>;
    getUserLobbiesMatches: (walletAddress: string, page: number, count?: number | undefined) => Promise<import("./types").PackedUserLobbies | import("@paima/sdk/mw-core").FailedResult>;
    getNewLobbies: (wallet: string, blockHeight: number) => Promise<import("./types").NewLobbies | import("@paima/sdk/mw-core").FailedResult>;
    getMatchWinner: (lobbyId: string) => Promise<import("@paima/sdk/mw-core").Result<import("@chess/utils").MatchWinnerResponse>>;
    getRoundExecutor: (lobbyId: string, roundNumber: number) => Promise<import("@paima/sdk/mw-core").Result<import("@paima/executors").RoundExecutor<import("@chess/game-logic").MatchState, import("@chess/game-logic").TickEvent>>>;
    getMatchExecutor: (lobbyId: string) => Promise<import("@paima/sdk/mw-core").Result<import("@paima/executors").MatchExecutor<import("@chess/game-logic").MatchState, import("@chess/game-logic").TickEvent>>>;
    exportLogs: () => string;
    pushLog: (message: any, ...optionalParams: any[]) => void;
    getLatestProcessedBlockHeight: () => Promise<import("@paima/sdk/mw-core").Result<number>>;
    userWalletLogin: (loginInfo: import("@paima/sdk/mw-core").LoginInfo, setDefault?: boolean | undefined) => Promise<import("@paima/sdk/mw-core").Result<import("@paima/sdk/mw-core").Wallet>>;
    checkWalletStatus: () => Promise<import("@paima/sdk/mw-core").OldResult>;
};
export * from './types';
export type * from './types';
export { userWalletLoginWithoutChecks, updateBackendUri, getRemoteBackendVersion };
export default endpoints;
