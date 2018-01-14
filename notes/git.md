
Git thinks of its data more like a set of snapshots of a miniature filesystem. Every time you commit, or save the state of your project in Git, it basically takes a picture of what all your files look like at that moment and stores a reference to that snapshot. To be efficient, if files have not changed, Git doesn’t store the file again, just a link to the previous identical file it has already stored. Git thinks about its data more like a stream of snapshots.

The mechanism that Git uses for this checksumming is called a SHA-1 hash. This is a 40-character string composed of hexadecimal characters (0–9 and a–f) and calculated based on the contents of a file or directory structure in Git.
In fact, Git stores everything in its database not by file name but by the hash value of its contents.

Git has three main states that your files can reside in: committed, modified, and staged. Committed means that the data is safely stored in your local database. Modified means that you have changed the file but have not committed it to your database yet. Staged means that you have marked a modified file in its current version to go into your next commit snapshot.

objects 目录存储所有数据内容，refs 目录存储指向数据 (分支) 的提交对象的指针，HEAD 文件指向当前分支，index 文件保存了暂存区域信息

$ git help <verb>
$ git <verb> --help
$ man git-<verb>


- `git init`
	Create an empty Git repository or reinitialize an existing one

- `git add`
	Add file contents to the index. This command updates the index using the current content found in the working tree, to prepare the content staged for the next commit

	`git add .`: add all the files in the directory and all subdirectories
	-A: Update the index not only where the working tree has a file matching <pathspec> but also where the index already has an entry. If no <pathspec> is given when -A option is used, all files in the entire working tree are updated

- `git commit`
	Record changes to the repository.Stores the current contents of the index in a new commit along with a log message from the user describing the change

	`-m 'msg'`: Use the given 'msg' as the commit message




- `git push [remote-repo-name] [branch-name]`
	Push the specified branch to <remote>, along with all of the necessary commits and internal objects.
	Updates remote refs using local refs, while sending objects necessary to complete the given refs.

	如果要把本地的 master 分支推送到 origin 服务器上（再次说明下，克隆操作会自动使用默认的 master 和 origin 名字），可以运行下面的命令
	`git push origin master`

	只有在所克隆的服务器上有写权限，或者同一时刻没有其他人在推数据，这条命令才会如期完成任务。如果在你推数据前，已经有其他人推送了若干更新，那你的推送操作就会被驳回。你必须先把他们的更新抓取到本地，合并到自己的项目中，然后才可以再次推送

	-f(--force): Usually, the command refuses to update a remote ref that is not an ancestor of the local ref used to overwrite it.This flag disables these checks, and can cause the remote repository to lose commits
	--all: Push all of your local branches to the specified remote

- `git clone`
	Clone a repository into a new directory

- `git fetch [remote-name]`
	Download objects and refs from another repository

- `git fetch [remote-name] [branch-name]`
	Download objects and refs from another repository , but only the specified branch

	如果是克隆了一个仓库，此命令会自动将远程仓库归于 origin 名下。所以，git fetch origin 会抓取从你上次克隆以来别人上传到此远程仓库中的所有更新（或是上次 fetch 以来别人提交的更新）。有一点很重要，需要记住，fetch 命令只是将远端的数据拉到本地仓库，并不自动合并到当前工作分支，只有当你确实准备好了，才能手工合并。

- `git status`
	Show the working tree status.

- `git diff`
	Show changes between commits, commit and working tree, etc

	git diff by itself doesn’t show all changes made since your last commit – only changes that are still unstaged

	`git diff --cached`

- `git log`
	Show commit logs
	`git log -p` 展开每次提交的内容差异
	`git log -2` 显示最近的2次更新
	`git log --stat`
	`git log --pretty=format:"%h - %an, %ar : %s"`
	`git log --pretty=format:"%h %s" --graph`
	`git log --oneline --decorate --graph --all`

- `git reflog`

- `git reset`
	Reset current HEAD to the specified state

- `git rm`
	Remove files from the working tree and from the index
  用 git rm 来删除文件，同时还会将这个删除操作记录下来；
  用 rm 来删除文件，仅仅是删除了物理文件，没有将其从 git 的记录中剔除

	`git rm --cached`:  removes the file from the index/staging area and leaves it in the working directory, keep the file on your hard drive but not have Git track it anymore

