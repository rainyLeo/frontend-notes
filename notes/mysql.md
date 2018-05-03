
## 启动 MySQL server

1. 使用 mysqld
mysqld is the MySQL Server
MySQL Server manages access to the MySQL data directory that contains databases and tables

启动
`sudo mysqld --user=root` (可能需要 sudo)

停止
sudo mysqld stop

ps aux | grep mysqld
或者 sudo kill [port-num]

mysql 默认端口 3306

2. 在 preference 里面启动

不启动会报错: Can't connect to local MySQL server through socket '/tmp/mysql.sock'

## 连接 MySQL server

`mysql` (这样登录的不是root用户)

mysql> show databases;

## 安装后步骤

root 用户密码默认为空, 添加密码:

`shell> mysqladmin -u root password "new_password"`

或(以 root 登录)
`mysql> alter user 'root'@'localhost' identified by 'new_password'` (>5.7.6)

为匿名用户添加密码(先以 root 登录):
`mysql> set password for ''@'localhost' = password('new_password');`
没有密码的话直接 `mysql` 就能登录

为其他用户添加密码
`mysql> set password for user = password('new_password');` (<5.7.6)
`mysql> alter user user indentified by 'new_password';` (>5.7.6)


连接 MySQL server: `mysql -h host -u user -p`

以 root 用户登录: `mysql -u root -p`

把 MySQL 目录添加到下面的路径

`export PATH=$PATH:/usr/bin:/usr/sbin`

退出: quit / exit, ctrl-d

## 启动时运行 MySQL

在 /etc/rc.local 文件内有以下:

`/etc/init.d/mysqld start`

同时 /etc/init.d 目录内有 mysql binary

## MySQL 管理

检查 MySQL server 是否启动:
`ps -ef | grep mysqld`

删除匿名用户:
`mysql> drop user ''@'localhost'`


## Concept

数据库: 保存有组织的数据的容器(通常是一个文件或一组文件)
DBMS: 数据库管理系统(数据库软件), 数据库是通过 DBMS 创建和操纵的容器, 数据库可以是保存在硬设备上
的容器, 但也可以不是. 你并不是直接访问数据库, 你使用的是 DBMS, 它替你访问数据库.
表(table): 某种特定类型数据的结构化清单.
模式(schema): 关于数据库和表的布局及特性的信息
列(column): 表中的一个字段, 所有表都是由一个或多个列组成
field 字段, 与列(column) 意思相同
数据类型: 所容许的数据的类型, 每个表列都有相应的数据类型, 它限制该列中存储的数据
行(row): 表中的一个记录(record), 表中的数据是按行存储的, 所保存的每个记录存储在自己的行内.
主键(primary key): 一列(或一组列), 其值能够唯一区分表中的每个行, 表中每一行的唯一标识自己的一列

MySQL是一种DBMS, 它是一种数据库软件

## 命令

help [command]
\G; 格式化输出
分号结束;
SQL 语句不区分大小写

- database


```sql
show databases;
use db_name;
create database db_name;
```

- talbes

```sql
show tables;
create table tbl_name (name VARCHAR(20), owner VARCHAR(20));
describe tbl_name;
```
- show

```sql
help show;
show columns from tbl_name; -- 等于 describe
show status;
show grants;
show create database db_name;
show create table tbl_name;
```

- table data

```sql
load data local infile '/path/data.txt' into table tbl_name;
insert info tbl_name values ('puty', 'dian')
```

- select

```sql
select [what_to_select]
from [which_table]
where [conditions_to_satisfy]
```

```sql
select * from tbl_name; -- 所有列
select column_name from tbl_name; -- 某一列
select column_name1, column_name2, column_name3 from tbl_name; -- 多个列
select distinct column_name from tbl_name; -- 某一列, 但该列值不重复
select column_name from tbl_name limit 5; -- 从第1行开始, 不多于5行
select column_name from tbl_name limit 2, 5; -- 开始行, 不多于5行(从0计数)
select tbl_name.column_name from tbl_name; -- 用.限定列名
select tbl_name.column_name from db_name.tbl_name; -- 用.限定表名和列名


select count(*) from tbl_name
```

- order by

MySQL 中 A 和 a 顺序相同

