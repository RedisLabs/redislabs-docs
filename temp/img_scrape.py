import image_scraper

rc_base_url = "https://redislabs.com/redis-cloud-documentation/"

image_scraper.scrape_images("https://redislabs.com/redis-cloud-documentation/overview/")
rc = open("rc_urls.txt", "r")
for line in rc.readlines():
        url = rc_base_url + line
        print(url)
        image_scraper.scrape_images(url)