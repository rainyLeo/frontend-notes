

cmd + click / F4: 跳转到定义文件

- 双击shift: 搜索文件
- cmd-shift-f: 项目内搜索
ctrl+shift+J 把下面行的缩进收上来
Command+delete 删除当前行
Command+L 跳转行
- Command+Y 小浮窗显示变量声明时的行
Command+B 跳转到变量声明处

Command+, 设置编辑器


F3 添加书签
alt+F3 添加带助记的书签
alt+1,alt+2… 切换到相应助记的书签位置
Command+F3 打开书签列表

选中文字的搜索
Command+F7 向声明的地方搜索并选中
Command+shift+F7 打开搜索框进行搜索
Command+alt+F7 打开小浮窗显示搜索列表

^Space: 补全
- ⌥F7:   快速查找方法/变量使用位置
F1:  查看文档
- ⌘B, Cmd+click:  方法/变量 声明位置
F12: 在当前文件导航, 选中元素按 Enter/⌘↓
⇧F6:  重命名
⌃O:  override methods of base class
⌃I:  implement methods of the interfaces
⌃⇧Space:  SmartType code completion
⇥: 补全 和  ⏎  不一样
Shift+click:  关闭标签
⌘N:  generate getter and setter
⌥F1: quickly select the currently edited element

⎋:  in any tool window moves the focus to the editor.
⇧⎋: moves the focus to the editor and also hides the current (or last active) tool window.

F12:  moves the focus from the editor to the last focused tool window.

⌥⌘T: catch exceptions thrown by some code fragment

⌥⌘V: Extract Variable refactoring

