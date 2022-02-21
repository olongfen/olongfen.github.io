# gis note

### GDAL
   - gdal2tiles Gtiff文件转成raster瓦片指令 <br />
      ```shell
      gdal2tiles.py --xyz  -z 1-19  -p mercator -w all -r average -s EPSG:4326 -a 0.0 --processes=6 input.tif output_dir```


   - gdal_translate jpg、png 转成geo tiff <br /> 
      ```shell
         gdal_translate -of GTiff -a_srs EPSG:4326 -a_ullr  ulx uly lrx lry  input.jpg  out.tif
 
      ```
     
### POSTGIS
- postgis 导入数据指令 raster2pgsql
  

```
222
     -s <srid>空间参考id,必须设置,如 -s 4326
               
     -b <band>要提取的栅格波段.不设置则写入所有波段,从1开始,如要提取多个用,号隔开,如 -b 1,2
               
     -t  <title size>栅格切片大小,格式为WIDTHxHEIGHT.,不设置则不切片,导入后只有一行数据.切片后每一片一行,如 -t 256*256
               
     -P 自动填充瓦片右下角.有些瓦片的有效数据可能达不到-t指定的大小,因此需要自动补填充,确保所有瓦片具有相同的宽度和高度,只有切片才需要设置,如 -P
               
     -R 注册栅格的db文件,提供db文件的绝对路径
               
     (d|a|c|p)这些是互斥选项,只能选择其中之一:
               
     -d 删除该表, 然后重新创建
               
     -a 追加到当前表中, 图层字段必须与表架构完全相同
               
     -c 创建一个新表并填充它, 如果不指定任何选项, 这是默认值
               
     -p 准备模式, 只创建表
               
     -f <column>指写raster列名称,如 -f rast
               
     -F  在栅格表中添加列名称字段,列名称默认为filename,用于存储删除文件名(不包含路径),如 -F
               
     -n <column> 与-F参数作用相同,只是允许自定义文件列的列名称,如 -n "fname"
               
     -l <overview factor> 未用过,具体用途有用过的欢迎补充.创建栅格的覆盖因子.对于超过多个因素用逗号,分开.覆盖表名如下模式"o_<overview factor>_<table>".创建的覆盖因子是存储在数据库中,不受-R参数影响
               
     -q  Wrap PostgreSQL identifiers in quotes.
               
     -I  在栅格列上创建GIST 空间索引
               
     -M 导入完成后运行VACUUM ANALYZE.
               
     -C 在加载栅格后设置栅格列上的标准约束集,如果一个或多个栅格违反约束,某些约束可能会失败
               
     -x 禁用设置最大范围约束,只有在使用了-C时才有效
               
     -r 设置约束(空间唯一和覆盖磁贴) 以进行常规阻塞,只有在使用了-C时才有效
               
     -T <tablespace> 指定使用的表空间,索引如未使用-X 标志将使用默认表空间 ,如-T "tabspace"
               
     -X <tablespace> 指定使用的索引表空间,不设置将使用默认表空间,如-X "idxtabspace"
               
     -N <nodata> 非数据值,用于没有 NODATA 值的波段.
               
     -k  跳过每个栅格波段的NODATA值检查
               
     -E <endian> 指栅格生成二进制时是大端(big-endian)生成还是小端生成(little-endian),使用0表示XDR,使用1表示NDR(默认值),目前仅支持NDR,如-E 1
               
     little-endian为网络数据表示NDR
               
     big-endian为外部数据表示XDR
               
     -V <version> 指定输出WKB格式的版本,默认是0,目前仅支持0,如-V 0
               
     -e   单独执行每个语句,不要使用事务
               
     -Y  使用COPY语句而不是插入语句
               
     -G  打印支持的 GDAL 栅格格式
               
     -?  打印帮助
     
     raster2pgsql -s 4326 -b 1 -t 256x256  -P -d -f "rast" -F -I -M -C -T "nuts" -X "idxnuts" "demo.tif "  public.dem | psql -h localhost -p 5432 -U postgres -d database

```