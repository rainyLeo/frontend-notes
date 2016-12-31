

- `git init`
	Create an empty Git repository or reinitialize an existing one
- `git add`
	Add file contents to the index. This command updates the index using the current content found in the working tree, to prepare the content staged for the next commit
	
	`git add .`: add all the files in the directory and all subdirectories
	-A: Update the index not only where the working tree has a file matching <pathspec> but also where the index already has an entry. If no <pathspec> is given when -A option is used, all files in the entire working tree are updated
- `git commit`
	Record changes to the repository.Stores the current contents of the index in a new commit along with a log message from the user describing the change
	
	-m 'msg': Use the given 'msg' as the commit message
- `git push`
	Updates remote refs using local refs, while sending objects necessary to complete the given refs.
	
	-f(--force): Usually, the command refuses to update a remote ref that is not an ancestor of the local ref used to overwrite it.This flag disables these checks, and can cause the remote repository to lose commits 
- `git clone`
	Clone a repository into a new directory
- `git fetch`
	Download objects and refs from another repository
- `git status`
	Show the working tree status.
- `git diff`
	Show changes between commits, commit and working tree, etc
- `git log`
	Show commit logs
- `git reflog`
- `git reset`
	Reset current HEAD to the specified state
- `git rm`
	Remove files from the working tree and from the index
	
	git rm --cached:  removes the file from the index and leaves it in the working directory
- `git remote`
	Manage the set of repositories ("remotes") whose branches you track.
- `git pull`
	Fetch from and integrate with another repository or a local branch.
	Incorporates changes from a remote repository into the current branch. In its default mode, git pull is shorthand for `git fetch` followed by `git merge FETCH_HEAD`.
- `git branch`
	List, create, or delete branches
- `git tag`
	Create, list, delete or verify a tag object signed with GPG.
	Add a tag reference in refs/tags/, unless -d/-l/-v is given to delete, list or verify tags.
- `git rebase`
	Reapply commits on top of another base tip.
	If <branch> is specified, git rebase will perform an automatic `git checkout <branch>` before doing anything else. Otherwise it remains on the current branch.
- `git checkout`
	Switch branches or restore working tree files
- `git merge`
	Join two or more development histories together.
	Incorporates changes from the named commits (since the time their histories diverged from the current branch) into the current branch.

`<refspec>`
`HEAD`: HEAD always refers to the most recent commit on the current branch. When you change branches, HEAD is updated to refer to the new branch’s latest commit

`git commit -m "Fixed a typo."` == `git commit --message="Fixed a typo."` 

新项目
`git init`
`git add .`
`git commit -m 'Initial Commit'`
`git remote add origin ssh://git@github.com/rainyleo/repoName.git`
`git push origin master`

更新
`git add -A`
`git commit -m 'Add Something'`
`git push`

增加 branch
`git branch myBranch`
`git checkout myBranch`
 
Merge
`git checkout master` 切换到 master
`git merge myBranch`

Undo Last commit
1. `git revert` (new ID)
2. `git reset` (local only)


Git Conflit
`git status`
`git mergetool`

fetch vs pull (keep update)
`git fetch origin` pull data to local repo, not merge
`git pull origin` pull data and merge from remote into current 

---
Workflow
1. Branching(Fork)
2. Commits
3. Pull Request
4. Collaborate
5. Merge

git clone
git pull
git branch
git checkout
git status
git add
git commit
git push

- conflit
git status 看出哪些文件 conflit

git conflit markers:

<<<< HEAD (version in current branch)
---------
---------
>>>BRANCH (version of source branch)
---

- .gitignore
我们再看一个 .gitignore 文件的例子：
```
# 此为注释 – 将被 Git 忽略
# 忽略所有 .a 结尾的文件
*.a
# 但 lib.a 除外
!lib.a
# 仅仅忽略项目根目录下的 TODO 文件，不包括 subdir/TODO
/TODO
# 忽略 build/ 目录下的所有文件
build/
# 会忽略 doc/notes.txt 但不包括 doc/server/arch.txt
doc/*.txt
# ignore all .txt files in the doc/ directory
doc/**/*.txt
```


- ssh
添加 SSH 到 github
`ssh-keygen -t rsa -b 4096 -C "your_email@example.com"`
Enter a file in which to save the key (/Users/you/.ssh/id_rsa): [Press enter]
github 只能用 id_rsa?, 其他可以取名 id_rsa.alinode
`ssh-add ~/.ssh/id_rsa`
`pbcopy < ~/.ssh/id_rsa.pub`
在 setting 里添加 ssh key
