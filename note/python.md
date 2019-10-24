## 一.python项目环境搭建
  `1. pip install virtualenv`
  
  `2. virtualenv -p python3 --no-size-packages env`
  
  `3. source env/bin/activate`
  
  清华源设置默认 :``` pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple  ```
  
  临时安装: ``` pip install -i https://pypi.tuna.tsinghua.edu.cn/simple some-package  ```
  
  `4. pip install [your want package]`

## 二.python爬虫亚马逊网站商品信息

- 把爬下来的数据进行分析，生成对应的.xlsx文件，包含商品的价格，星级，图片链接，名称等

```python

from selenium import webdriver
from selenium.common.exceptions import NoSuchElementException
from bs4 import BeautifulSoup
import pandas as pd
import xlwt

# 关于样式
style_head = xlwt.XFStyle() # 初始化样式

font = xlwt.Font() # 初始化字体相关
font.name = "微软雅黑"
font.bold = True
font.colour_index = 1

bg = xlwt.Pattern() # 初始背景图案
bg.pattern = xlwt.Pattern.SOLID_PATTERN
bg.pattern_fore_colour = 4
# 设置字体
style_head.font = font
# 设置背景
style_head.pattern = bg


# 创建一个excel
excel = xlwt.Workbook()

baseUrl = 'https://www.amazon.com/Best-Sellers'

# 获取分类链接
def GetUrls():
    arrUrl = []
    browser = webdriver.Chrome()
    try:
        browser.get('https://www.amazon.com/Best-Sellers/zgbs')
        html = browser.page_source
        # print(html)
        bsObj = BeautifulSoup(html, 'html.parser')
        d1 = bsObj.find_all('a')
        for v in d1:
            url = v.get('href')
            # 获取相关链接
            if baseUrl in str(url):
                arrUrl.append(url)
            else:
                continue
    finally:
        browser.close()
    print(arrUrl)
    return arrUrl

# 获取分类页面链接
def GetPageUrl(ulr):
    browser = webdriver.Chrome()
    arrUrl = []
    try:
        browser.get(ulr)
        # 获取分类名称
        print("aaaaaaaaaaaaaaaaa",ulr)
        try:
            title = browser.find_element_by_class_name('category').text
        except NoSuchElementException:
                return [],''
        try:
            for links in browser.find_element_by_class_name('a-pagination').find_elements_by_xpath("//*[@href]"):

                if 'https://www.amazon.com/Best-Sellers' and 'ref=zg_bs_pg_' in links.get_attribute('href'):
                    link = links.get_attribute('href')
                    if link not in arrUrl:
                            arrUrl.append(link)
        except NoSuchElementException:
            print('err: url>>>>>>>>>>',ulr)
            return [],''

    finally:
        browser.close()
    print(arrUrl)
    print()
    print(title)
    return arrUrl,title

def GetData(url):
    browser = webdriver.Chrome()
    arr2 = []
    try:
        browser.get(url)
        html = browser.page_source
        # print(html)
        bsObj = BeautifulSoup(html, 'html.parser')
        # print(bsObj.find_all('#zg-ordered-list'))
        try:
            datas = browser.find_elements_by_class_name('zg-item-immersion')

            for val in datas:
                data = val.find_element_by_class_name('a-list-item').text
                arr = str.split(data,"\n")
                for i in range(0, len(arr), 4):
                    if len(arr[i:i + 4]) == 4:
                        arr2.append(arr[i:i + 4])


        except  NoSuchElementException:
            print("err-url:",url)

    finally:
        browser.close()

    return arr2

def main():
    datas = []
    classUrl = GetUrls()
    for url in classUrl:
        if 'https://www.amazon.com/Best-Sellers/zgbs/ref=zg_bs_tab/'  in url:
            print(url)
            continue
        if 'https://www.amazon.com/Best-Sellers-MP3-Downloads/zgbs/dmusic' in url:
            print(url)
            continue
        pageUrls,title = GetPageUrl(url)
        print(title)
        sheet = excel.add_sheet(title)
        head = ["badge", "name", "star", "price"]
        for index, value in enumerate(head):
            sheet.write(0, index, value, style_head)
        if  pageUrls.__len__() == 0:
            print("sss",url)
            continue
        for v in pageUrls:
            data = GetData(v)
            datas += data
            createCsv(data,title)
        createExcel(datas,sheet)
        datas = []


def createCsv(data,title):
    arrBadge = []
    arrName = []
    arrSatr = []
    arrPrice = []
    for v in data:
        arrBadge.append(v[0])
        arrName.append(v[1])
        arrSatr.append(v[2])
        arrPrice.append(v[3])
        df = pd.DataFrame({
            'Badge': arrBadge,
            'name': arrName,
            'start': arrSatr,
            'price': arrPrice, })
        df.to_csv(title + '.csv')

def createExcel(data,sheet):
    arr = []
    for val in data:
        arr.append(tuple(val))
    for index,value_list in enumerate(arr,1):
        for i , value in enumerate(value_list):
            sheet.write(index,i,value)
    excel.save("goodData.xlsx")
    print("sucess")
if __name__=="__main__":
    # arr = ['https://www.amazon.com/Best-Sellers/zgbs/smart-home/ref=zg_bs_nav_0/139-3807419-5993042', 'https://www.amazon.com/Best-Sellers-Sports-Outdoors/zgbs/sporting-goods/ref=zg_bs_nav_0/139-3807419-5993042', 'https://www.amazon.com/Best-Sellers-Sports-Collectibles/zgbs/sports-collectibles/ref=zg_bs_nav_0/139-3807419-5993042', 'https://www.amazon.com/Best-Sellers-Home-Improvement/zgbs/hi/ref=zg_bs_nav_0/139-3807419-5993042', 'https://www.amazon.com/Best-Sellers-Toys-Games/zgbs/toys-and-games/ref=zg_bs_nav_0/139-3807419-5993042']
    # for u in arr:
    #     GetPageUrl(u)
    main()```
