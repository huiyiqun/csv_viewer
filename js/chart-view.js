$(function () {
  var fileList = [
    "neuburger liquid milk_1_2016一月28_1107.xls",
    "neuburger liquid milk_2_2016一月28_1108.xls",
    "neuburger liquid milk_3_2016一月28_1108.xls",
    "neuburger liquid milk-塑料_1_2016一月28_1111.xls",
    "neuburger liquid milk-塑料_2_2016一月28_1111.xls",
    "neuburger liquid milk-塑料_3_2016一月28_1111.xls",
    "neuburger liquid milk-塑料_4_2016一月28_1111.xls",
    "neuburger liquid milk-塑料_5_2016一月28_1111.xls",
    "伊利奶粉_1_2016一月28_1056.xls",
    "伊利奶粉_2_2016一月28_1057.xls",
    "伊利奶粉_3_2016一月28_1057.xls",
    "伊利奶粉_4_2016一月28_1057.xls",
    "伊利奶粉_5_2016一月28_1057.xls",
    "土豆淀粉超市_1_2016一月28_1052.xls",
    "土豆淀粉超市_2_2016一月28_1052.xls",
    "土豆淀粉超市_3_2016一月28_1052.xls",
    "土豆淀粉超市_4_2016一月28_1052.xls",
    "土豆淀粉超市_5_2016一月28_1053.xls",
    "地沟油_1_2016一月28_1115.xls",
    "地沟油_2_2016一月28_1115.xls",
    "地沟油_3_2016一月28_1115.xls",
    "地沟油_4_2016一月28_1115.xls",
    "地沟油_5_2016一月28_1116.xls",
    "奶粉_1_2016一月28_1046.xls",
    "奶粉_2_2016一月28_1046.xls",
    "奶粉_3_2016一月28_1046.xls",
    "奶粉_4_2016一月28_1046.xls",
    "奶粉_5_2016一月28_1046.xls",
    "果珍_1_2016一月28_1131.xls",
    "果珍_2_2016一月28_1131.xls",
    "果珍_3_2016一月28_1131.xls",
    "果珍_4_2016一月28_1131.xls",
    "果珍_5_2016一月28_1131.xls",
    "植物油_1_2016一月28_1116.xls",
    "植物油_2_2016一月28_1116.xls",
    "植物油_3_2016一月28_1116.xls",
    "植物油_4_2016一月28_1116.xls",
    "植物油_5_2016一月28_1116.xls",
    "橘子_1_2016一月28_1124.xls",
    "橘子_2_2016一月28_1124.xls",
    "橘子_3_2016一月28_1125.xls",
    "橘子_4_2016一月28_1125.xls",
    "橘子_5_2016一月28_1125.xls",
    "橙子_1_2016一月28_1117.xls",
    "橙子_2_2016一月28_1118.xls",
    "橙子_3_2016一月28_1118.xls",
    "橙子_4_2016一月28_1118.xls",
    "橙子_5_2016一月28_1118.xls",
    "法国咖啡_1_2016一月28_1101.xls",
    "法国咖啡_2_2016一月28_1101.xls",
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