```sql
select column_name from tbl_name order by column_name;
-- 以字母顺序排序,  第二个 column_name 可以不同于第一个, 即可以用非检索列排序数据
select column_name1, column_name2, column_name3 from tbl_name order by column_name1, column_name2
-- 按多个列排序, 首先按 column_name1 排序, 然后再按 column_name2 排序
select column_name1, column_name2, column_name3 from tbl_name order by column_name1, column_name2 desc;
-- desc 指明 column_name2 按降序排序, 而 column_name1 按升序(默认)

-- 使用 order by 和 limit 组合, 能够找出一个列中最高或最低的值
select column_name from tbl_name order by column_name desc limit 1;

```

- where

使用 where 过滤数据


```sql
select column_name1, column_name2 from tbl_name where column_name2 = 5;
-- 从 表中检索两个列, 只返回 column_name2 值为 5 的行;
select * from tbl_name where column_name = 'some-value';
-- 从 表中检索所有列, 只返回 column_name 值为 'some-value' 的行;
-- 支持的操作符: =, !=, <, <=, >, >=, between
-- MySQL 匹配时不区分大小写, fuse 与 Fuse 匹配
select prod_name, prod_price from products where prod_price between 5 and 10;
-- 范围 5-10 之间
select prod_name from products where prod_price is NULL; -- 空值检查
-- NULL 与不匹配: 在过滤数据时要验证返回的数据中给出了别过滤列具有 NULL 的行


-- 组合 where 子句, and 操作符, or 操作符

select prod_id, prod_price, prod_name from products
where vend_id = 1003 and prod_price <= 10;
-- 包含2个条件的 where 子句
select prod_name, prod_price from products
where (vend_id = 1002 or vend_id = 1003) and prod_price >= 10;
-- 组合 and 和 or, 要加(), 因为 and 的优先级比 or 要高

--  in 操作符, not 操作符

select prod_name, prod_price from products
where vend_id in (1002, 1003) order by prod_name;
-- 1002 或 1003, 和使用 or 一样
select prod_name, prod_price from products
where vend_id not in (1002, 1003) order by prod_name;
-- mysql 支持使用 not 对 in, between, exists 子句取反

```

- 通配符

```sql
-- like 操作符, % 通配符 (任意字符任何次数), _ 匹配单个字符
select prod_id, prod_name from products where prod_name like 'jet%';
-- 搜索以 jet 开头的词, 也可以 %jet% (匹配任何位置包含 jet 的值), % 不能匹配 NULL
```

- 正则表达式

like 匹配整个列, 而 REGEXP 在列值内进行匹配, REGEXP也可以用定位符匹配整个列值
MySQL 中正则表达式匹配不区分大小写. 为区分大小写, 可以用 binary 关键字

```sql
-- 匹配符: ., |, [123], [a-z], 转义: \\
-- 字符类: [:alnum:], [:alpha:], [:blank:], [:digit:], [:lower:], [:space:], ...
-- 元字符: *, +, ?, {n}, {n,}, {n, m}
-- 定位符: ^, $, [[:<:]](词的开始), [[:>:]](词的结尾)
-- ^ 在集合中表示否定, 其他地方表示开始

select prod_name from products where prod_name regexp '[123] Ton'
-- 匹配 1,2,3
select prod_name from products where prod_name regexp '[[:digit:]]{4}'
-- 匹配连在一起的任意4位数字

```

- 计算字段

concat(): 拼接串
as: 别名(导出列)
别名还可以再表列名包含不符合规定的字符(如空格)时重命名它, 在原名字容易误解时扩充它
rtrim(): 删除数据右侧多余空格
ltrim(): 删除左侧空格
trim(): 删除两侧空格

```sql
-- 拼接, 别名, vend_title 为一个计算字段
select concat(rtrim(vend_name), ' (', vend_country, ')')  as vend_title
from vendors order by vend_name

-- 算数计算, expanded_price 列为一个计算字段
select prod_id, quantity, item_price, quantity*item_price as expanded_price
from orderitems where order_num = 20021
```

- 函数

upper(): 将串转换为大写
lower()
locate(): 找出串的一个子串
left(): 返回串左边的字符
right()
length()
substring(): 返回子串的字符
soundex(): 返回串的soundex值
 soundex是一个将任何文本串转换为描述其语音表示的字母数字模式的算法

