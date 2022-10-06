import schedule
import time
import pymysql
import requests
import threading
from selenium import webdriver
from bs4 import BeautifulSoup

conn1 = None
conn2 = None

def db_connect():
    conn = pymysql.connect(host='j7c205.p.ssafy.io', user='ssafy', password='jaranda', db='ssafy', charset='utf8')
    return conn

def file_open():
    file = open("./txt/mart_list.txt", 'r', encoding='utf8')
    return file

def init():
    headers = requests.utils.default_headers()
    headers.update({
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36',
    })
    
    options = webdriver.ChromeOptions()
    options.add_argument('headless')
    options.add_argument('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36')

    driver = webdriver.Chrome("./driver/chromedriver", chrome_options=options)
    
    return driver, headers

def update(conn, ingredient_id, no, name, price, url, mart):
    cur = conn.cursor()

    sql = "UPDATE mart SET item_name = %s, item_price = %s, item_url = %s WHERE ingredient_id = %s and item_no = %s and mart = %s"
    
    cur.execute(sql, (name, price, url, ingredient_id, no, mart))
    
    # conn.commit()

def emart_crawling(headers):
    global conn1
    conn1 = db_connect()

    file = file_open()

    print("emart start: "+time.strftime('%Y.%m.%d - %H:%M:%S'))
    while True:
        # print(time.strftime('%Y.%m.%d - %H:%M:%S'))

        line = file.readline()
        if not line: break
        data = line.split("\t")
        ingredient_id = int(data[0])
        ingredient_name = data[1].replace("\n", "")
    
        url = "https://emart.ssg.com/search.ssg?target=all&query=" + ingredient_name
        page = requests.get(url, headers=headers)
        soup = BeautifulSoup(page.content, "html.parser")
        print(url)
        
        content = soup.find("div", "tmpl_itemlist")
        item_list = content.find_all("a", {"data-index":"0", "data-position":"view"})[1:6:2]
        price_list = content.find_all("div", "opt_price")[:3]
        
        for i in range(len(price_list)):
            item = item_list[i]
            item_name = item.find("em", "tx_ko").text
            item_price = price_list[i].find("em", "ssg_price").text
            item_url = item.attrs['href']
            if item_url[0] == '/': item_url = "https://emart.ssg.com" + item_url
            update(conn1, ingredient_id, i+1, item_name, item_price, item_url, 0)
            print(item_name, item_price, item_url)
        
        for i in range(len(price_list)+1, 4):
            update(conn1, ingredient_id, i, None, None, None, 0)

        print("------------------------------------")
        time.sleep(2)
    print("emart end: "+time.strftime('%Y.%m.%d - %H:%M:%S'))
    file.close()

def homeplus_crawling(driver):
    global conn2
    conn2 = db_connect()

    file = file_open()

    print("homeplus start: "+time.strftime('%Y.%m.%d - %H:%M:%S'))
    while True:
        # print(time.strftime('%Y.%m.%d - %H:%M:%S'))

        line = file.readline()
        if not line: break
        data = line.split("\t")
        ingredient_id = int(data[0])
        ingredient_name = data[1].replace("\n", "")
        
        url = "https://front.homeplus.co.kr/search?entry=direct&keyword=" + ingredient_name
        driver.get(url)
        time.sleep(0.3)
        page = driver.page_source
        soup = BeautifulSoup(page, 'html.parser')
        print(url)
        item_list = soup.find_all("div", "detailInfo")[:3]
        price_list = soup.find_all("div", "price")[:3]
        
        for i in range(len(item_list)):
            item = item_list[i]
            item_name = item.find("p", "css-12cdo53-defaultStyle-Typography-ellips").text
            item_price = price_list[i].text.split(" ")[0]
            item_url = "https://front.homeplus.co.kr" + item.find("a").attrs['href']
            update(conn2, ingredient_id, i+1, item_name, item_price, item_url, 1)
            print(item_name, item_price, item_url)
            
        for i in range(len(item_list)+1, 4):
            update(conn2, ingredient_id, i, None, None, None, 1)
            
        print("------------------------------------")
    print("homeplus end: "+time.strftime('%Y.%m.%d - %H:%M:%S'))
    file.close()
    
    
def commit():
    global conn1, conn2

    conn1.commit()
    conn2.commit()

    conn1.close()
    conn2.close()
    print("commit: "+time.strftime('%Y.%m.%d - %H:%M:%S'))

def run_threaded(job_func, arg):
    job_thread = threading.Thread(target=job_func, args=(arg,))
    job_thread.start()

if __name__ == '__main__':
    # conn1 = db_connect()
    # conn2 = db_connect()
    driver, headers = init()
    
    schedule.every().hour.at(":01").do(run_threaded, emart_crawling, headers)
    schedule.every().hour.at(":40").do(run_threaded, homeplus_crawling, driver)
    schedule.every().hour.at(":00").do(commit)

    while 1:
        schedule.run_pending()
        time.sleep(1)

    

