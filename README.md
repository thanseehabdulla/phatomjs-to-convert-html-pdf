# phatomjs-to-convert-html-pdf

Install PhantomJS on Ubuntu 18.04 LTS using Terminal

**Step 1: Update Package List**

$ sudo apt-get update&nbsp;

**Step 2: Install following Libs**

$ sudo apt-get install build-essential chrpath libssl-dev libxft-dev -y

$ sudo apt-get install libfreetype6 libfreetype6-dev -y

$ sudo apt-get install libfontconfig1 libfontconfig1-dev -y

**Step 3: Export File**

$ export PHANTOM_JS="phantomjs-2.1.1-linux-x86_64"

**Step 4: Download file**

$ wget https://github.com/Medium/phantomjs/releases/download/v2.1.1/$PHANTOM_JS.tar.bz2

**Step 5: Extract file**

$ sudo tar xvjf $PHANTOM_JS.tar.bz2

**Step 6: Move to share directory**

$ sudo mv $PHANTOM_JS /usr/local/share

**Step 7:**

$ sudo ln -sf /usr/local/share/$PHANTOM_JS/bin/phantomjs /usr/local/bin

**Step 8: Check Installed Version**

$ phantomjs --version

**If you want to create PDF versions of your HTML use phantomjs PDF rendering. The rasterise.js example given in the PhantomJS works perfectly out of the box.**

You can execute this on the command-line using:

phantomjs rasterize.js 'http://en.wikipedia.org/w/index.php?title=Jakarta&printable=yes' jakarta.pdf
