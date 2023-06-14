<template><div><h1 id="postgres-数据库常用操作语句" tabindex="-1"><a class="header-anchor" href="#postgres-数据库常用操作语句" aria-hidden="true">#</a> postgres 数据库常用操作语句</h1>
<ul>
<li>获取数据表列名称数据</li>
</ul>
<div class="language-postgresql line-numbers-mode" data-ext="postgresql"><pre v-pre class="language-postgresql"><code>SELECT  c.relname as tablename,a.attname AS field,cast(obj_description(relfilenode,'pg_class') as varchar) AS comment,
        concat_ws('',t.typname,SUBSTRING(format_type(a.atttypid,a.atttypmod) from '\(.*\)')) as &quot;type&quot;
FROM pg_class c, pg_attribute a
                     LEFT JOIN pg_description b
                               ON a.attrelid = b.objoid
                                   AND a.attnum = b.objsubid, pg_type t
WHERE c.relname = 'table_name'
  AND a.attnum &gt; 0
  AND a.attrelid = c.oid
  AND a.atttypid = t.oid
ORDER BY a.attnum;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li></li>
</ul>
</div></template>


