## GIS 简介以及Python环境安装

### 数据

- 栅格数据由存放唯一值存储单元的行和列组成。
- 矢量数据利用了几何图形的点、线（一系列点坐标），或是面（形状决定于线）来表现客观对象。

### 数据处理模块GDAL/OGR

- GDAL读写不同栅格数据格式功能的抽象类库
- OGR读写矢量数据格式功能的抽象类库

### 投影处理：PROJ
```text
    PROJ是坐标投影转换类库，不同坐标投影之间切换
```

### 安装gdal
```shell
sudo add-apt-repository ppa:ubuntugis/ppa && sudo apt-get update
sudo apt-get update
sudo apt-get install gdal-bin
sudo apt-get install libgdal-dev
export CPLUS_INCLUDE_PATH=/usr/include/gdal
export C_INCLUDE_PATH=/usr/include/gdal
pip install GDAL
```