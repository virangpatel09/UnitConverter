var property = new Array();
var unit = new Array();
var factor = new Array();
tempIncrement = new Array(0, -32, -273.15, -491.67);
var property_number=0;

property[0] = "Length";
unit[0] = new Array("Meter (m)", "Angstrom (A')", "Centimeter (cm)", "Kilometer (km)", "Foot (ft)", "Inch (in)", "Light year (LY)", "Micrometer (mu-m)", "Millimeter (mm)", "Nanometer (nm)", "Picometer (pm)");
factor[0] = new Array(1, 1E-10, .01, 1000, .3048, .0254, 9.46055E+15, .000001, .001, 1E-9, 1E-12);

property[1] = "Temperature";
unit[1] = new Array("Degrees Celsius ('C)", "Degrees Fahrenheit ('F)", "Degrees Kelvin ('K)");
factor[1] = new Array(1, 0.555555555555, 1);

property[2] = "Mass";
unit[2] = new Array("Kilogram (kgr)", "Gram (gr)", "Milligram (mgr)", "Microgram (mu-gr)", "Pound (lbm)","Tonne");
factor[2] = new Array(1, .001, 1e-6, .000000001, .4535924, 1000);

property[3] = "Area";
unit[3] = new Array("Square meter (m^2)", "Acre (acre)", "Barn (barn)", "Square centimeter", "Square kilometer", "Square foot (ft^2)", "Square inch (in^2)");
factor[3] = new Array(1, 4046.856, 1E-28, 10000, 1000000, 9.290304E-02, 6.4516E-04);

property[4] = "Time";
unit[4] = new Array("Second (sec)", "Day (mean solar)", "Day (sidereal)", "Hour (mean solar)", "Hour (sidereal)", "Minute (mean solar)", "Minute (sidereal)", "Month (mean calendar)", "Second (sidereal)", "Year (calendar)", "Year (sidereal)");
factor[4] = new Array(1, 8.640E4, 86164.09, 3600, 3590.17, 60, 60, 2628000, .9972696, 31536000, 31558150);

property[5] = "Electricity";
unit[5] = new Array("Coulomb (Cb)", "Ampere hour (A hr)", "Faraday (F)", "Millifaraday (mF)", "Microfaraday (mu-F)", "Picofaraday (pF)");
factor[5] = new Array(1, 3600, 96521.8999999997, 96.5219, 9.65219E-02, 9.65219E-05);

property[6] = "Prefix";
unit[6] = new Array("deca (da)", "hecto (h)","kilo (k)", "mega (M)", "giga (G)", "tera (T)", "deci (d)", "centi (c)", "milli (m)", "micro(u)", "namo(n)", "pico (p)");
factor[6] = new Array(1, 10, 100, 100000, 1.0E+8, 1.0E+11,0.01, 0.0001 ,0.0001, 0.0000001, 1.0E-10,1.0E-12);

property[7] = "Currency";
unit[7] = new Array("USD","U.A.E Dirhan","AUS Doller","BTC","Swiss Franc","British Pound","INR","New Zealand Doller","Euro")
factor[7] = new Array(1, 0.272, 0.773, 55995, 1.091, 1.394, 0.013, 0.718, 1.203);

property[8] = "Volume";
unit[8] = new Array("Cubic Meter (m^3)", "Cubic centimeter", "Cubic millimeter", "Barrel (oil)", "Cup", "Fluid ounce (US)", "Cubic foot", "Gallon (UK)", "Gallon (US,dry)", "Gallon (US,liq)", "Cubic inch (in^3)", "Liter (new)", "Liter (old)", "Quart (US,dry)", "Quart (US,liq)", "Teaspoon", "Ton (register)", "Cubic yard");
factor[8] = new Array(1, .000001, .000000001, .1589873, .0002365882, .00002957353, .02831685, .004546087, .004404884, .003785412, .0001420652, .001, .001000028, .001101221, 9.46353E-04, .000004928922, 2.831685, .7645549);

property[9] = "Storage";
unit[9] = new Array("bit (b)", "niddle (n)", "byte (B)", "kilobit (kb)", "kilobyte (kB)", "megabite (Mb)", "megabyte (MB)", "gigabite (Gb)", "gigabyte (GB)", "terabite (Tb)", "terabyte (TB)");
factor[9] = new Array(1, 4, 8, 1000, 8000, 1E+6, 0.8E+7, 1E+9, 0.8E+10, 1E+12, 0.8E+13);

property[10] = "Resolution";
unit[10] = new Array("dot/meter (dot/m)", "dot/millimeter (dot/mm)", "dot/inch(dot/in)"," pixel/inch (pixel/in)");
factor[10]= new Array(1, 1000, 40, 40);

property[11] = "sound";
unit[11] = new Array("bel (B)", "decibel (dB)", "neper (Np)");
factor[11] = new Array(1, 0.1, 0.868);

function UpdateUnitMenu(i, unitMenu) {
  document.getElementById("Unittitle").innerHTML=property[property_number];
  property_number=i;
  FillMenuWithArray(unitMenu, unit[i]);
}

function FillMenuWithArray(myMenu, myArray) {
  var l;
  myMenu.length = myArray.length;
  for (l = 0; l < myArray.length; l++) {
    myMenu.options[l].text = myArray[l];
  }
}
function convert(Form_A,Form_B)
{
  var Form_A_value = Form_A.unit_input.value;
  var Form_B_value = Form_B.unit_input.value;
  if(!isNaN(Form_A_value) && !isNaN(Form_B_value))
  {
    if (Form_A_value!=0)
    {
      CalculateUnit(Form_A,Form_B);
    }
    else{
      CalculateUnit(Form_B,Form_A);
    }
  }
  else{
    alert("please enter numbers only");
  }
}
function CalculateUnit(sourceForm, targetForm) {
  var sourceValue = sourceForm.unit_input.value;
  sourceValue = parseFloat(sourceValue);
  if (!isNaN(sourceValue) || sourceValue == 0) {
    sourceForm.unit_input.value = sourceValue;
    ConvertFromTo(sourceForm, targetForm);
  }
}

function ConvertFromTo(sourceForm, targetForm) {
  var propIndex;
  var sourceIndex;
  var sourceFactor;
  var targetIndex;
  var targetFactor;
  var result;

  propIndex = property_number;
  sourceIndex = sourceForm.unit_type.selectedIndex;
  sourceFactor = factor[propIndex][sourceIndex];

  targetIndex = targetForm.unit_type.selectedIndex;
  targetFactor = factor[propIndex][targetIndex];



  result = sourceForm.unit_input.value;
  if (property[propIndex] == "Temperature") {
    result = parseFloat(result) + tempIncrement[sourceIndex];
  }
  result = result * sourceFactor;

  
  result = result / targetFactor;
 
  if (property[propIndex] == "Temperature") {
    result = parseFloat(result) - tempIncrement[targetIndex];
  }

  targetForm.unit_input.value = result;
}
window.onload = function(e) {
  // FillMenuWithArray(document.property_form.the_menu, property);
  UpdateUnitMenu(property_number, document.form_A.unit_type);
  UpdateUnitMenu(property_number, document.form_B.unit_type);
}
