### Unix命令行  


1. **cd ：更改路径(change directory)**  
`cd` home directory 
` .`  `./`  当前目录    
`..`  `../`上级目录  
`-`  前一个目录  
`\~`:   home directory 

2. **pwd：输出当前路径**  
`pwd`：print working dirctory  

3. **ls：查看当前目录中的内容**  
`ls`: 查看文件与目录  
`ls -a` 查看全部文件，包括隐藏文件  
`ls -d` 仅列出目录  
`ls -l` 列出长数据串，包含文件的属性和权限

4. **open：在窗口中打开目录中的内容**  
`open .` 在窗口中打开当前目录  
`open Downloads` 打开Downloads目录  
> 小提示：输入目录名称时按TAB可以自动补全  

5. **mkdir：新建目录**  
`mkdir animals`  新建了一个名为animals的目录  
`mkdir cat dog pig` 新建多个目录  
`mkdir -p [dir]/[dir]` create nested directories 

6. **touch：新建文件**  
`touch [-acdmt] 文件`  新建  
 
和ls、cd一样，用touch新建文件时可以指定路径  
`touch desktop/file/data.txt`  

7. **复制、移动、删除命令**  

`cp [-adfilprsu] 源文件(source) 目标文件(destination)` 复制   
`-a`   
`-f` 强制  

`-i` 若目标文件已经存在，在覆盖时会先询问操作的进行  
`-p` 连同文件的属性一起复制，而非使用默认属性  
`-u` 若destination比source旧才更新destination  
`-s` 复制成为符号链接文件，即快捷方式  
 
`-r` 递归复制，用于目录的复制 

`mv [-fiu] source destination` 移动文件与目录，或更名  

`rm [-fir] 文件或目录` 删除  
`rmdir 目录名` 删除空目录  
`-f` force的意思，忽略不存在的文件，不会出现警告信息  
`-i` 互动模式，在删除前会询问用户是否操作  
`-r` 递归删除，常用在目录的删除 危险的参数！

  
8. **其它**  
 
 `cat` `tac` `nl` `more` `less` `head` `tail` `od` 查看文件内容  
 `umask -S` 文件默认权限  
 
`rename` 更改大量文件的文件名  
`chattr` `lsattr` 文件隐藏属性  
`file` 查看文件类型  
`which -a command` 查询可执行命令  
`whereis [-bmsu] 文件或目录名` `locate [-ir] keyword` `find` 查找文件 

`date`  date +%Y/%m/%d 时间  
`cal` cal 10 2016 日历  
`bc`  scale = 2, 计算器  
`Tab` 命令补全，文件对齐  
`ctrl-c` 中断目前程序  
`ctrl-d` 关闭  
`man ls` 查看ls命令的manual,使用／?nN来查找  
`nano` `vim` 文件编辑或新建  
`who` 查看在线  
`netstat -a` 查看网络联机状态  
`ps -aux`  
`shutdown`, `reboot`, `halt`, `powerff` 关机，重启  
`sync` 数据同步写入磁盘  
`chmod`, `chown`, `chgrp` 改变文件权限，所有者，用户组  
`echo $PATH` 查询环境路径    
`PATH="$PATH":/usr/local/bin` 把／usr/loacal/bin加入环境路径  
`top` display active processes.Press q to quit
`nano [file]` `vim [file]` open file/new file 
`clear` clear screen 
`history n` command history
`ctrl+r` interactively search through previously typed command 
`![value]` execute the last command typed that starts with 'value'
`!!` execute the last command typed
`pbcopy < [file]` copy file contents to clipboard
`pbpaste` paste clipboard contents
`pbpaste > [file]` paste clipboard contents into files
`[command] < [file]` tell command to read content from a file 
`[command] > [file]` push output to file, keep in mind it will get overwritten
`[command] >> [file]` append output to existing file 
`[command] -h` offer help
`man [command]` show the help manual for [command] 

9. ** Search **
`find [dir] -name [search_pattern]` search for files, e.g. `find /Users -name "file.text"`
`grep [search_pattern] [file]` search for all lines that contain the pattern, e.g. `grep "Tom" file.text`
`grep -r [search_pattern] [file]` Recursively search for all lines that do not contain the pattern
`grep -v [search_pattern] [file]` Search for all lines that do NOT contain the pattern





### Terminal Mac  
`ctrl+e` go to end of line
`ctrl+a` go to beginning of line
`ctrl+l` clear the screen
`cmd+k` clear the screen(actually clear)
`ctrl+q` clear current line
`ctrl+k` cut to end of line 
`ctrl+u` cut to beginning of line
`ctrl+w` cut one word backwards
`ctrl+y` paste whatever was cut by last cut command 
`ctrl+h` backspace
`ctrl+c` kill whatever you are running 
`ctrl+d` exit the current shell when no process is running, or send EOF to the running process
`ctrl+z` put whatever you are running into a suspended background process
`ctrl+_` undo the last command 
`ctrl+t` swap the last two characters before the cursor
`ctrl+f` move cursor one character forward
`ctrl+b` move cursor one character backward 
`esc+f` move cursor one word forward
`esc+b` move cursor one word backward
`est+t` swap the last two words before the cursor
`tab` auto-complete files and folder names







