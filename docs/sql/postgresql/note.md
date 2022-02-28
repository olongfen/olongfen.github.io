# postgres 数据库常用操作语句

- 获取数据表列名称数据
```postgresql
SELECT  c.relname as tablename,a.attname AS field,cast(obj_description(relfilenode,'pg_class') as varchar) AS comment,
        concat_ws('',t.typname,SUBSTRING(format_type(a.atttypid,a.atttypmod) from '\(.*\)')) as "type"
FROM pg_class c, pg_attribute a
                     LEFT JOIN pg_description b
                               ON a.attrelid = b.objoid
                                   AND a.attnum = b.objsubid, pg_type t
WHERE c.relname = 'table_name'
  AND a.attnum > 0
  AND a.attrelid = c.oid
  AND a.atttypid = t.oid
ORDER BY a.attnum;
```

- 