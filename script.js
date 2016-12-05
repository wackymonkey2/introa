var index = 0;

renderImage();//starts the page with an image loaded
resize();

$("#back").on("click", function(){
  index --;
  renderImage();
});
$("#forward").on("click", function(){
  index ++;
  renderImage();
})

$("#jumpToValue").attr("min", 0);
$("#jumpToValue").attr("max", $('.picture').length - 1);

$("#jumpToValue").on("input", function(){
  index = this.value;
  renderImage();
});

$(window).resize(function(){
  summonChart();
  resize();});
  
  function resize(){
  var maxHeight = 0;
  
  for(var i = 0; i < $(".picture").length; i++){
    
    var $listElements = $(".picture");
    var $testedImage = $(".picture").eq(i);
    
    if($testedImage.height() > maxHeight){
      maxHeight = $testedImage.height();
    }
    
  }
  $("#container").height(maxHeight);
  }
  
  function renderImage(){
  if(index >= $('.picture').length){
    index = 0;}
  if(index < 0){
    index = $('.picture').length - 1;}
  
  var $listElements = $(".picture");
  var $shownImage = $('.picture').eq(index);
  
  //hides all images
  $listElements.each(function(){
  $listElements.css("visibility", "hidden");
  //shows selected image
  $shownImage.css("visibility", "visible");
  
  $("#jumpToValue").val(index);
  });
  }

// Load the Visualization API and the corechart package.
  google.charts.load('current', {'packages':['corechart']});

  // Set a callback to run when the Google Visualization API is loaded.
  google.charts.setOnLoadCallback(summonChart);

  // Callback that creates and populates a data table,
  // instantiates the pie chart, passes in the data and
  // draws it.
  function summonChart() {

    // Create the data table.
    var data = new google.visualization.DataTable();
    var cm = 2.54;
    data.addColumn('number', 'Year');
    data.addColumn('number', 'New York');
    data.addColumn('number', 'Philadelphia');
    data.addRows([
      [2000, 35.0*cm, 26.1*cm],
      [2001, 3.5*cm, 4.0*cm],
      [2002, 49.3*cm, 46.3*cm],
      [2003, 42.6*cm, 17.8*cm],
      [2004, 41.0*cm, 30.4*cm],
      [2005, 40*cm, 19.5*cm],
      [2006, 12.4*cm, 13.4*cm],
      [2007, 11.9*cm, 6.3*cm],
      [2008, 27.6*cm, 78.7*cm],
      [2009, 51.4*cm, 44.0*cm],
      [2010, 61.9*cm, 8.3*cm],
      [2011, 7.4*cm, 68.0*cm],
      [2012, 26.1*cm, 26.3*cm],
      [2013, 57.4*cm, 23.8*cm],
      [2014, 50.3*cm, 27.0*cm],
      [2015, 32.1*cm, 27.5*cm]
      
    ]);

    // Set chart options
    var options = {title: 'Annual Snowfall Totals',
                  backgroundColor: 'transparent',
                  chartArea: {left: 40},
                  hAxis: {format: '', gridlines: {count: 16, color: '#67B8DE'}, showTextEvery: 3, title: 'Year'},
                  vAxis: {format: '', gridlines: {color: '#67B8DE'}, title: 'Snowfall (cm)'},
                  colors: ['#35478c', '#455bb5']
                  
    };

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
    var formatter = new google.visualization.NumberFormat({
      groupingSymbol:'', fractionDigits: 0});
    formatter.format(data, 0);
    chart.draw(data, options);
    }