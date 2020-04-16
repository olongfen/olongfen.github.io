
# 常用基本命令行

![table](data/640.png)

![table](data/461.jpg)

![table](data/462.jpg)

# 

# top 命令

- 第一行含义解释

    21:11:46—当前系统时间

    up 29 min—系统已经运行了29分钟（在这期间系统没有重启过）
    
    2users—当前有2个用户登录系统
    
    load average: 0.29, 0.28, 0.18—loadaverage—后面的三个数分别是1分钟、5分钟、15分钟的负载情况
    
    loadaverage—数据是每隔5秒钟检查一次活跃的进程数，然后按特定算法计算出的数值。如果这个数除以逻辑CPU的数量，结果高于5的时候就表明系统在超负荷运转了


- 第二行含义解释

    Tasks: 240 total, 1 running, 239 sleeping, 0 stopped, 0 zombie—系统现在共有240个进程，其中处于运行中的有1个，239个在休眠（sleep），stoped状态的有0个，zombie状态（僵尸）的有0个。
    
    第三行含义解释
    
    2.6 us—用户空间占用CPU的百分比。
    
    0.8 sy—内核空间占用CPU的百分比。
    
    0.0%ni—改变过优先级的进程占用CPU的百分比
    
    96.6 id—空闲CPU百分比
    
    0.0 wa—IO等待占用CPU的百分比
    
    0.0hi—硬中断（HardwareIRQ）占用CPU的百分比
    
    0.0si—软中断（SoftwareInterrupts）占用CPU的百分比`


- 第四行含义解释

    8081084 total—物理内存总量（80GB）
    
    1533752 used—使用中的内存总量（14GB）
    
    4966452 free—空闲内存总量（49GB）
    
    1580880 buff/cache—缓存的内存量（15G）


- 第五行含义解释(swap交换分区信息)

    0 total—交换区总量（0K）
    
    0used—使用的交换区总量（0K）
    
    0free—空闲交换区总量（0K）
    
    5930172 avail Mem—可用内存（59G）


- 第七行含义解释（各进程（任务）的状态监控）

    PID—进程id
    
    USER—进程所有者
    
    PR—进程优先级
    
    NI—nice值。负值表示高优先级，正值表示低优先级
    
    VIRT—进程使用的虚拟内存总量，单位kb。VIRT=SWAP+RES
    
    RES—进程使用的、未被换出的物理内存大小，单位kb。RES=CODE+DATA
    
    SHR—共享内存大小，单位kb
    
    S—进程状态。D=不可中断的睡眠状态R=运行S=睡眠T=跟踪/停止Z=僵尸进程
    
    %CPU—上次更新到现在的CPU时间占用百分比
    
    %MEM—进程使用的物理内存百分比
    
    TIME+—进程使用的CPU时间总计，单位1/100秒
    
    COMMAND—进程名称（命令名/命令行）