⌘/ and ⌥⌘/: comment or uncomment
⌘/ comments or uncomments the current line or selected block with single line comments (//...).

⌥⌘/ encloses the selected block in a block comment (/*...*/).

⇧F1: open your browser with documentation

⌃⇧Space: cast an expression value to the required type

⌘D: duplicates the selected block or the current line when no block is selected.

File | Settings | Live Templates: live template

⇧⌘⌫: brings you back to the last place where you made changes in the code, Pressing ⇧⌘⌫ a few times moves you deeper into your changes history.

⇧⌘F7: quickly highlight usages of some variable in the current file.

⌘G and ⇧⌘G: navigate through highlighted usages.
⎋: remove highlighting.

Code | Reformat Code: reformat code according to your code style preferences (File | Settings | Code Style).

Local History | Show History: To see your local history of changes in a file

⌃⇧Q (View | Context Info): to see the declaration of the current method without the need to scroll to it.

- ⌘E (View | Recent Files): brings a popup list of the recently visited files; ⌘E shortcut with the Find tool: bring up results of the usage searches you have performed recently

F2/⇧F2: jump between highlighted syntax errors.

⌥⌘↑/⌥⌘↓: jump between compiler error messages or search operation results

⌘J: complete any valid Live Template abbreviation if you don't remember it

 ⌃↑ and ⌃↓: quickly move between methods in the editor

- ⌃⇧J:  joins two lines into one and removes unnecessary space to match your code style.

Refactor | Copy: create a class which is a copy of the selected class

⇧⌘V: choose and insert recent clipboard contents into the text

- ⌃H (Navigate | Type Hierarchy): see the inheritance hierarchy for a selected class

Right-clicking on a breakpoint marker: invokes the speedmenu

⌥F8: evaluate the value of any expression while debugging the program
hold Alt and click this expression: quickly evaluate the value of any expression
When using Code Completion, you can accept the currently highlighted selection in the popup list with the period character (.), comma (,), semicolon (;), space and other characters.
⌥⇧C: quickly review your recent changes to the project

⌃\` (View | Quick Switch Scheme): to specify the scheme you want to change.

⇧⌘⏎: complete a current statement such as if, do-while, try-catch, return (or a method call) into a syntactically correct construct

⌥Space (View | Quick Definition): to quickly review definition or content of the symbol at caret, without the need to open it in a new editor tab

⇧⌘↑ or ⇧⌘↓: reorganizing the code lines

⌃⌥R: access the Run/Debug dropdown on the main toolbar

right-clicking the tag name and selecting Show Applied Styles For Tag from the context menu: quickly review all styles currently applied to an HTML tag

⌘↑: show the navigation bar, and arrow keys to locate the necessary files or folders
Version Control tool window: shows all deleted, modified, and unversioned files in a single view.

If you notice that IntelliJ IDEA works slowly, consider the possibility to reduce the number of folders under antivirus protection.

If you don't want to commit some of your changes to the repository, you can set them aside for a while, by moving to a separate changelist, or by putting them to a shelf. Select such file in the Local tab of the Changes tool window, and on the context menu choose Move to Another Changelist, or Shelve Changes.

To quickly find and run an inspection, press ⌥⇧⌘I and start typing the name of the inspection or its group

To view all exit points of a method, place the caret at one of them, e.g. the return statement, and press ⇧⌘F7

Cmd+Click (on MacOS) a tab in the editor to navigate to any part of the file path.
⌥⏎, and choose Create Test from the suggestion list:
make column selection by dragging your mouse pointer while keeping the Alt key pressed.

If nothing is selected in the editor, and you press ⌘C, then the whole line at caret is copied to the clipboard.

⌥⏎ to see the list of available actions.

Use the Switcher (⌃⇥) to switch between open files and tool windows. Keeping Ctrl pressed, use the Up and Down arrow keys, Tab or Shift+Tab, Alt for navigation; use Delete or BackSpace to close editor tab or hide a tool window.

You can easily open an external file for editing, if you just drag it from the Explorer or Finder to the editor.

You can jump directly to any deeply buried file, if you press ⇧⌘O, and type just a couple of characters of the enclosing directories and file names:

Version control annotations show the latest changes of each line in one click.
Just right-click an annotation and use the Show Diff command in the context menu.

If you need more workspace, you can hide the tool windows bars: click   in the lower left corner.
If necessary, you can show the tool window buttons just for a moment. To do that, press the key Alt (for Windows/\*nix) or Command (for Mac) twice and keep it down. While the key is pressed, the tool window buttons are visible.

You can exclude any file from your project. As a result, such a file will be ignored by indexing, inspection and code completion.
In the `Project` tool window, select the file you want to ignore, and choose `Mark as plain text` in its context menu.
If necessary, you can always return the file to its original type using the `Mark as <file type>` context menu command.

The keyboard shortcut `⌘K` enables you to quickly invoke the Commit Changes dialog.

pressing ⌘F shows the search pane. Pressing ⌘R adds field, where you can type the replace string.

`TODO` tool window lets you preview each of the encountered TODO items - just click the preview button on the toolbar.

If a method signature has been changed, IntelliJ IDEA highlights the tags that ran out of sync with the documentation comment and suggests a quick fix

You can avoid escaping backslashes in your regular expressions. Start typing a regular expression, then press ⌥⏎ and choose Edit RegExp. The regular expression opens in a separate tab in the editor, where you can type backslashes as is.
All changes are synchronized with the original regular expression, and escapes are presented automatically. When ready, just press ⎋ to close the regular expression editor.

Speed up HTML, XML or CSS development with Emmet.
Enable this framework in the corresponding page of the Editor | Emmet node (Settings/Preferences):

To view which line separators style is used in the current file, look at the Status Bar:

If you place the caret at certain symbol and press ⌃T, you will see the list of refactorings applicable to the current context.

For the embedded local terminal, you can define your favorite shell, default tab name, and other settings. Choose File | Settings on the main menu, and then open the page Terminal.

IntelliJ IDEA allows you to search through the classes, files, tool windows, actions, settings, and symbols of your project by double pressing the `Shift` key.

Scratch files allows you experiment and prototype right in the editor, without creating any project files.
To create a scratch file, press ⇧⌘N, and then select its language.

- Add several cursors to your editor. To do that, press Ctrl twice and hold the key, and then press the arrow keys.
On Mac use Alt instead of Ctrl.

Clone the cursor strictly upwards or downwards. To do that, press ⇧⌘A, type Clone caret, and then choose the desired action.

IntelliJ IDEA makes it possible to launch the embedded local terminal using keyboard only. Press ⌥F12, and see the terminal running.

When in a Code Completion lookup, press F1 to show documentation for a lookup item

You can easily select multiple fragments of text. To do that, it's enough to keep `Alt+Shift` and drag your mouse cursor:

To select multiple words, press `Alt+Shif`t, place the caret at each word to be selected and double-click the left mouse button.

To open any particular file in the editor quickly, press `⇧⌘O` (Navigate | File) and start typing its name.

`⌘⌫` in the editor deletes the whole line at the caret.

Pressing `⌥/` helps complete words in the visible scope - so doing, the prototypes are highlighted.

You can inject SQL into a string literal (⌥⏎ | Inject language or reference | <SQL dialect>) and then use coding assistance for SQL.

You can open the database console by clicking   or pressing ⇧⌘F10.

The database console lets you compose and execute SQL statements (⌘⏎), and also analyze the query results.

You can execute injected SQL statements and the statements in SQL files by pressing ⌘⏎. (Alternatively, ⌥⏎ | Run Query in Console.)

The Table Editor provides a GUI for working with table data. In the Database tool window, select the table of interest and press ⌘↓.
