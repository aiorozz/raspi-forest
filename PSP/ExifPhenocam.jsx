﻿// get and organize the exif data:
<javascriptresource>
<name>Place Exif</name>
<menu>filter</menu>
<about>Jose Romero</about>
<enableinfo>true</enableinfo>
</javascriptresource>  

var myExif_arr = activeDocument.info.exif; // or ... activeDocument.info.exif.toSource().split(',');  
var thisImageExifPlusData = "Exposure";  
var sizeCR2 = "";  
var ISO = "";  
var focalLength = "";  
var whiteBalance = "";
var BosqueGuajira = "Bosque Guajira";
var dateAndTime = "" 
var model = ""
var EV = "" 
var program = ""
var meter = ""
var mode = ""
var exp = "Exp: "
//app.activeDocument.info.exif.filter; //app.activeDocument.info.exif.filter(function(e){return e[0]=='Date Time Original'})[0][1]
//.replace(/^(\d+):(\d+):(\d+)/,'$1-$2-$3,');

//var flash = "";  
if (myExif_arr instanceof Array && myExif_arr.length > 0) {  
    for (var e in myExif_arr) {  
        // you can use this above to get all the data available on exif (use ESTK console)  
        // $.writeln(myExif_arr[e].join('\t●'));  
        if (myExif_arr[e][0] == "Exposure Program") {  
            var exposureProgramResult = myExif_arr[e][1].toString().replace(/\s/g,'').toLowerCase();  
            if (exposureProgramResult.match(/defined/) != null) { program += ":P: ?? "; }  
            else if (exposureProgramResult.match(/manual/) != null) { program += "P: Man, "; }  
            else if (exposureProgramResult.match(/normal/) != null) { program += "P: Norm, "; }  
            else if (exposureProgramResult.match(/aperture/) != null) { program += "P: AP, "; }  
            else if (exposureProgramResult.match(/shutter/) != null) { program += "P: SP, "; }  
            else if (exposureProgramResult.match(/creative/) != null) { program += "P: Create, "; }  
            else if (exposureProgramResult.match(/action/) != null) { program += "P: Ac, "; }  
            else if (exposureProgramResult.match(/portrait/) != null) { program += "P: Portr, "; }  
            else if (exposureProgramResult.match(/landscape/) != null) { program += "P: Lands, "; }  
        }  
        // ISO  
        if (myExif_arr[e][0] == "ISO Speed Ratings") {  
            ISO = "ISO: " + myExif_arr[e][1].toString() + "";  
        } 
		// dateandtime 
		if (myExif_arr[e][0]== "Date Time Original"){//[0][1]
		 dateAndTime = "" + myExif_arr[e][1].toString() + ""; 
	    }
		//Modelo camara
		if (myExif_arr[e][0]== "Date Time Original"){//[0][1]
		 model = ", " + myExif_arr[0][1].toString() + "Cam"; 
	    }
        // Exposure Metering  
        if (myExif_arr[e][0] == "Metering Mode") {  
            var meteringResult = myExif_arr[e][1].toString().toLowerCase();  
            if (meteringResult.match(/unknown/) != null) { meter += "Metering: ?? "; }  
            else if (meteringResult.match(/average/) != null) { meter += "Metering: Average, "; }  
            else if (meteringResult.match(/center/) != null) { meter += "Metering: CenterWA, "; }  
            else if (meteringResult.match(/spot/) != null) { meter += "Metering: Spot, "; }  
            else if (meteringResult.match(/multispot/) != null) { meter += "Metering: MultiSpot, "; }  
            else if (meteringResult.match(/pattern/) != null) { meter += "Metering: Patern, "; }  
            else if (meteringResult.match(/partial/) != null) { meter += "Metering: Partial, "; }  
            else if (meteringResult.match(/portrait/) != null) { meter += "Metering: Port, "; }  
            else if (meteringResult.match(/other/) != null) { meter += "Metering: other, "; }  
        }  
        // Exposure Bias Value == Exposure Compensation  
        if (myExif_arr[e][0] == "Exposure Bias Value") {  
            EV += ", EV" + myExif_arr[e][1].toString() + " ";  
        }  
        //  
        // Exposure Mode  
        if (myExif_arr[e][0] == "Exposure Mode") {  
            mode += "Mode: " + myExif_arr[e][1].toString() + " ";  
        }  
        // Focal Length  
        if (myExif_arr[e][0] == "Focal Length") {  
            focalLength = "FocLeng: " + myExif_arr[e][1].toString().replace(/\s/g,'') + "";  
        }  
        // Pixel X,Y Dimension (both width & height at the same time)  
        if (myExif_arr[e][0] == "Pixel X Dimension") {  
            sizeCR2 = "" + myExif_arr[e][1].toString() + "x" + myExif_arr[Number(e)+1][1].toString() + "";  
        }  
        // White Balance  
        if (myExif_arr[e][0] == "White Balance") {  
            whiteBalance = "WB: " + myExif_arr[e][1].toString() + "";  
        }  
        // Flash  
        //if (myExif_arr[e][0] == "Flash") {  
            // this is another way of getting the data from flash (there other properties if on)  
           // if (activeDocument.xmpMetadata.rawData.match(/\<exif\:Fired\>(.+?)\<\/exif\:Fired\>/).length > 1) { //~ <exif:Fired>True</exif:Fired>  
           //     var flashTF = activeDocument.xmpMetadata.rawData.match(/\<exif\:Fired\>(.+?)\<\/exif\:Fired\>/)[1].toString().toLowerCase() == "true";  
           //     flash = (flashTF) ? "[FlashON]" : "[FlashOFF]";  
            //}  
        //}  
    }     
}  

var result = "" + BosqueGuajira + " \r"; // etiquetas " + sizeCR2 + " " + focalLength + " "+ thisImageExifPlusData + "
	result += "" + dateAndTime +" \r";
	result += "" + ISO + "  " + whiteBalance + ""; // ;  
	result += "" + exp + " "+program+" "+meter+" "+mode+" " +EV+ ""; //  


var newLayer = makeTextLayer(result);   
//  
function makeTextLayer(text) {   
    var startRulerUnits = app.preferences.rulerUnits;  
    app.preferences.rulerUnits = Units.PIXELS;  
    app.preferences.typeUnits = TypeUnits.POINTS;  
    var FontName = "Trebuchet Ms";  
    var FontSize = 12;
	var Justification =	"RIGHTJUSTIFIED";
    var White = new SolidColor();  
    White.rgb.hexValue = 'FFFFFF';  
    var newTextLayer = activeDocument.artLayers.add();  
    newTextLayer.kind = LayerKind.TEXT;
	newTextLayer.textItem.Justification = Justification;	
    newTextLayer.textItem.kind = TextType.POINTTEXT;  
    newTextLayer.textItem.color = White;  
    newTextLayer.textItem.font = FontName;  
    newTextLayer.textItem.size = FontSize;  
    newTextLayer.textItem.contents = text.toString();  
    var toX = 10;  
    var toY = 40;  
    newTextLayer.textItem.position = [new UnitValue(toX, 'px'), new UnitValue(toY, 'px')];  
    app.preferences.rulerUnits = startRulerUnits;  
} 
