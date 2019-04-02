"use strict";
var page = require('webpage').create(),
    system = require('system'),
    address, output, size, pageWidth, pageHeight;

if (system.args.length < 3 || system.args.length > 5) {
    console.log('Usage: rasterize.js URL filename [paperwidth*paperheight|paperformat] [zoom]');
    console.log('  paper (pdf output) examples: "5in*7.5in", "10cm*20cm", "A4", "Letter"');
    console.log('  image (png/jpg output) examples: "1920px" entire page, window width 1920px');
    console.log('                                   "800px*600px" window, clipped to 800x600');
    phantom.exit(1);
} else {
    address = system.args[1];
    address = "https://demo.elastic.co/app/kibana#/dashboard/06fa0b60-121a-11e8-8c94-a3d8d0cfd62b?_g=(refreshInterval:(pause:!t,value:0),time:(from:now-5y,mode:quick,to:now))&_a=(description:'',filters:!(),fullScreenMode:!f,options:(darkTheme:!t,hidePanelTitles:!f,useMargins:!f),panels:!((embeddableConfig:(mapCenter:!(35.746512259918504,-29.443359375000004),mapZoom:3),gridData:(h:25,i:'2',w:48,x:0,y:70),id:'7fe767b0-11fd-11e8-8c94-a3d8d0cfd62b',panelIndex:'2',title:'Global%20User%20Activity',type:visualization,version:'6.5.4'),(gridData:(h:30,i:'17',w:24,x:0,y:10),id:a0340090-1389-11e8-8c94-a3d8d0cfd62b,panelIndex:'17',title:Users,type:visualization,version:'6.5.4'),(gridData:(h:10,i:'26',w:24,x:24,y:0),id:fec4c5c0-139a-11e8-8c94-a3d8d0cfd62b,panelIndex:'26',title:'User%20Activity',type:visualization,version:'6.5.4'),(gridData:(h:5,i:'29',w:24,x:0,y:5),id:'5e89e2b0-13a0-11e8-8c94-a3d8d0cfd62b',panelIndex:'29',title:'',type:visualization,version:'6.5.4'),(gridData:(h:5,i:'32',w:24,x:0,y:0),id:aa01fff0-13bb-11e8-8c94-a3d8d0cfd62b,panelIndex:'32',title:'',type:visualization,version:'6.5.4'),(gridData:(h:10,i:'33',w:24,x:24,y:10),id:'27f9bd40-13ca-11e8-8c94-a3d8d0cfd62b',panelIndex:'33',title:'Access%20Requests',type:visualization,version:'6.5.4'),(gridData:(h:20,i:'34',w:24,x:24,y:20),id:fca6aa70-13cb-11e8-8c94-a3d8d0cfd62b,panelIndex:'34',title:'Resource%20Changes',type:visualization,version:'6.5.4'),(gridData:(h:15,i:'35',w:24,x:24,y:55),id:f7d7bb80-1824-11e8-8c94-a3d8d0cfd62b,panelIndex:'35',title:'Top%20Resource%20Groups',type:visualization,version:'6.5.4'),(embeddableConfig:(vis:(params:(sort:(columnIndex:3,direction:desc)))),gridData:(h:30,i:'37',w:24,x:0,y:40),id:f93f09d0-1bec-11e8-8c94-a3d8d0cfd62b,panelIndex:'37',title:'Top%20Caller%20IPs',type:visualization,version:'6.5.4'),(gridData:(h:15,i:'38',w:24,x:24,y:40),id:'2e863080-1bef-11e8-8c94-a3d8d0cfd62b',panelIndex:'38',title:'Top%20Resource%20Types',type:visualization,version:'6.5.4')),query:(language:lucene,query:''),timeRestore:!f,title:'%5BAzure%20Monitor%5D%20User%20Activity',viewMode:view)";
    output = system.args[2];
    page.viewportSize = { width: 1366, height: 712 };
    if (system.args.length > 3 && system.args[2].substr(-4) === ".pdf") {
        size = system.args[3].split('*');
        page.paperSize = size.length === 2 ? { width: size[0], height: size[1], margin: '0px' }
                                           : { format: system.args[3], orientation: 'portrait', margin: '1cm' };
    } else if (system.args.length > 3 && system.args[3].substr(-2) === "px") {
        size = system.args[3].split('*');
        if (size.length === 2) {
            pageWidth = parseInt(size[0], 10);
            pageHeight = parseInt(size[1], 10);
            page.viewportSize = { width: pageWidth, height: pageHeight };
            page.clipRect = { top: 0, left: 0, width: pageWidth, height: pageHeight };
        } else {
            console.log("size:", system.args[3]);
            pageWidth = parseInt(system.args[3], 10);
            pageHeight = parseInt(pageWidth * 3/4, 10); // it's as good an assumption as any
            console.log ("pageHeight:",pageHeight);
            page.viewportSize = { width: pageWidth, height: pageHeight };
        }
    }
    if (system.args.length > 4) {
        page.zoomFactor = system.args[4];
    }

    page.open(address, function (status) {

        if (status !== 'success') {
            console.log('Unable to load the address!');
            phantom.exit(1);
        } else {

            console.log(document.readyState)    
            console.log("generating pdf...please wait 1- 20 minutes")

            window.setInterval(function(){console.log("processing please wait")},5000)


            window.setTimeout(function () {
                page.render(output);
                phantom.exit();
            },100000);
        }
    });
   
}

