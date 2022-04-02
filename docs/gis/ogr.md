
## OGR 操作矢量数据
### OGR读取矢量数据
```python
from osgeo import ogr


def read_file(input="", driver_name="ESRI Shapefile" ):
    driver = ogr.GetDriverByName(driver_name)
    ds = driver.Open(input)
    # 获取图层
    print(ds.GetLayerCount())
    layer = ds.GetLayer(0)
    #print(dir(layer))
    # 查看图层要素
    print(layer.GetFeatureCount())
    # 查看图层范围
    print(layer.GetExtent())
    # (75.9659275, 134.5129026, 18.2485402, 60.755592)对应西、东、南、北
    # 图层的属性
    layer_def = layer.GetLayerDefn()
    for i in range(layer_def.GetFieldCount()):
        defn = layer_def.GetFieldDefn(i)
        print(defn.GetName(),defn.GetWidth(),defn.GetType(),defn.GetPrecision())
    # 读取图层要素 Feature
    layer.ResetReading()
    feature = layer.GetFeature(0)
    # 要素属性
    print(feature.keys())
    for i in range(feature.GetFieldCount()):
        print(feature.GetField(i))
    # 要素的几何形状(Geometry)
    geom = feature.GetGeometryRef()
    print(dir(geom))
    print(geom.GetGeometryName())
    print(geom.GetGeometryCount())
    print(geom.GetPointCount())
    print(geom.ExportToWkt())
    ds.Destroy()
if __name__ == '__main__':
    read_file(input='railways/railways.shp')

```

#### 图层概念
```text
在GIS中，Layer（图层）由同种要素（Feature）（如点、线、多边形等）组在一起的“层”

要素类：具有相同几何形状的要素的集合：点、线或多边形。我们最常见的两种要素类是简单要素类和拓扑要素类。简单要素类是指没有任何拓扑关系的点、线、多边形或注记。也就是说，一个要素类内的点与另一要素类中线要素的终点可以是一致的，但它们是不同的，其特点是可独立编辑。拓扑要素类局限在一定的图形范围内，它是一个由完整拓扑单元组成的一组要素类限定的对象。

要素数据集（要素集）：具有相同坐标系统的要素类的集合。我们可以选择在要素集的内部或外部组织简单要素类，但拓扑要素类只能在要素集内部组织，以确保它们具有相同的坐标系统。


```

### 创建Shapefile
```python
from osgeo import ogr
import os

driver = ogr.GetDriverByName("ESRI Shapefile")
out="demo/demo.shp"
if os.path.exists(out):
    driver.DeleteDataSource(out)
# 创建数据
ds = driver.CreateDataSource(out)
# 创建图层
layer = ds.CreateLayer('test',geom_type=ogr.wkbPoint)
# 添加一个新字段，只能在layer里加，而且还得保证layer里没有数
field_defn = ogr.FieldDefn('id',ogr.OFTString)
field_defn.SetWidth(6)
print(layer.CreateField(field_defn))
# 然后从layer中读取相应的feature类型，并创建feature：
feature_defn = layer.GetLayerDefn()
feature = ogr.Feature(feature_defn)
# 设定几何形状
point = ogr.Geometry(ogr.wkbPoint)
point.SetPoint(0,118,118)
feature.SetGeometry(point)
# 设置某字段值
feature.SetField('id',1)
# 把feature写入图层
layer.CreateFeature(feature)
ds.Destroy()



```