日期和时间:
adddate()
addtime()
curdate()
curtime()
date()
datediff()
date_add()
date_format()
day()
dayofweek()
hour()
minute()
month()
now()
second()
time()
year()


- 聚集函数

avg(): 某列平均值
count(): 某列的行数
max(): 某列的最大值
min(): 某列最小值
sum(): 某列值之和

以上都可以如下使用:
 - 对所有行执行计数, 指定 all 参数或不给(all 是默认)
 - 只包含不同的值, 指定 distinct 参数

```sql
select avg(prod_price) as avg_price from products;

-- count(*) 对表中行的数目进行计数, 不管值是否是空值 NULL
-- count(column) 对特定列中具有值得行进行计数, 忽略 NULL 值
select count(*) as num_cust from customers;
-- 返回 customers 表中客户的总数
select count(cust_email) as num_cust from customers;
-- 只对具有电子邮件地址的客户计数

-- max(column), 可以对非数值数据使用, max()忽略值为 NULL 的行
select max(prod_price) as max_price from products;

-- 组合聚集函数
```

- 数据分组
group by
 * group by 子句可以包含任意数目的列
 * group by 子句中列出的每个列都必须是检索列或有效的表达式(但不能是聚集函数).
 如果在 select 中使用表达式, 则必须在group by 子句中指定相同的表达式. 不能使用别名
 * 除聚集计算语句外, select 语句中的每个列都必须在 group by 子句中给出
 * 如果分组列中具有 NULL 值, 则 NULL 将作为一个分组返回. 如果列中有多行 NULL 值, 它们将分成一组
 * group by 放在 where 后, order by 前

使用 with rollup, 可以得到每个分组以及每个分组汇总级别(针对每个分组)的值

过滤分组: having 子句
having 支持所有 where 操作符, 唯一的区别是 where 过滤行, having 过滤分组
where 在数组分组前进行过滤, having 在数据分组后进行过滤

```sql
select vend_id, count(*) as num_prods from products
group by vend_id

-- 过滤分组
select cust_id, count(*) as orders from orders
group by cust_id
having count(*) >= 2;

-- order by, 一般在使用 group by 时, 应该也给出 order by 子句
```

select 子句顺序

```sql
select 要返回的列或表达式
from 从中检索数据的表
where 行级过滤
group by 分组说明
having 组级过滤
order by 输出排序
limit 要检索的行数

```


## 子查询

查询(query): select 语句
子查询(subquery): 嵌套在其他查询中的查询

```sql
select cust_name, cust_contact
from customers
where cust_id in (select cust_id
                  from orders
                  where order_num in (select order_num
                                      from orderitems
                                      where prod_id = 'TNT2'))


-- 使用联结时:
select cust_name, cust_contact
from customers, orders, orderitems
where customers.cust_id = orders.cust_id
  and orderitems.order_num = orders.order_num
  and prod_id = 'TNT2';


-- 输出:                                
| cust_name      | cust_contact |
| :------------- | :------------|
| Coyote Inc.    | Y Lee        |    
| Yosemite Place | Y Sam        |    


-- 使用子查询的另一个方法是创建计算字段
select cust_name,
       cust_state,
       (select count(*)
        from orders
        where orders.cust_id = customers.cust_id) as orders
from customers
order by cust_name;

```

相关子查询: 涉及外部查询的子查询



## 联结表

联结是 SQL 中最重要最强大的特性, 有效地使用联结需要对关系数据库设计有基本的了解.

联结(join):
关系表:
主键(primary key):
外键(foreign key): 某个表中的一列, 它包含另一个表的主键值, 定义了两个表之间的关系.

如果数据存储在多个表, 怎样使用单条 select 语句检索出数据?
使用联结 join.

联结是一种机制, 用来在一天 select 语句中关联表. 使用特殊的语法, 可以联结多个表返回一组输出, 联结
在运行时关联表中正确的行

```sql
-- 创建联结
select vend_name, prod_name, prod_price
from vendors, products
where vendors.vend_id = products.vend_id
order by vend_name, prod_name

```

笛卡尔积(cartesian produce): 由没有联结条件的表关系返回的结果为笛卡尔积. 检索出的行的数目
是第一个表中的行数乘以第二个表中的行数.

应该保证所有联结都有 where 子句.

等值联结(equijoin): 有称内部联结, 基于两个表之间的相等测试.

