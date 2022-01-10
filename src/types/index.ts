export type ResCommit = {
  sha: string;
  commit: {
    committer: {
      date: string;
    };
  };
};

export type Commit = {
  sha: string;
  date: string;
};