#### OGR创建要素几何形状（Geometry）
- 创建点、线、线环、多边形、复合几何形状
```python
from osgeo import ogr

# 创建点要素
point = ogr.Geometry(ogr.wkbPoint)
point.AddPoint(8,18)
print(point)

# 创建线要素
line = ogr.Geometry(ogr.wkbLineString)
line.AddPoint(8,8)
line.AddPoint(18,18)
print(line)
print(line.GetPointCount())

# 创建线环
ring = ogr.Geometry(ogr.wkbLinearRing)
ring.AddPoint(0,0)
ring.AddPoint(100,0)
ring.AddPoint(100,100)
ring.AddPoint(0,100)
ring.CloseRings()
print(ring)

# 创建多边形
outring = ogr.Geometry(ogr.wkbLinearRing)
outring.AddPoint(0,0)
outring.AddPoint(100,0)
outring.AddPoint(100,100)
outring.AddPoint(0,100)
outring.CloseRings()
inring = ogr.Geometry(ogr.wkbLinearRing)
inring.AddPoint(25,25)
inring.AddPoint(75,25)
inring.AddPoint(75,75)
inring.AddPoint(25,75)
inring.CloseRings()
polygon = ogr.Geometry(ogr.wkbPolygon)
polygon.AddGeometry(outring)
polygon.AddGeometry(inring)
# 创建复合几何形状（MultiGeometry）
multipoint = ogr.Geometry(ogr.wkbMultiPoint)
point = ogr.Geometry(ogr.wkbPoint)
point.AddPoint(10,10)
multipoint.AddGeometry(point)

point.AddPoint(20,20)
multipoint.AddGeometry(point)
print(multipoint)
```

### 空间过滤器
```python
from osgeo import ogr
import os

driver = ogr.GetDriverByName("ESRI Shapefile")

def create_shp_by_layer(output_file,layer):
    if os.access(output_file,os.F_OK):
        driver.DeleteDataSource(output_file)
    new_ds=driver.CreateDataSource(output_file)
    pt_layer = new_ds.CopyLayer(layer,'')
    new_ds.Destroy()

china_shp = "./china/china.shp"
cover_shp = "./cover/cover.shp"

china_ds = ogr.Open(china_shp)
china_layer = china_ds.GetLayer(0)
cover_ds = ogr.Open(cover_shp)
cover_layer = cover_ds.GetLayer(0)

cover_feats =cover_layer.GetNextFeature()
poly = cover_feats.GetGeometryRef()
china_layer.SetSpatialFilter(poly)
create_shp_by_layer('/out/out.shp',china_layer)

# 通过坐标选中要素
china_layer.ResetReading()
china_layer.SetSpatialFilterRect(88,15,33,55)
create_shp_by_layer('/out1/out.shp',china_layer)

```

#### 在OGR中执行sql语句查询
```python
import os
from osgeo import ogr
driver = ogr.GetDriverByName("ESRI Shapefile")
def create_shp_by_layer(output_file,layer):
    if os.access(output_file,os.F_OK):
        driver.DeleteDataSource(output_file)
    new_ds=driver.CreateDataSource(output_file)
    pt_layer = new_ds.CopyLayer(layer,'')
    new_ds.Destroy()

out="railways/railways.shp"
ds = ogr.Open(out)
layer = ds.GetLayer()
name = layer.GetName()
rs = ds.ExecuteSQL("select * from %s"%(name))

create_shp_by_layer('demo/demo.shp',rs)


```

#### 根据属性条件选择要素
```python
from osgeo import ogr

driver = ogr.GetDriverByName("ESRI Shapefile")


out = "railways/railways.shp"
ds = ogr.Open(out)
layer = ds.GetLayer(0)
print(layer.GetFeatureCount())
layer.SetAttributeFilter("osm_id > '4182662'")
print(layer.GetFeatureCount())
```

### 空间计算
#### 地理数据处理（geoprocessing）计算函数
```text

多边形（Polygon）：

交：poly3.Intersection(poly2)

并：poly3.Union(poly2)

差：poly3.Difference(poly2)

补：poly3.SymmetricDifference(poly2)

几何形状(Geometry)：

给geometry加buffer，效果就是把点、线变成多边形，线条加粗： <geom>.Buffer(<distance>)；

两个geometry是否相等：<geom1>.Equal(<geom2>) ；

两个geometry之间的最短距离：<geom1>.Distance(<geom2>) ；

用方框边界框住这个几何形状，并返回四个角的点坐标(minx,maxx, miny, maxy)：<geom>.GetEnvelope()。


```

#### 判断两个对象的关系
- 判断相交
```
poly2.Intersect(poly1)
```
- 判断不相交
```
poly2.Disjoint(poly1)
```
- 判断相邻
```text
poly2.Touches(poly1)
```
- 横穿，指一条线穿过一个多边形
```text
 poly2.Crosses(line)
```
- 判断被包含
```text
ptB.Within(poly1)
```
- 判断不被包含
```text
poly1.Contains(ptB)
```
- 重叠
```text
poly2.Overlaps(poly1)
```