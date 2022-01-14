# gis note

### GDAL
   - gdal2tiles Gtiff文件转成raster瓦片指令 <br />
      ```shell
      gdal2tiles.py --xyz  -z 1-19  -p mercator -w all -r average -s EPSG:4326 -a 0.0 --processes=6 input.tif output_dir```


   - gdal_translate jpg、png 转成geo tiff <br /> 
      ```shell
         gdal_translate -of GTiff -a_srs EPSG:4326 -a_ullr  ulx uly lrx lry  input.jpg  out.tif
 
      ```