- `git remote`
	Manage the set of repositories ("remotes") whose branches you track.

	`git remote -v`
	shows you the URLs that Git has stored for the shortname to be used when reading and writing to that remote

	`git remote add [shortname] [url]`
	添加一个新的远程仓库，指定一个名字

	`git remote show [remote-name]`
	查看某个远程仓库的详细信息

- `git stash`


- `git pull [remote]`
 相对于:
 	`git fetch [remote]`
	`git merge origin/[current-branch]`
	Fetch from and integrate with another repository or a local branch.
	Incorporates changes from a remote repository into the current branch. In its default mode, git pull is shorthand for `git fetch` followed by `git merge FETCH_HEAD`.

	`--rebase`

- `git branch`
	List, create, or delete branches

	`git branch -d [branchName]`
	delete local branch

	`git push origin :[branchName]`
	delete remote branch

	`git branch -v`
	查看各个分支最后一个提交对象的信息


	HEAD: 一个指向你正在工作中的本地分支的指针（将 HEAD 想象为当前分支的别名)

- `git tag`
	Create, list, delete or verify a tag object signed with GPG.
	Add a tag reference in refs/tags/, unless -d/-l/-v is given to delete, list or verify tags.

- `git rebase`

	Reapply commits on top of another base tip.
	If <branch> is specified, git rebase will perform an automatic `git checkout <branch>` before doing anything else. Otherwise it remains on the current branch.

- `git checkout`
	Switch branches or restore working tree files

	`git checkout -b [new-branch]`
	add new branch and checkout

	`git checkout -b [new-branch] [existing-branch]`
	Same as the above invocation, but base the new branch off of <existing-branch> instead of the current branch

- `git merge`
	Join two or more development histories together.
	Incorporates changes from the named commits (since the time their histories diverged from the current branch) into the current branch.

- `git mv`
	Move or rename a file, a directory, or a symlink


`<refspec>`
`HEAD`: HEAD always refers to the most recent commit on the current branch. When you change branches, HEAD is updated to refer to the new branch’s latest commit
`origin` – that is the default name Git gives to the server you cloned from:
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

`git commit -a -m 'add something'`

增加 branch
`git branch myBranch`
`git checkout myBranch`

Merge
`git checkout master` 切换到 master
`git merge myBranch`



Undoing
	* re-commit
	```git
	git commit -m 'initial commit'
	git add forgotten_file
	git commit --amend
	```
	第二个提交命令修正了第一个的提交内容

	* Unstaging a Staged File
	`git reset HEAD [filename]`

  * undo git rm
  `git reset --hard HEAD`
  should forcibly reset everything to your last commit.

	* Unmodifying a Modified File
	`git checkout -- [filename]`

	* undo Last commit
	`git revert` (new ID)
	`git reset` (local only)

    `git reset 4854227e840ee6ceb79b58728a770db58c02f55c`
    会退到某一个commit, 保留文件修改. 如果加 --hard 则不保存文件修改
    git reflog: 查看引用log

	* undo Last commit pushed
	`git push -f origin [last_commit]:[branch-name]`
  `git reset --hard [last_commit]`

	last commit 通过 git log --oneline 获得


Git Conflit
`git status`
`git mergetool`


更新上游
 `git remote add upstream git@code.aliyun.com:tm/pantheon-fe-mobile.git`
 `git fetch upstream`
 `git pull upstream [master]`


fetch vs pull (keep update)
`git fetch origin` pull data to local repo, not merge
`git pull origin` pull data and merge from remote into current


**tips on PR**

Assuming that you have first forked a repo, here is what you should do in that fork that you own:

1. create a branch: isolate your modifications in a branch. Don't create a pull request from master, where you could be tempted to accumulate and mix several modifications at once.
2. rebase that branch: even if you already did a pull request from that branch, rebasing it on top of origin/master (making sure your patch is still working) will update the pull request automagically (no need to click on anything)
update that branch: if your pull request is rejected, you simply can add new commits, and/or redo your history completely: it will activate your existing pull request again.3.
4. "focus" that branch: i.e., make its topic "tight", don't modify thousands of class and the all app, only add or fix a well-defined feature, keeping the changes small.
5. delete that branch: once accepted, you can safely delete that branch on your fork (and git remote prune origin). The GitHub GUI will propose for you to delete your branch in your pull-request page.


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
`build/`
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
