## use to create a new git repo in project

           git init


## check git version

        git --version


---

# it use for set the global lable configuration associated with github

     git config --global user.name "NAME"
     git config --global user.email  "example24@gmail.com"
     git config --global --list   |   use to check global  user detail
     git config --list | if you set local repository config it command show local user config

## check the history of commit

    git log

## cloning a repository our local

      git clone URL                  |

## move in repository

     cd RepoName                    |

## repo use to link the remote

    git remote add origin (URL)    |

## check the remote repo

    git remote -v                  |

## rename the branch name

        git branch -m newname           |

## check current branch

    git branch                     |

## switch the new branch

       git checkout branchname         |

## create new branch and switch

      git checkout -b branchname      |

## delete branch but we can not delete current working branch

      git branch -d branch name   |

## add the untacked new file in git staging area

        git add FileName                            |

## commit and apply the changes in git

      git commit -m "some meaning full massage"   |

## upload lacal repo content to remote repo

      git push origin main  |

## -u upstream long time use project all operation push on origin

    git push -u origin main   |
    git push is a command , origin is copy of remote GitHub repo ,main is branch name

## compare current branch and newbranch

git diff newbranch |

## merge the current branch with newbranch

      git merge newbranch     |

## PR | pull request main branch me add krne ke liye senior comment bhi kr sakte hai this PR why use

PR request accept hone ke baad
local pr changes abhi bhi nhi huye honge

## As changes have GitHub remote repo download containt on local

    git pull origin main

## Merge Conflicts An even that place when git is unable to automatically diffrences In code between tow commit konsi branch ke change rakhne hai

## Retore add file use before commite and after add

    git reset filename
    gut reset (using for all add file revert)

## after commit

    git reset HEAD~1
    latest commit revert and commit name bydefault head

## fork is a rough copy of GitHub project
