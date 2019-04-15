import datetime

def getLocalTime():
    currTime = datetime.datetime.now()
    timestr = currTime.strftime("%Y-%m-%d %H:%M:%S")
    return timestr
