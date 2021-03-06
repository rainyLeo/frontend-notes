
## 概述

High performance load balancer, web server, & reverse proxy

nginx 的高性能依赖于 Linux 2.6 内核的 epoll [1] 或是 BSD 内核的 kqueue [2] 提供高效的网络套接字状态轮询服务【时间复杂度为 O(1) 】。在没有这两个服务的内核上则退化成为性能低下的 select 【*nix, Windows 都有、时间复杂度为 O(n) 】

## 反向代理

代理其实就是一个中介，A和B本来可以直连，中间插入一个C，C就是中介。刚开始的时候，代理多数是帮助内网client访问外网server用的（比如HTTP代理），从内到外。后来出现了反向代理，"反向"这个词在这儿的意思其实是指方向相反，即代理将来自外网client的请求forward到内网server，从外到内

正向代理代理客户端，反向代理代理服务器

反向代理是负载均衡的实现方式之一

反向代理作用:
1. 保护服务器防止攻击, DOS
2. 缓存功能
3. 压缩, 优化
4. 作为SSL终端代理
5. 请求路由

## 负载均衡

负载平衡（Load balancing）是一种计算机技术，用来在多个计算机（计算机集群）、网络连接、CPU、磁盘驱动器或其他资源中分配负载，以达到最优化资源使用、最大化吞吐率、最小化响应时间、同时避免过载的目的。

从实现方式看，有软件负载均衡和硬件负载均衡


- 反向代理负载均衡
反向代理服务器的核心工作是转发HTTP，它工作在HTTP层面，因此，基于反向代理的负载均衡也称为七层负载均衡。

任何对于实际服务器的HTTP请求都必须经过调度器；调度器必须等待实际服务器的HTTP响应，并将它反馈给用户。