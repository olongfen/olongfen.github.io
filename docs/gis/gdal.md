
## GDAL数据模型
```text
    1、重要三概念：数据集、栅格波段、颜色表。
    2、一个数据集是相关的栅格波段和一些相关的信息的集合。负责所有波段的地理参考定义和坐标定义。
```

### 数据集放射地理转换
```text
    常用放射变换表示栅格位置和地理参考坐标之间的关系。放射变换包含留个参数。
    GDALDateset.GetGeoTransform()返回。
    Xgeo = GT(0) + Xpixel*GT(1) + Yline*GT(2)
    Ygeo = GT(3) + Xpixel*GT(4) + Yline*GT(5)
    
```

### GDAL读取栅格的基本信息
```python
'''
gt[0] 栅格左上角横坐标
gt[3] 栅格左上角纵坐标
gt[2],gt[4] 对应上北下南，没有发生旋转值为0
gt[1] 栅格水平空间分辨率
gt[5] 栅格垂直空间分辨率
通常情况下gt[1]和gt[5]相等

'''
from osgeo import gdal

ds = gdal.Open('learn.tif')

# 输出栅格的描述信息
print(ds.GetDescription())
# 获取栅格数据集的波段数
raster_count = ds.RasterCount
print(raster_count)
# 获取提一个波段
band = ds.GetRasterBand(1)
# 波段类型
print(band.DataType)
# 波段大小
print(band.XSize,band.YSize)
# 波段数据的属性
print(band.GetNoDataValue())
# Maximum 是表示在本波段数值中最大的值,Minimum就是表示本波段中最小的值
print(band.GetMaximum(),band.GetMinimum())
#
print(band.ComputeRasterMinMax())
# 栅格数据的宽度
x_size = ds.RasterXSize
# 栅格数据的高度
y_size = ds.RasterYSize
print(x_size,y_size)
# 获取栅格的6个参数
gt  = ds.GetGeoTransform()
# 左上角
ul_x = gt[0]
ul_y = gt[3]
# 右下角
lr_x  = gt[0] + x_size*gt[1] + y_size*gt[2]
lr_y = gt[3] + x_size*gt[4] + y_size*gt[5]
print(ul_x,ul_y)
print(lr_x,lr_y)
# 栅格数据的投影
print(ds.GetProjection())
# 读取栅格元数据
print(ds.GetMetadata())
#
print(gt)

# print out (114.11064773797989, 2.682209014892578e-06, 0.0, 22.29586511850357, 0.0, -2.682209014892578e-06)
```

### GDAL 创建栅格影像
- 创建单波段影像
```python
from osgeo import gdal,osr
import numpy as np
# 设置驱动
driver = gdal.GetDriverByName('GTiff')
filename = 'ddd.tif'
w,h =255,255
# 波段个数
bands=1
# 数据类型
t = gdal.GDT_Byte
# 创建tif数据
ds = driver.Create(filename,w,h,bands,t)
# 设置栅格六参数,这里随便设置而已
ds.SetGeoTransform([153312,1,0,451343,0,1])
# 空间参考
srs = osr.SpatialReference()
# 生成具有给定 UTM 区域的全套横向墨卡托投影参数的投影定义
srs.SetUTM(11,1)
# 设置 GeogCS
srs.SetWellKnownGeogCS('WGS84')
# 设置栅格投影
ds.SetProjection(srs.ExportToWkt())
# 生成raster数据
raster = np.ones((w,h)) * 138
ds.GetRasterBand(1).WriteArray(raster)

```
- Pillow与GDAL读取数据的转换
```python
from osgeo import gdal,osr
import numpy as np
from PIL import Image

ds = gdal.Open('demo.tif')
data = ds.ReadRaster(30,70,5,5)


im = Image.open("demo.tif")
region = im.crop((30,70,5,5))
print(region.tobytes())

# 转成PIL格式
datas = [i for i in data]
datas = [np.reshape(i,(-1,1)) for i in data]
datas = np.concatenate(datas,1)
print(datas.tostring())

```

## 常用GDAL 指令
### gdalwrap 截取GTiff

- shell 
```shell
gdalwarp -t_srs EPSG:4326 -te 114.14943 22.30447 114.15556 22.31311 -of JPEG demo.tif out.png
```
- python 
```python
try:
    from osgeo import gdal
except:
    import gdal
import os

def wrapTiff(source, dest_tif, dest_img, outputBounds):
    # gdalwarp -t_srs EPSG:4326 -te 114.14943 22.30447 114.15556 22.31311 -of JPEG 油尖旺区_卫图_20181004_Level_19.tif out.png
    try:
        dirName, filename = os.path.split(dest_tif)
        if not os.path.exists(dirName):
            os.makedirs(dirName)
        opt = gdal.WarpOptions(outputBounds=outputBounds, format='MEM', dstSRS="EPSG:4326")
        ds = gdal.Warp(dest_tif, source, options=opt)
        driver = gdal.GetDriverByName("GTiff")
        driver.CreateCopy(dest_tif, ds)

        ds = gdal.Warp(dest_img, source, options=opt)
        driver = gdal.GetDriverByName("JPEG")
        driver.CreateCopy(dest_img, ds)
        return True
    except Exception as e:
        print(e)
        return False   
```
### gdal2tiles GTiff文件转成raster瓦片指令 <br />
```shell
gdal2tiles.py --xyz  -z 1-19  -p mercator -w all -r average -s EPSG:4326 -a 0.0 --processes=6 input.tif output_dir
```


### gdal_translate  <br />
- shell
```shell
# jpg、png 转成geo tiff
gdal_translate -of GTiff -a_srs EPSG:4326 -a_ullr  ulx uly lrx lry  input.jpg  out.tif

```

- python
```python
try:
    from osgeo import gdal
except:
    import gdal
import os
def tiff2png(source, out):
    try:
        ds = gdal.Open(source)
        info = gdal.Info(ds=ds,format='json')
        center = info['cornerCoordinates']['center']
        opt = gdal.TranslateOptions(format='PNG', height=1024, width=1024)
        gdal.Translate(out, source, options=opt)
        center_str = str(center[0]) +","+str(center[1])
        return center_str
    except Exception as e:
        print(e)
        return None
```