/*
 * @author    RocketTheme http://www.rockettheme.com
 * @copyright Copyright (C) 2007 - 2012 RocketTheme, LLC
 * @license   http://www.gnu.org/licenses/gpl-2.0.html GNU/GPLv2 only
 */
var Rainbows=[];var MooRainbow=new Class({Implements:[Options,Events],options:{id:"mooRainbow",prefix:"moor-",imgPath:"images/",startColor:[255,0,0],wheel:false,transparent:1,onComplete:$empty,onChange:$empty},initialize:function(c,d){this.element=document.id(c);
if(!this.element){return;}this.setOptions(d);this.sliderPos=0;this.pickerPos={x:0,y:0};this.backupColor=this.options.startColor;this.currentColor=this.options.startColor;
this.sets={rgb:[],hsb:[],hex:[]};this.pickerClick=this.sliderClick=false;if(!this.layout){this.doLayout();}this.OverlayEvents();this.sliderEvents();this.backupEvent();
if(this.options.wheel){this.wheelEvents();}this.element.addEvent("click",function(a){this.closeAll().toggle(a);}.bind(this));this.layout.overlay.setStyle("background-color",this.options.startColor.rgbToHex());
this.layout.backup.setStyle("background-color",this.backupColor.rgbToHex());this.pickerPos.x=this.snippet("curPos").l+this.snippet("curSize","int").w;this.pickerPos.y=this.snippet("curPos").t+this.snippet("curSize","int").h;
this.manualSet(this.options.startColor);this.pickerPos.x=this.snippet("curPos").l+this.snippet("curSize","int").w;this.pickerPos.y=this.snippet("curPos").t+this.snippet("curSize","int").h;
this.sliderPos=this.snippet("arrPos")-this.snippet("arrSize","int");if(window.khtml){this.hide();}},toggle:function(){this[this.visible?"hide":"show"]();
},show:function(){this.rePosition();this.layout.setStyle("display","block");this.visible=true;},hide:function(){this.layout.setStyles({display:"none"});
this.visible=false;},closeAll:function(){Rainbows.each(function(b){b.hide();});return this;},manualSet:function(f,i){if(!i||(i!="hsb"&&i!="hex")){i="rgb";
}var j,g,h;if(i=="rgb"){j=f;g=f.rgbToHsb();h=f.rgbToHex();}else{if(i=="hsb"){g=f;j=f.hsbToRgb();h=j.rgbToHex();}else{h=f;j=f.hexToRgb(true);g=j.rgbToHsb();
}}this.setMooRainbow(j);this.autoSet(g);},autoSet:function(w){var n=this.snippet("curSize","int").h;var x=this.snippet("curSize","int").w;var v=this.layout.overlay.height;
var p=this.layout.overlay.width;var o=this.layout.slider.height;var c=this.snippet("arrSize","int");var t;var q=Math.round(((p*w[1])/100)-x);var s=Math.round(-((v*w[2])/100)+v-n);
var r=Math.round(((o*w[0])/360));r=(r==360)?0:r;var u=o-r+this.snippet("slider")-c;t=[this.sets.hsb[0],100,100].hsbToRgb().rgbToHex();this.layout.cursor.setStyles({top:s,left:q});
this.layout.arrows.setStyle("top",u);this.layout.overlay.setStyle("background-color",t);this.sliderPos=this.snippet("arrPos")-c;this.pickerPos.x=this.snippet("curPos").l+x;
this.pickerPos.y=this.snippet("curPos").t+n;},setMooRainbow:function(f,i){if(!i||(i!="hsb"&&i!="hex")){i="rgb";}var j,g,h;if(i=="rgb"){j=f;g=f.rgbToHsb();
h=f.rgbToHex();}else{if(i=="hsb"){g=f;j=f.hsbToRgb();h=j.rgbToHex();}else{h=f;j=f.hexToRgb();g=j.rgbToHsb();}}this.sets={rgb:j,hsb:g,hex:h};if(!$chk(this.pickerPos.x)){this.autoSet(g);
}this.RedInput.value=j[0];this.GreenInput.value=j[1];this.BlueInput.value=j[2];this.HueInput.value=g[0];this.SatuInput.value=g[1];this.BrighInput.value=g[2];
this.hexInput.value=h;this.currentColor=j;this.chooseColor.setStyle("background-color",j.rgbToHex());},parseColors:function(l,h,i){var j=Math.round((l*100)/this.layout.overlay.width);
var b=100-Math.round((h*100)/this.layout.overlay.height);var k=360-Math.round((i*360)/this.layout.slider.height)+this.snippet("slider")-this.snippet("arrSize","int");
k-=this.snippet("arrSize","int");k=(k>=360)?0:(k<0)?0:k;j=(j>100)?100:(j<0)?0:j;b=(b>100)?100:(b<0)?0:b;return[k,j,b];},OverlayEvents:function(){var g,h,e,f;
h=this.snippet("curSize","int").h;e=this.snippet("curSize","int").w;f=$A(this.arrRGB).concat(this.arrHSB,this.hexInput);document.addEvent("click",function(){if(this.visible){this.hide(this.layout);
}}.bind(this));f.each(function(a){a.addEvent("keydown",this.eventKeydown.bindWithEvent(this,a));a.addEvent("keyup",this.eventKeyup.bindWithEvent(this,a));
},this);[this.element,this.layout].each(function(a){a.addEvents({click:function(b){new Event(b).stop();},keyup:function(b){b=new Event(b);if(b.key=="esc"&&this.visible){this.hide(this.layout);
}}.bind(this)},this);},this);g={x:[0-e,(this.layout.overlay.width-e)],y:[0-h,(this.layout.overlay.height-h)]};this.layout.drag=new Drag(this.layout.cursor,{limit:g,onBeforeStart:this.overlayDrag.bind(this),onStart:this.overlayDrag.bind(this),onDrag:this.overlayDrag.bind(this),snap:0});
this.layout.overlay2.addEvent("mousedown",function(a){a=new Event(a);this.layout.cursor.setStyles({top:a.page.y-this.layout.overlay.getTop()-h,left:a.page.x-this.layout.overlay.getLeft()-e});
this.layout.drag.start(a);}.bind(this));this.okButton.addEvent("click",function(){if(this.currentColor==this.options.startColor){this.hide();this.fireEvent("onComplete",[this.sets,this]);
}else{this.backupColor=this.currentColor;this.layout.backup.setStyle("background-color",this.backupColor.rgbToHex());this.hide();this.fireEvent("onComplete",[this.sets,this]);
}}.bind(this));},overlayDrag:function(){var c=this.snippet("curSize","int").h;var d=this.snippet("curSize","int").w;this.pickerPos.x=this.snippet("curPos").l+d;
this.pickerPos.y=this.snippet("curPos").t+c;this.setMooRainbow(this.parseColors(this.pickerPos.x,this.pickerPos.y,this.sliderPos),"hsb");this.fireEvent("onChange",[this.sets,this]);
},sliderEvents:function(){var d=this.snippet("arrSize","int"),c;c=[0+this.snippet("slider")-d,this.layout.slider.height-d+this.snippet("slider")];this.layout.sliderDrag=new Drag(this.layout.arrows,{limit:{y:c},modifiers:{x:false},onBeforeStart:this.sliderDrag.bind(this),onStart:this.sliderDrag.bind(this),onDrag:this.sliderDrag.bind(this),snap:0});
this.layout.slider.addEvent("mousedown",function(a){a=new Event(a);this.layout.arrows.setStyle("top",a.page.y-this.layout.slider.getTop()+this.snippet("slider")-d);
this.layout.sliderDrag.start(a);}.bind(this));},sliderDrag:function(){var d=this.snippet("arrSize","int"),c;this.sliderPos=this.snippet("arrPos")-d;this.setMooRainbow(this.parseColors(this.pickerPos.x,this.pickerPos.y,this.sliderPos),"hsb");
c=[this.sets.hsb[0],100,100].hsbToRgb().rgbToHex();this.layout.overlay.setStyle("background-color",c);this.fireEvent("onChange",[this.sets,this]);},backupEvent:function(){this.layout.backup.addEvent("click",function(){this.manualSet(this.backupColor);
this.fireEvent("onChange",[this.sets,this]);}.bind(this));},wheelEvents:function(){var b=$A(this.arrRGB).extend(this.arrHSB);b.each(function(a){a.addEvents({mousewheel:this.eventKeys.bindWithEvent(this,a),keydown:this.eventKeys.bindWithEvent(this,a)});
},this);[this.layout.arrows,this.layout.slider].each(function(a){a.addEvents({mousewheel:this.eventKeys.bindWithEvent(this,[this.arrHSB[0],"slider"]),keydown:this.eventKeys.bindWithEvent(this,[this.arrHSB[0],"slider"])});
},this);},eventKeys:function(p,s,t){var o,n;t=(!t)?s.id:this.arrHSB[0];if(p.type=="keydown"){if(p.key=="up"){o=1;}else{if(p.key=="down"){o=-1;}else{return;
}}}else{if(p.type==Element.Events.mousewheel.base){o=(p.wheel>0)?1:-1;}}if(this.arrRGB.contains(s)){n="rgb";}else{if(this.arrHSB.contains(s)){n="hsb";}else{n="hsb";
}}if(n=="rgb"){var m=this.sets.rgb,r=this.sets.hsb,q=this.options.prefix,e;var l=(s.value.toInt()||0)+o;l=(l>255)?255:(l<0)?0:l;switch(s.className){case q+"rInput":e=[l,m[1],m[2]];
break;case q+"gInput":e=[m[0],l,m[2]];break;case q+"bInput":e=[m[0],m[1],l];break;default:e=m;}this.manualSet(e);this.fireEvent("onChange",[this.sets,this]);
}else{var m=this.sets.rgb,r=this.sets.hsb,q=this.options.prefix,e;var l=(s.value.toInt()||0)+o;if(s.className.test(/(HueInput)/)){l=(l>359)?0:(l<0)?0:l;
}else{l=(l>100)?100:(l<0)?0:l;}switch(s.className){case q+"HueInput":e=[l,r[1],r[2]];break;case q+"SatuInput":e=[r[0],l,r[2]];break;case q+"BrighInput":e=[r[0],r[1],l];
break;default:e=r;}this.manualSet(e,"hsb");this.fireEvent("onChange",[this.sets,this]);}p.stop();},eventKeydown:function(h,e){var g=h.code,f=h.key;if((!e.className.test(/hexInput/)&&!(g>=48&&g<=57))&&(f!="backspace"&&f!="tab"&&f!="delete"&&f!="left"&&f!="right")){h.stop();
}},eventKeyup:function(k,n){var j=k.code,i=k.key,m,l,e=n.value.charAt(0);if(!$chk(n.value)){return;}if(n.className.test(/hexInput/)){if(e!="#"&&n.value.length!=6){return;
}if(e=="#"&&n.value.length!=7){return;}}else{if(!(j>=48&&j<=57)&&(!["backspace","tab","delete","left","right"].contains(i))&&n.value.length>3){return;}}l=this.options.prefix;
if(n.className.test(/(rInput|gInput|bInput)/)){if(n.value<0||n.value>255){return;}switch(n.className){case l+"rInput":m=[n.value,this.sets.rgb[1],this.sets.rgb[2]];
break;case l+"gInput":m=[this.sets.rgb[0],n.value,this.sets.rgb[2]];break;case l+"bInput":m=[this.sets.rgb[0],this.sets.rgb[1],n.value];break;default:m=this.sets.rgb;
}this.manualSet(m);this.fireEvent("onChange",[this.sets,this]);}else{if(!n.className.test(/hexInput/)){if(n.className.test(/HueInput/)&&n.value<0||n.value>360){return;
}else{if(n.className.test(/HueInput/)&&n.value==360){n.value=0;}else{if(n.className.test(/(SatuInput|BrighInput)/)&&n.value<0||n.value>100){return;}}}switch(n.className){case l+"HueInput":m=[n.value,this.sets.hsb[1],this.sets.hsb[2]];
break;case l+"SatuInput":m=[this.sets.hsb[0],n.value,this.sets.hsb[2]];break;case l+"BrighInput":m=[this.sets.hsb[0],this.sets.hsb[1],n.value];break;default:m=this.sets.hsb;
}this.manualSet(m,"hsb");this.fireEvent("onChange",[this.sets,this]);}else{m=n.value.hexToRgb(true);if(isNaN(m[0])||isNaN(m[1])||isNaN(m[2])){return;}if($chk(m)){this.manualSet(m);
this.fireEvent("onChange",[this.sets,this]);}}}},doLayout:function(){var M=this.options.id,F=this.options.prefix,Q=this;var ac=M+" ."+F;this.layout=new Element("div",{styles:{display:"block",position:"absolute"},id:M}).inject(document.body);
Rainbows.push(this);var V=new Element("div",{styles:{position:"relative"},"class":F+"box"}).inject(this.layout);var R=new Element("div",{styles:{position:"absolute",overflow:"hidden"},"class":F+"overlayBox"}).inject(V);
var P=new Element("div",{styles:{position:"absolute",zIndex:1},"class":F+"arrows"}).inject(V);P.width=P.getStyle("width").toInt();P.height=P.getStyle("height").toInt();
var Y=new Element("img",{styles:{"background-color":"#fff",position:"relative",zIndex:2},src:this.options.imgPath+"moor_woverlay.png","class":F+"overlay"}).inject(R);
var S=new Element("img",{styles:{position:"absolute",top:0,left:0,zIndex:2},src:this.options.imgPath+"moor_boverlay.png","class":F+"overlay"}).inject(R);
if(window.ie6){R.setStyle("overflow","");var X=Y.src;Y.src=this.options.imgPath+"blank.gif";Y.style.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+X+"', sizingMethod='scale')";
X=S.src;S.src=this.options.imgPath+"blank.gif";S.style.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+X+"', sizingMethod='scale')";}Y.width=S.width=R.getStyle("width").toInt();
Y.height=S.height=R.getStyle("height").toInt();var Z=new Element("div",{styles:{overflow:"hidden",position:"absolute",zIndex:2},"class":F+"cursor"}).inject(R);
Z.width=Z.getStyle("width").toInt();Z.height=Z.getStyle("height").toInt();var D=new Element("img",{styles:{position:"absolute","z-index":2},src:this.options.imgPath+"moor_slider.png","class":F+"slider"}).inject(V);
this.layout.slider=document.getElement("#"+ac+"slider");D.width=D.getStyle("width").toInt();D.height=D.getStyle("height").toInt();new Element("div",{styles:{position:"absolute"},"class":F+"colorBox"}).inject(V);
new Element("div",{styles:{zIndex:2,position:"absolute"},"class":F+"chooseColor"}).inject(V);this.layout.backup=new Element("div",{styles:{zIndex:2,position:"absolute",cursor:"pointer"},"class":F+"currentColor"}).inject(V);
var aa=new Element("label").inject(V).setStyle("position","absolute");var U=aa.clone().inject(V).addClass(F+"gLabel").appendText("G: ");var O=aa.clone().inject(V).addClass(F+"bLabel").appendText("B: ");
aa.appendText("R: ").addClass(F+"rLabel");var N=new Element("input");var ad=N.clone().inject(U).addClass(F+"gInput");var ab=N.clone().inject(O).addClass(F+"bInput");
N.inject(aa).addClass(F+"rInput");var H=new Element("label").inject(V).setStyle("position","absolute");var B=H.clone().inject(V).addClass(F+"SatuLabel").appendText("S: ");
var G=H.clone().inject(V).addClass(F+"BrighLabel").appendText("B: ");H.appendText("H: ").addClass(F+"HueLabel");var L=new Element("input");var E=L.clone().inject(B).addClass(F+"SatuInput");
var I=L.clone().inject(G).addClass(F+"BrighInput");L.inject(H).addClass(F+"HueInput");B.appendText(" %");G.appendText(" %");new Element("span",{styles:{position:"absolute"},"class":F+"ballino"}).set("html"," &deg;").injectAfter(H);
var W=new Element("label").inject(V).setStyle("position","absolute").addClass(F+"hexLabel").appendText("#hex: ").adopt(new Element("input").addClass(F+"hexInput"));
var T=new Element("input",{styles:{position:"absolute"},type:"button",value:"Select","class":F+"okButton"}).inject(V);if(this.options.transparent){var J=new Element("div",{"class":F+"transpButton"}).inject(V).set("html","<span>X</span>").addEvent("click",function(){Q.fireEvent("onChange","transparent");
T.fireEvent("click");});}this.rePosition();var K=$$("#"+ac+"overlay");this.layout.overlay=K[0];this.layout.overlay2=K[1];this.layout.cursor=document.getElement("#"+ac+"cursor");
this.layout.arrows=document.getElement("#"+ac+"arrows");this.chooseColor=document.getElement("#"+ac+"chooseColor");this.layout.backup=document.getElement("#"+ac+"currentColor");
this.RedInput=document.getElement("#"+ac+"rInput");this.GreenInput=document.getElement("#"+ac+"gInput");this.BlueInput=document.getElement("#"+ac+"bInput");
this.HueInput=document.getElement("#"+ac+"HueInput");this.SatuInput=document.getElement("#"+ac+"SatuInput");this.BrighInput=document.getElement("#"+ac+"BrighInput");
this.hexInput=document.getElement("#"+ac+"hexInput");this.arrRGB=[this.RedInput,this.GreenInput,this.BlueInput];this.arrHSB=[this.HueInput,this.SatuInput,this.BrighInput];
this.okButton=document.getElement("#"+ac+"okButton");if(!window.khtml){this.hide();}},rePosition:function(){var b=this.element.getCoordinates();this.layout.setStyles({left:b.left+22,top:b.top-20});
},snippet:function(j,k){var m;k=(k)?k:"none";switch(j){case"arrPos":var n=this.layout.arrows.getStyle("top").toInt();m=n;break;case"arrSize":var l=this.layout.arrows.height;
l=(k=="int")?(l/2).toInt():l;m=l;break;case"curPos":var h=this.layout.cursor.getStyle("left").toInt();var n=this.layout.cursor.getStyle("top").toInt();
m={l:h,t:n};break;case"slider":var n=this.layout.slider.getStyle("marginTop").toInt();m=n;break;default:var l=this.layout.cursor.height;var i=this.layout.cursor.width;
l=(k=="int")?(l/2).toInt():l;i=(k=="int")?(i/2).toInt():i;m={w:i,h:l};}return m;}});