## Python与高程数据

### ASCII 网格文件

#### 读取grids

- 头部六行数据说明
    
    - ncols 描述网格包含的列数，同时也代表x轴
    - yrows 描述网格包含的行数，同时也代表y轴
    - xllcorner 左下角x坐标，以m为单位的x轴最小值
    - yllcorner 左下角y坐标，y轴最小值
    - cellsize 描述单元格的尺寸或者栅格的分辨率
    - NODATA_value 为那些未被赋值的单元格提供默认值，一般采用-9999之歌数值

```python
import numpy as np
arr = np.loadtxt('data/myGrid.asc',skiprows=6)
```

#### 写入grids
```python
import numpy as np
arr = np.loadtxt('data/myGrid.asc',skiprows=6)
header = 'ncols      {}\n'.format(arr.shape[1])
header +='nrows   {}'.format(arr.shape[0])
header +='xllcorner   277750.0\n'
header +='yllcorner   6122250.0\n'
header +='cellsize      1.0\n'
header +='NODATA_value     -9999'
np.savetxt('data/selfGrid.asc',arr,header=header,fmt='%1.2f')
```

### 创建地形阴影
```python
from linecache import getline
import numpy as np
import math

# 高程数据文件
source = 'data/dem/dem.asc'
# 坡度格文件
slopegrid= 'data/dem/slope.asc'
# 坡向网格文件
aspectgrid= 'data/dem/aspect.asc'
# 输出渲染文件
shadegrid = 'data/dem/relief.asc'

# 高程阴影参数
# 日光方位
azimuth = 315.0
#日光角度
altitude = 45.0
# 高程放大比例
z = 1.0
# 分辨率
scale = 1.0
# NODATA
NODATA = -9999

# numpy库必需转换的操作
deg2rad = math.pi / 180.0
rad2deg = 180.0/math.pi

# 使用内置的linecache模块解析头部信息
hdr =[getline(source,i) for i in range(1,7)]
values = [float(h.split(" ")[-1].strip()) for h in hdr]
cols,rows,lx,ly,cell,nd = values
xres = cell
yres = cell* -1

# 加载dem数据
arr = np.loadtxt(source,skiprows=6)

# 排除围绕边框之外2个像素的NODATA数据
# 同时设立 3x3的窗口进行坡度计算
window = []
for row in range(3):
    for col in range(3):
        window.append(arr[row: (row + arr.shape[0] -2), col: (col + arr.shape[1] - 2)])
# 处理水平和竖直方向上的每个3x3窗体
x = ((z * window[0] + z * window[3] + z *window[3] + z * window[6] ) - 
    (z * window[2] + z *window[5] + z*window[5] +z*window[8] )) / (8.0 * xres * scale)

y = ((z * window[6] + z * window[7] + z *window[7] + z * window[8] ) - 
    (z * window[0] + z *window[1] + z*window[1] +z*window[2] )) / (8.0 * yres * scale)

# 计算坡度
slope = 90.0 - np.arctan(np.sqrt(x * x + y * y)) * rad2deg
# 计算坡向
aspect = np.arctan2(x, y)

# 计算晕渲阴影
shaded = np.sin(altitude * deg2rad  ) * np.sin(slope * deg2rad) + np.cos(altitude * deg2rad) * np.cos(slope*
                                                                                                      deg2rad) * np.cos((azimuth - 90.0) * deg2rad -aspect)
# 阴影放大比例,0-1到0-255
shaded = shaded*255
# 生成新的头部
header = 'ncols      {}\n'.format(shaded.shape[1])
header +='nrows   {}'.format(shaded.shape[0])
header +='xllcorner   {}\n'.format(lx + (cell *(cols - shaded.shape[1])))
header +='yllcorner   {}\n'.format(ly + (cell * (rows - shaded.shape[0])))
header +='cellsize      {}\n'.format(cell)
header +='NODATA_value     {}\n'.format(NODATA)

# 为窗体设定NODATA值
for pane in window:
    slope[pane == nd] = NODATA
    aspect[pane == nd] = NODATA
    shaded[pane == nd] = NODATA

    
# 打开输出文件添加头部信息保存数据
with open(slopegrid,'wb') as f:
    f.write(bytes(header,'UTF-8'))
    np.savetxt(f,slope,fmt='%4i')

with open(aspectgrid,'wb') as f:
    f.write(bytes(header,'UTF-8'))
    np.savetxt(f,aspect,fmt='%4i')

with open(shadegrid,'wb') as f:
     f.write(bytes(header,'UTF-8'))
     np.savetxt(f,shaded,fmt='%4i')
```