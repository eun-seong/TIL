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
  prevSha: string | null;
};

export type ResCommitDiff = {
  files: CommitDiff[];
};

export type CommitDiff = {
  sha: string;
  filename: string;
  status: 'modified' | 'added' | 'deleted';
  patch: string;
};
