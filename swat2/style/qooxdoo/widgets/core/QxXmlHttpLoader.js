/* Copyright (c): 2002-2005 (Germany): United Internet, 1&1, GMX, Schlund+Partner, Alturo */
function QxXmlHttpLoader(){QxTarget.call(this);if(!QxXmlHttpLoader._ok){throw new Error("Your Browser does not support XML-HTTP!");};var o=this;this.__onreadystatechange=function(){o._onreadystatechange();};this.__onload=function(){o._onload();};this.__onreadystatefix=function(){o.req.readyState=4;o._onreadystatechange();};};QxXmlHttpLoader.extend(QxTarget,"QxXmlHttpLoader");QxXmlHttpLoader._http=window.XMLHttpRequest?true:false;QxXmlHttpLoader._activex=window.ActiveXObject&&!(new QxClient).isOpera()?true:false;QxXmlHttpLoader._activexobj=null;QxXmlHttpLoader._ok=QxXmlHttpLoader._http||QxXmlHttpLoader._activex;if(QxXmlHttpLoader._activex){var servers=["MSXML2","Microsoft","MSXML","MSXML3"];for(var i=0;i<servers.length;i++){try{var o=new ActiveXObject(servers[i]+".XMLHTTP");QxXmlHttpLoader._activexobj=servers[i];o=null;}catch(ex){};};};QxXmlHttpLoader.addProperty({name:"xml"});proto.load=function(url){try{this.req=QxXmlHttpLoader._activex?new ActiveXObject(QxXmlHttpLoader._activexobj+".XMLHTTP"):new XMLHttpRequest();if(typeof this.req.abort!="undefined"){this.req.abort();};this.req.onreadystatechange=this.__onreadystatechange;if(this.req.readyState==null){this.req.readyState=1;req.addEventListener("load",this.__onreadystatefix,false);};this.req.open("GET",url,true);return QxXmlHttpLoader._activex?this.req.send():this.req.send(null);}catch(e){throw new Error("Your browser does not support XML-HTTP:\n"+e);};};proto._onload=function(){};proto._onreadystatechange=function(){switch(this.req.readyState){case 1:if(this.hasEventListeners("init")){this.dispatchEvent(new QxEvent("init"));};break;case 2:if(this.hasEventListeners("connect")){this.dispatchEvent(new QxEvent("connect"));};if(this.req.status!=200&&this.req.status!=0){if(typeof this.req.abort!="undefined")this.req.abort();throw new Error("File request failed:"+this.req.statusText+"["+this.req.status+"]");};break;case 3:if(this.hasEventListeners("download"))this.dispatchEvent(new QxEvent("download"));try{var l=this.req.getResponseHeader("Content-Length");if(typeof l!="number"){l=NaN;};}catch(ex){var l=NaN;};break;case 4:if(this.hasEventListeners("done")){this.dispatchEvent(new QxEvent("done"));};if(this.req.status!=200&&this.req.status!=0){if(this.req.abort){this.req.abort();};throw new Error("File request failed:"+this.req.statusText+"["+this.req.status+"]");};if(!this.req.responseXML.documentElement){var s = String(this.req.responseText).replace(/<\?xml[^\?]*\?>/, "");this.req.responseXML.loadXML(s);};if(!this.req.responseXML.documentElement){throw new Error("Missing Document Element!");};if(this.req.responseXML.documentElement.tagName=="parseerror"){throw new Error("XML-File is not well-formed!");};this.dispatchEvent(new QxDataEvent("complete",this.req.responseXML),true);};};proto.dispose=function(){if(this._disposed){return;};if(this.req){this.req=null;};this.__onreadystatechange=null;return QxTarget.prototype.dispose.call(this);};