## SpatiaLite

### 什么是SpatiaLite
```text
SpatiaLite是SQLite数据的空间数据引擎。 为了使用SQLite能够处理空间数据，需要在SQLite中加载空间扩展。
```

### SpatiaLite主要功能

- 支持WKT和WKB格式。
- 支持SQL空间函数AsText(),GeomFromText(),Area(),PointN()。
- 对OpenGIS空间函数集的完全支持需要借助于GEOS， 支持高级复杂空间分析函数如：Overlaps(), Touches(), Union(), Buffer()等
- 支持导入导出Shapefile
- 可以处理大多数的图形数据，包括：点、线、多边形、点集合、线集合、多边形集合和几何对象集。
- 每个几何要素都有一个空间参照标志符(spatial reference identifier，SRID)，来标识其空间参照。
- 几何对象列包括特定的几何类型和特定的SRID。可以阻止在数据库表中保存错误的几何对象或错误的空间参照。
- 支持几何对象在WKT和WKB格式之间进行转换。
- 支持几何功能，如面积量算，多边形和线简化，几何对象的距离量算，几何对象集合计算（九交模型），以及缓冲区生成等。
- 支持几何对象在不同空间参照系间转换，以及平移、缩放或旋转几何对象。
- 支持用最小外包矩形来快速计算空间关系
- 支持用几何对象自身的空间关系运算（九交模型，如相等，接触和交叉等等），而不是用最小矩形来计算。
- 正确运用R-树索引可以大大提高空间查询的速度。
- 实施空间索引的另外一种方法是利用MBR内存缓冲。这是用最小边界矩形来索引要素的极快方法，但是受限于可用的RAM，所以不适于大型数据集。

### 环境安装

- conda
```shell
conda install -c anaconda libspatialite
```
- ubuntu
```shell
sudo apt-get install libspatialite7 libsqlite3-mod-spatialite
sudo apt-get install python-pyspatialite
sudo apt-get install spatialite-bin
```

### Spatialite 常用指令

- 导入GIS数据
```shell
# 说明： shp文件自己准备
ogr2ogr -f SQLite -dsco SPATIALITE=YES railways.db railways/railways.shp -nlt LINESTRING
```

- 查询数据
```text
spatialite railways.db
spatialite> .headers on
spatialite> select * from railways limit 10;
ogc_fid|osm_id|name|type|GEOMETRY
1|4181592|港鐵機場快綫 MTR Airport Express|rail|
2|4181898|港鐵機場快綫/東涌綫 MTR Airport Express|rail|
3|4182662|港鐵機場快綫 MTR Airport Express|rail|
4|4338940|山頂纜車 Peak Tram|funicular|
5|4734640||rail|
6|4734641||rail|
7|4959070|港鐵機場快綫 MTR Airport Express|rail|
8|4959071|港鐵機場快綫 MTR Airport Express|rail|
9|7370291||rail|
10|7370318||rail|

```

- 导出GIS数据
```text
spatialite railways.db
spatialite> .dumpshp railways Geometry demo utf-8 LINESPRING
========
Dumping SQLite table 'railways' into shapefile at 'demo'

Exported 63264 rows into SHAPEFILE
========

```

- python 简单读取例子
```python
import sqlite3
conn  = sqlite3.connect("railways.db")
conn.enable_load_extension(True)
conn.execute('select load_extension("mod_spatialite.so.7")')
cursor = conn.cursor()

sql = 'select ogc_fid,osm_id,name,NumPoints(Geometry), GLength(Geometry) ,Dimension(Geometry),' \
      ' GeometryType(Geometry)  from railways limit 10'
cursor.execute(sql)

for x in cursor:
    print(x)

```