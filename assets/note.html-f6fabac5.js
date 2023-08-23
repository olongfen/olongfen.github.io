import{_ as e,o as a,c as t,e as i}from"./app-e9d335a5.js";const n={},s=i(`<h1 id="postgres-数据库常用操作语句" tabindex="-1"><a class="header-anchor" href="#postgres-数据库常用操作语句" aria-hidden="true">#</a> postgres 数据库常用操作语句</h1><ul><li>获取数据表列名称数据</li></ul><div class="language-postgresql line-numbers-mode" data-ext="postgresql"><pre class="language-postgresql"><code>SELECT  c.relname as tablename,a.attname AS field,cast(obj_description(relfilenode,&#39;pg_class&#39;) as varchar) AS comment,
        concat_ws(&#39;&#39;,t.typname,SUBSTRING(format_type(a.atttypid,a.atttypmod) from &#39;\\(.*\\)&#39;)) as &quot;type&quot;
FROM pg_class c, pg_attribute a
                     LEFT JOIN pg_description b
                               ON a.attrelid = b.objoid
                                   AND a.attnum = b.objsubid, pg_type t
WHERE c.relname = &#39;table_name&#39;
  AND a.attnum &gt; 0
  AND a.attrelid = c.oid
  AND a.atttypid = t.oid
ORDER BY a.attnum;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li></li></ul>`,4),l=[s];function d(r,c){return a(),t("div",null,l)}const m=e(n,[["render",d],["__file","note.html.vue"]]);export{m as default};