```sql
-- 内部联结, 与上面相同
select vend_name, prod_name, prod_price
from vendors inner join products
on vendors.vend_id = products.vend_id;

```

联结多个表, 联结的表越多, 性能下降越厉害

```sql
select vend_name, prod_name, prod_price, quantity
from vendors, products, orderitems
where vendors.vend_id = products.vend_id
  and orderitems.prod_id = products.prod_id
  and order_num = 20005

```


* 创建高级联结

- 使用表别名
别名除了用于列名和计算字段外, SQL 还允许给表起别名, 这样做有2个主要理由
 * 缩短 SQL 语句
 * 允许在单条 select 语句中多次使用相同的表

```sql
-- 表别名, 只在查询执行中使用, 与列别名不一样, 不返回到客户机
select cust_name, cust_contact
from customers as c, orders as o, orderitems as oi
where c.cust_id = o.cust_id
  and oi.order_num = o.order_num
  and prod_id = 'TNT2';

```

- 不同类型的联结
 * 等值联结(内部联结)
 * 自联结
 * 自然联结
 使每个列只返回一次, 只能选择那些唯一的列.
 内部联结都是自然联结

 * 外部联结
 联结包含了那些在相关表涨没有关联行的行


```sql
-- 自联结
select p1.prod_id, p1.prod_name
from products as p1, products as p2
where p1.vend_id = p2.vend_id
  and p2.prod_id = 'DTNTR'

-- 和下面的子查询相同
select prod_id, prod_name
from products
where vend_id = (select vend_id
                 from products
                 where prod_id = 'DTNTR');


-- 自然联结

-- 外部联结
select customers.cust_id, orders.order_num
from customers left outer join orders
on cust_name.cust_id = orders.cust_id;
-- left 表明从左边表(customers) 中选择所有行

```
- 带聚集函数的联结

- 使用联结和联结条件
应该总是提供联结条件, 否则会得出笛卡尔积.

## 组合查询

利用 union 将多条 select 语句组合成一个结果集
有两种基本情况, 需要使用组合查询:
 - 在单个查询中从不同的表返回类似结构的数据
 - 对单个表执行多个查询, 按单个查询返回数据

多数情况下, 组合相同表的两个查询完成的工作与具有多个 where 子句条件的单条查询完成的工作相同.

```sql
-- 使用 union 进行组合查询, 把输出组合成单个查询的结果集
select vend_id, prod_id, prod_price
from products
where prod_price <= 5
union
select vend_id, prod_id, prod_price
from products
where vend_id in (1001, 1002);

-- 与使用多个 where 对比
select vend_id, prod_id, prod_price
from products
where prod_price <= 5
  or vend_id in (1001, 1002);

```

- union 规则
uninon 中的每个查询必须包含相同的列, 表达式或聚集函数
列数据类型必须兼容: 类型不必完全相同, 但必须是 DBMS 可以隐含地转换的类型

- 包含或取消重复的行
在使用 union 时, 重复的行被自动取消, 这是默认行为, 可以改变
如果想返回所有匹配行, 可使用 union all(不取消重复行) 而不是 union

- 对组合查询结果排序
只能使用一条 order by 语句, 它必须出现在最后一条 select 语句之后

## 插入数据

insert: 插入(或添加)行到数据库表中
可以用以下方式使用:
 - 插入完整的行
 - 插入行的一部分
 - 插入多行
 - 插入某些查询的结果

insert 语句没有输出

```sql
-- 插入完整的行, (高度依赖次序, 不够安全)
insert into customers
values(NULL,
  'rainyLeo',
  '100 Main stree',
  'Loas Angeles',
  'USA',
  NULL,
  NULL);

-- 编写 insert 语句更安全(更繁琐的方法):
insert into customers(cust_name
  cust_street,
  cust_city,
  cust_state,
  cust_contact,
  cust_email)
values('rainyLeo',
  '100 Main stree',
  'Loas Angeles',
  'USA',
  NULL,
  NULL);

```

总是使用列的列表, 这样即使表的结构发生变化也没关系
使用这种语法, 还可以省略列, 省略列需满足以下某个条件:
 - 该列定义为允许 NULL 值
 - 在表定义中给出默认值

- 插入多行
使用多条 insert 语句, 每条语句用分号结束
或者, 只有每条 insert 语句的列名和次序相同, 可以如下组合:

```sql
insert into customers(
  ...
)
values
(
  ...
),
(
  ...
);
```

- 插入检索出的数据

```sql
insert into customers(
  ...
)
select ...
from custnew;
```

## 更新和删除数据

为了更新(修改)表中的数据, 可使用 update 语句, 有2种方式使用 update:
 - 更新表中特定行
 - 更新表中所有行

```sql
-- 更新某一行, 某一列
update customers
set cust_email = 'lby@gmail.com'
where cust_id = 10005;

-- 更新某一行, 多个列
update customers
set cust_email = 'lby@gmail.com',
    cust_name = 'rainyLeo'
where cust_id = 10005;

```

update 语句中可以使用子查询
ignore 关键字: 即使发生错误, 也继续进行更新
要删除某个列的值, 可以设置它为 NULL(假定表定义允许 NULL 值)

- 删除数据
delete: 从一个表中删除数据, 有两种方式使用
 * 从表中删除特定的行
 * 从表中删除所有行

```sql
delete from customers
where cust_id = 10006
```

delete 删除整行而不是删除列, 为了删除指定的列, 使用 update 语句
delete 语句从表中删除行, 甚至是表中所有行, 但是它不删除表本身
如果想从表中删除所有行, 不要使用 delete, 可使用 truncate table, 它速度更快, 因为truncate
实际上删除原来的表并重新创建一个表, 而不是逐行删除表中的数据

- 更新和删除的原则
 * 使用 where, 如果没有 where 子句, 则会应用到所有行
 * 保证每个表都有主键, 像 where子句那样使用它
 * 在对 update 和 delete 使用 where 前, 先使用 select 进行测试
 * 使用强制实施引用完整性的数据库, 这样 MySQL 讲不允许删除具有与其他表相关联的数据的行

MySQL 没有撤销功能, 应该非常小心地使用 update 和 delete


## 创建和操纵表

- 创建表

为使用 create table 创建表, 必须给出下列信息:
 * 新表的名字
 * 表列的名字和定义, 用逗号分隔

```sql
create table customers
(
  cust_id int not null auto_increment,
  cust_name char(50) not null default 'leo',
  cust_address char(50) null,
  cust_city char(50) null,
  cust_email char(255) null,
  primary key(cust_id)
) engine=innodb;
```

not null 会阻止插入没有值的列

多个列组成的主键, 以逗号分隔给出各列名, 列的组合是唯一的

```sql
primary key (order_num, order_item)
```

- auto_increment
该列每增加一行时自动增量
每个表只允许一个 auto_increment 列, 而且它必须被索引(如使它成为主键)
select last_insert_id() 返回最后一个 auto_increment 的值

- 指定默认值
default 指定默认值

- 更新表

为了更新表定义, 可使用 alter table 语句

```sql
-- 给表添加一列
alter table vendors
add vend_phone char(20);

-- 删除一列
alter table vendors
drop column vend_phone;

-- 定义外键
alter table orderitems
add constraint fk_orderitems_orders
foreign key (order_num) references orders (order_num)
```

- 删除表

```sql
drop table customers2;
```
删除表没有确认, 也不能撤销

- 重命名表

```sql
rename table customers2 to customers;
```

## 事务处理

事务处理用来维护数据库的完整性, 它保证成批的 MySQL 操作要么完全执行, 要么完全不执行
事务处理是一种机制 用来管理必须成批执行的 MySQL 操作, 以保证数据库不包含不完整的操作结果

事务(transaction): 一组SQL语句
回退(rollback): 撤销指定SQL语句的过程
提交(commit): 将未存储的SQL语句结果写入数据库表
保留点(savepoint): 事务处理中设置的临时占位符, 可以对它发布回退

## MySQL admin

```sql

mysqladmin -u root -p create [database-name]
mysqladmin -u root -p drop [database-name]

show variables;
show status;
```

## MySQL Client Promgrams

mysql: mysql command-line tool
mysqladmin: client for administering a mysql server
mysqlcheck: table maintenance
mysqldump: database backup
mysqlimport: data import
mysqlpump: database backup
mysqlsh: mysql shell
myslshow: display databases, table, and column information
mysqlslap: load emulation

## 配置

/etc/my.cnf

## Performance Schema

MySQL Performance Schema is a feature for monitoring MySQL Server execution at a low level
