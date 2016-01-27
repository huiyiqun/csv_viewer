$(function () {
  var fileList = [
    "10_2016一月27_1244.xls",
    "11_2016一月27_1245.xls",
    "1_2016一月27_1244.xls",
    "12_2016一月27_1245.xls",
    "13_2016一月27_1245.xls",
    "14_2016一月27_1245.xls",
    "15_2016一月27_1245.xls",
    "2_2016一月27_1244.xls",
    "3_2016一月27_1244.xls",
    "4_2016一月27_1244.xls",
    "5_2016一月27_1244.xls",
    "6_2016一月27_1244.xls",
    "7_2016一月27_1244.xls",
    "8_2016一月27_1244.xls",
    "9_2016一月27_1244.xls",
  ];
  // Empty chart
  var chart = new Highcharts.Chart({
    chart: {
      renderTo: 'container',
      type: 'line',
    },
    title: {
      text: 'Demo Chart',
    },
    xAxis: {
      labels: {
        formatter: function() {
          return this.value + ' mm'
        }
      },
      units: 'mm',
      title: {
        text: 'Wavelength'
      },
      min: 900,
    },
    yAxis: {
      title: {
        text: 'Absorbance'
      },
    }
  });

  // Parse querystring
  //var parsedURI = URI.parse(window.location.href);
  //var parsedQuery = URI.parseQuery(parsedURI.query);

  // Get csv file names
  //var csvFiles = parsedQuery.csv;
  //if (csvFiles === undefined)
    //return;
  //else if (typeof csvFiles === "string")
    //csvFiles = [csvFiles];

  // Iterate over csv files and insert serials
  //$.each(csvFiles, function(index, filename) {
  $.each(fileList, function(index, filename) {
    var filepath = URI("/data/").filename(filename);
    Papa.parse(filepath.toString(), {
      download: true,
      header: true,
      dynamicTyping: true,
      comments: "'",
      complete: function(results) {
        var data = $.map(results.data, function(res) {
          if (res.Wavelength === 0.0)
            return null;
          else {
            return {
              x: res.Wavelength,
              y: res.Absorbance
            };
          }
        })
        chart.addSeries({
          name: filename,
          data: data,
          marker: {
            enabled: false
          },
        });
      }
    });
  });
});
